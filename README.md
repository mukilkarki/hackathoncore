# HACKATHON CORE
Think. Build. Innovate. Compete. — Next.js 14 · TypeScript · Tailwind · Supabase.

## Setup
1. `npm install`
2. Create a Supabase project; run `supabase/schema.sql` in the SQL editor.
3. `cp .env.example .env.local` and fill in the project URL and **anon** key (never commit keys; never use the service-role key in client code).
4. Auth → create your user, then: `update users set role='admin' where id='<uid>'` (insert the row first: `insert into users(id,role) values('<uid>','admin')`).
5. `npm run dev` → http://localhost:3000

## Deploy (Vercel)
Import the repo, add the two env vars, deploy. In Supabase Auth settings add your Vercel URL as Site URL.

## Implemented
Home (live hackathons), recruitment form (zod validation, honeypot, unique email, no public read), admin login, middleware-protected `/admin`, application search/filter/status changes with activity log, admin-only CSV export (formula-injection safe), full schema with RLS, sample data flagged `[SAMPLE]`.

## Not yet built
About, Team, Hackathons, Projects, Contact pages; hackathon/project/member/announcement CRUD UI; member dashboard; calendar, charts, notifications; rate limiting beyond the honeypot (add Vercel/Upstash limits or Turnstile before launch); delete-confirmation dialogs. The schema and RLS already support all of these.
