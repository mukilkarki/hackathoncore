create table if not exists public.workspace_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('admin', 'member')),
  created_at timestamptz not null default now()
);

create table if not exists public.workspace_data (
  collection text primary key check (
    collection in ('members', 'projects', 'tasks', 'applications', 'chats', 'announcements')
  ),
  records jsonb not null default '[]'::jsonb check (jsonb_typeof(records) = 'array'),
  updated_at timestamptz not null default now()
);

alter table public.workspace_data
  drop constraint if exists workspace_data_collection_check;
alter table public.workspace_data
  drop constraint if exists workspace_data_collection_allowed;
alter table public.workspace_data
  add constraint workspace_data_collection_allowed
  check (collection in (
    'members',
    'projects',
    'tasks',
    'applications',
    'chats',
    'announcements',
    'team_rules',
    'hackathon_schedule'
  ));

alter table public.workspace_roles enable row level security;
alter table public.workspace_data enable row level security;

create or replace function public.is_workspace_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.workspace_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.is_workspace_member()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.workspace_roles
    where user_id = auth.uid() and role in ('admin', 'member')
  );
$$;

revoke all on function public.is_workspace_admin() from public;
revoke all on function public.is_workspace_member() from public;
grant execute on function public.is_workspace_admin() to authenticated;
grant execute on function public.is_workspace_member() to authenticated;

drop policy if exists workspace_roles_read_self on public.workspace_roles;
create policy workspace_roles_read_self
  on public.workspace_roles for select
  to authenticated
  using (user_id = auth.uid());

drop policy if exists workspace_data_read_public on public.workspace_data;
create policy workspace_data_read_public
  on public.workspace_data for select
  to anon, authenticated
  using (collection in ('members', 'projects', 'announcements', 'team_rules', 'hackathon_schedule'));

drop policy if exists workspace_data_read_team on public.workspace_data;
create policy workspace_data_read_team
  on public.workspace_data for select
  to authenticated
  using (
    (collection in ('tasks', 'chats') and public.is_workspace_member())
    or public.is_workspace_admin()
  );

drop policy if exists workspace_data_admin_write on public.workspace_data;
create policy workspace_data_admin_write
  on public.workspace_data for all
  to authenticated
  using (public.is_workspace_admin())
  with check (public.is_workspace_admin());

drop policy if exists workspace_data_team_write on public.workspace_data;
create policy workspace_data_team_write
  on public.workspace_data for all
  to authenticated
  using (
    collection in ('tasks', 'chats')
    and public.is_workspace_member()
  )
  with check (
    collection in ('tasks', 'chats')
    and public.is_workspace_member()
  );

create or replace function public.submit_workspace_application(application_data jsonb)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if jsonb_typeof(application_data) <> 'object'
    or jsonb_typeof(application_data -> 'name') <> 'string'
    or jsonb_typeof(application_data -> 'email') <> 'string'
    or jsonb_typeof(application_data -> 'dept') <> 'string'
    or jsonb_typeof(application_data -> 'year') <> 'string'
    or jsonb_typeof(application_data -> 'targetRole') <> 'string'
    or jsonb_typeof(application_data -> 'skills') <> 'string'
    or jsonb_typeof(application_data -> 'portfolio') <> 'string'
    or jsonb_typeof(application_data -> 'reason') <> 'string'
    or (
      application_data ? 'linkedin'
      and jsonb_typeof(application_data -> 'linkedin') <> 'string'
    )
    or nullif(trim(application_data ->> 'name'), '') is null
    or nullif(trim(application_data ->> 'email'), '') is null
    or length(application_data ->> 'name') > 160
    or length(application_data ->> 'email') > 320
    or length(application_data ->> 'dept') > 160
    or length(application_data ->> 'year') > 40
    or length(application_data ->> 'targetRole') > 160
    or length(application_data ->> 'skills') > 1000
    or length(application_data ->> 'portfolio') > 2000
    or length(coalesce(application_data ->> 'linkedin', '')) > 2000
    or length(application_data ->> 'reason') > 4000
    or coalesce(application_data ->> 'status', '') <> 'pending'
  then
    raise exception 'Invalid workspace application';
  end if;

  application_data := application_data || jsonb_build_object(
    'id',
    'app-' || gen_random_uuid()::text
  );

  insert into public.workspace_data (collection, records)
  values ('applications', jsonb_build_array(application_data))
  on conflict (collection) do update
    set records = public.workspace_data.records || excluded.records,
        updated_at = now();
end;
$$;

revoke all on function public.submit_workspace_application(jsonb) from public;
grant execute on function public.submit_workspace_application(jsonb) to anon, authenticated;

create or replace function public.approve_workspace_application(application_id text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  application_records jsonb;
  target_application jsonb;
  applicant_user_id uuid;
begin
  if not public.is_workspace_admin() then
    raise exception 'Only workspace administrators can approve applications';
  end if;

  select records
  into application_records
  from public.workspace_data
  where collection = 'applications'
  for update;

  select entry.value
  into target_application
  from jsonb_array_elements(coalesce(application_records, '[]'::jsonb)) as entry(value)
  where entry.value ->> 'id' = application_id;

  if target_application is null or target_application ->> 'status' <> 'pending' then
    raise exception 'Pending workspace application not found';
  end if;

  select id
  into applicant_user_id
  from auth.users
  where lower(email) = lower(target_application ->> 'email')
    and email_confirmed_at is not null
  limit 1;

  if applicant_user_id is null then
    raise exception 'Applicant must create an account and confirm their email before approval';
  end if;

  insert into public.workspace_roles (user_id, role)
  values (applicant_user_id, 'member')
  on conflict (user_id) do nothing;

  update public.workspace_data
  set records = (
    select jsonb_agg(
      case
        when entry.value ->> 'id' = application_id
          then entry.value || jsonb_build_object('status', 'approved')
        else entry.value
      end
      order by entry.ordinality
    )
    from jsonb_array_elements(public.workspace_data.records)
      with ordinality as entry(value, ordinality)
  ),
  updated_at = now()
  where collection = 'applications';
end;
$$;

revoke all on function public.approve_workspace_application(text) from public;
grant execute on function public.approve_workspace_application(text) to authenticated;

grant select on public.workspace_roles to authenticated;
grant select, insert, update, delete on public.workspace_data to anon, authenticated;
