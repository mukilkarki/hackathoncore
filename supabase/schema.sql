-- HACKATHON CORE: Supabase schema
-- Run in Supabase SQL Editor. Uses app_metadata.role for admin authorization.
create extension if not exists pgcrypto;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (char_length(full_name) between 2 and 100),
  email text not null,
  phone text not null,
  college text not null,
  department text not null,
  study_year text not null,
  primary_skill text not null,
  secondary_skills text[] not null default '{}',
  technologies text[] not null default '{}',
  github_url text,
  portfolio_url text,
  experience text,
  weekly_availability text not null,
  preferred_role text,
  backup_role text,
  motivation text not null,
  consent boolean not null default false check (consent = true),
  status text not null default 'pending' check (status in ('pending','shortlisted','accepted','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.applications enable row level security;

-- Public visitors can submit applications only. They cannot read applications.
drop policy if exists "Anyone can submit an application" on public.applications;
create policy "Anyone can submit an application"
on public.applications for insert
to anon, authenticated
with check (consent = true and status = 'pending');

-- Only users whose trusted app_metadata role is admin can read/update applications.
drop policy if exists "Admins can read applications" on public.applications;
create policy "Admins can read applications"
on public.applications for select
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins can update applications" on public.applications;
create policy "Admins can update applications"
on public.applications for update
to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Published public content can be added in later phases.
create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  display_name text not null,
  department text,
  year_of_study text,
  primary_role text,
  backup_role text,
  skills text[] not null default '{}',
  avatar_url text,
  github_url text,
  linkedin_url text,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.members enable row level security;
drop policy if exists "Public can view published members" on public.members;
create policy "Public can view published members"
on public.members for select to anon, authenticated
using (is_published = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

drop policy if exists "Admins manage members" on public.members;
create policy "Admins manage members"
on public.members for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create table if not exists public.hackathons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  organizer text,
  theme text,
  description text,
  starts_at timestamptz,
  registration_deadline timestamptz,
  registration_url text,
  mode text,
  eligibility text,
  team_size text,
  status text not null default 'upcoming',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.hackathons enable row level security;
drop policy if exists "Public can view published hackathons" on public.hackathons;
create policy "Public can view published hackathons"
on public.hackathons for select to anon, authenticated
using (is_published = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins manage hackathons" on public.hackathons;
create policy "Admins manage hackathons"
on public.hackathons for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  summary text,
  problem_statement text,
  solution text,
  technologies text[] not null default '{}',
  github_url text,
  demo_url text,
  cover_image_url text,
  status text not null default 'concept',
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.projects enable row level security;
drop policy if exists "Public can view published projects" on public.projects;
create policy "Public can view published projects"
on public.projects for select to anon, authenticated
using (is_published = true or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
drop policy if exists "Admins manage projects" on public.projects;
create policy "Admins manage projects" on public.projects for all to authenticated
using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

-- Basic indexes
create index if not exists applications_created_at_idx on public.applications(created_at desc);
create index if not exists applications_status_idx on public.applications(status);
create index if not exists applications_email_idx on public.applications(lower(email));
