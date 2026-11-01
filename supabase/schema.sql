create extension if not exists pgcrypto;

create type public.app_role as enum ('admin','member');
create type public.application_status as enum ('submitted','shortlisted','accepted','rejected');

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text not null,
 role public.app_role not null default 'member',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.members (
 id uuid primary key default gen_random_uuid(),
 profile_id uuid unique references public.profiles(id) on delete set null,
 display_name text not null,
 department text,
 primary_role text,
 backup_role text,
 skills text[] not null default '{}',
 github_url text,
 bio text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.applications (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 email text not null,
 phone text,
 college text not null,
 department text not null,
 year text not null,
 primary_skill text not null,
 secondary_skill text,
 technologies text,
 github_url text,
 hackathon_experience text,
 project_experience text,
 weekly_availability text,
 motivation text not null,
 preferred_role text,
 backup_role text,
 consent boolean not null check (consent),
 status public.application_status not null default 'submitted',
 reviewer_id uuid references public.profiles(id) on delete set null,
 reviewer_notes text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.hackathons (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 organizer text,
 starts_at timestamptz,
 ends_at timestamptz,
 deadline_at timestamptz,
 theme text,
 eligibility text,
 team_size text,
 registration_url text,
 status text not null check(status in ('upcoming','ongoing','completed')),
 participation_notes text,
 created_by uuid references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.projects (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 problem_statement text,
 solution text,
 tech_stack text[] not null default '{}',
 github_url text,
 demo_url text,
 image_path text,
 documentation_url text,
 contributors uuid[] not null default '{}',
 is_published boolean not null default false,
 created_by uuid references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.tasks (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 description text,
 assigned_to uuid references public.profiles(id) on delete set null,
 hackathon_id uuid references public.hackathons(id) on delete set null,
 project_id uuid references public.projects(id) on delete set null,
 due_at timestamptz,
 status text not null default 'todo' check(status in ('todo','in_progress','done')),
 created_by uuid references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.announcements (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 body text not null,
 published boolean not null default false,
 created_by uuid references public.profiles(id),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table public.activity_logs (
 id bigint generated always as identity primary key,
 actor_id uuid references public.profiles(id) on delete set null,
 action text not null,
 entity_type text not null,
 entity_id text,
 metadata jsonb not null default '{}',
 created_at timestamptz not null default now()
);

create index applications_status_created_idx on public.applications(status, created_at desc);
create index hackathons_status_deadline_idx on public.hackathons(status, deadline_at);
create index tasks_assignee_due_idx on public.tasks(assigned_to, due_at);
create index projects_published_idx on public.projects(is_published);

create function public.current_role() returns public.app_role
language sql stable security definer set search_path = public
as $$ select role from public.profiles where id = auth.uid() $$;

alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.applications enable row level security;
alter table public.hackathons enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.announcements enable row level security;
alter table public.activity_logs enable row level security;

-- Public-facing team/event/project reads; sensitive applications remain admin-only.
create policy "profiles self or admin read" on public.profiles for select to authenticated
using (id = auth.uid() or public.current_role() = 'admin');
create policy "admin manages profiles" on public.profiles for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "public read members" on public.members for select to anon, authenticated using (true);
create policy "admin manages members" on public.members for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "public submit applications" on public.applications for insert to anon, authenticated
with check (consent = true and status = 'submitted' and reviewer_id is null and reviewer_notes is null);
create policy "admins read applications" on public.applications for select to authenticated
using (public.current_role() = 'admin');
create policy "admins update applications" on public.applications for update to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "admins delete applications" on public.applications for delete to authenticated
using (public.current_role() = 'admin');

create policy "public read hackathons" on public.hackathons for select to anon, authenticated using (true);
create policy "admins manage hackathons" on public.hackathons for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "public read published projects" on public.projects for select to anon, authenticated
using (is_published = true or public.current_role() = 'admin');
create policy "admins manage projects" on public.projects for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "members read assigned tasks" on public.tasks for select to authenticated
using (assigned_to = auth.uid() or public.current_role() = 'admin');
create policy "admins manage tasks" on public.tasks for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');
create policy "members update own tasks" on public.tasks for update to authenticated
using (assigned_to = auth.uid()) with check (assigned_to = auth.uid());

create policy "read published announcements" on public.announcements for select to authenticated
using (published = true or public.current_role() = 'admin');
create policy "admins manage announcements" on public.announcements for all to authenticated
using (public.current_role() = 'admin') with check (public.current_role() = 'admin');

create policy "admins read activity" on public.activity_logs for select to authenticated
using (public.current_role() = 'admin');
create policy "admins write activity" on public.activity_logs for insert to authenticated
with check (public.current_role() = 'admin' and actor_id = auth.uid());

-- Add updated_at triggers and Storage policies before production use.
