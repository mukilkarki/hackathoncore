create extension if not exists pgcrypto;
create table users(id uuid primary key references auth.users on delete cascade,full_name text,role text not null default 'member' check(role in('admin','member')),created_at timestamptz default now());
create table members(id uuid primary key default gen_random_uuid(),user_id uuid unique references users on delete set null,name text not null,department text,skills text[] default '{}',
 primary_role text,backup_role text,bio text,github_url text,created_at timestamptz default now());
create table applications(id uuid primary key default gen_random_uuid(),name text not null check(char_length(name)between 2 and 100),email text not null unique check(email~*'^[^@\s]+@[^@\s]+\.[^@\s]+$'),
 phone text,college text not null,department text not null,year int check(year between 1 and 8),primary_skill text not null,secondary_skill text,technologies text,portfolio_url text,
 hackathon_experience text,project_experience text,weekly_hours int check(weekly_hours between 1 and 80),motivation text not null check(char_length(motivation)>=20),preferred_role text,backup_role text,
 consent boolean not null check(consent),status text not null default 'new' check(status in('new','shortlisted','rejected','accepted')),reviewed_by uuid references users,reviewed_at timestamptz,created_at timestamptz default now());
create table hackathons(id uuid primary key default gen_random_uuid(),title text not null,organizer text,theme text,eligibility text,team_size text,registration_url text,starts_on date,ends_on date,deadline date,
 status text not null default 'upcoming' check(status in('upcoming','ongoing','completed')),result text,is_sample boolean default false,created_at timestamptz default now(),updated_at timestamptz default now());
create table projects(id uuid primary key default gen_random_uuid(),title text not null,problem text,solution text,tech_stack text[] default '{}',github_url text,demo_url text,image_url text,hackathon_id uuid references hackathons on delete set null,is_sample boolean default false,created_at timestamptz default now());
create table tasks(id uuid primary key default gen_random_uuid(),title text not null,assignee_id uuid references members on delete set null,hackathon_id uuid references hackathons on delete cascade,due_on date,done boolean default false,created_at timestamptz default now());
create table announcements(id uuid primary key default gen_random_uuid(),title text not null,body text not null,author_id uuid references users,created_at timestamptz default now());
create table activity_logs(id bigint generated always as identity primary key,actor_id uuid references users,action text not null,entity text,entity_id text,created_at timestamptz default now());
create or replace function is_admin() returns boolean language sql security definer stable set search_path=public as $$select exists(select 1 from users where id=auth.uid() and role='admin')$$;
create or replace function is_member() returns boolean language sql security definer stable set search_path=public as $$select exists(select 1 from users where id=auth.uid())$$;
do $$ declare t text; begin foreach t in array array['users','members','applications','hackathons','projects','tasks','announcements','activity_logs'] loop execute format('alter table %I enable row level security',t); end loop; end $$;
create policy app_insert on applications for insert to anon,authenticated with check(status='new' and reviewed_by is null);
create policy app_admin on applications for all to authenticated using(is_admin()) with check(is_admin());
create policy hack_read on hackathons for select using(true); create policy hack_admin on hackathons for all to authenticated using(is_admin()) with check(is_admin());
create policy proj_read on projects for select using(true); create policy proj_admin on projects for all to authenticated using(is_admin()) with check(is_admin());
create policy mem_read on members for select using(true); create policy mem_admin on members for all to authenticated using(is_admin()) with check(is_admin());
create policy user_self on users for select to authenticated using(id=auth.uid() or is_admin()); create policy user_admin on users for all to authenticated using(is_admin()) with check(is_admin());
create policy task_read on tasks for select to authenticated using(is_member()); create policy task_admin on tasks for all to authenticated using(is_admin()) with check(is_admin());
create policy task_own on tasks for update to authenticated using(assignee_id in(select id from members where user_id=auth.uid()));
create policy ann_read on announcements for select to authenticated using(is_member()); create policy ann_admin on announcements for all to authenticated using(is_admin()) with check(is_admin());
create policy log_admin on activity_logs for all to authenticated using(is_admin()) with check(is_admin());
create or replace function touch() returns trigger language plpgsql as $$begin new.updated_at=now();return new;end$$;
create trigger hack_touch before update on hackathons for each row execute function touch();
-- Block role self-escalation: only admins may change roles (users_admin policy covers writes; no self-update policy exists).
insert into hackathons(title,organizer,status,starts_on,is_sample) values('[SAMPLE] Campus Innovation Sprint','Sample Organizer','upcoming',current_date+30,true),('[SAMPLE] Open Data Challenge','Sample Organizer','completed',current_date-60,true);
insert into projects(title,problem,solution,tech_stack,is_sample) values('[SAMPLE] Campus Waste Tracker','Sample problem statement','Sample solution',array['Next.js','Supabase'],true);
