# Hackathon Core

A futuristic dark-themed website starter for a six-member multidisciplinary student innovation team.

## Included

- Responsive public website: Home, About, Team, Hackathons, Projects, Join Us, Contact
- Recruitment application form
- Supabase application storage using Row Level Security
- Supabase email/password login
- Admin application review dashboard
- Member workspace foundation
- SQL schema for applications, members, hackathons and projects
- Vercel-ready Next.js project

> Important: Sample team members, projects and hackathons are placeholders. Replace them with real information before publishing.

## 1. Requirements

Install:
- Node.js 20.9 or later
- npm (included with Node.js)
- Git (recommended)
- A Supabase account
- A Vercel account (for deployment)

Check your versions:

```bash
node -v
npm -v
```

## 2. Install locally

Extract the project ZIP, open a terminal in the `hackathon-core` folder and run:

```bash
npm install
```

Create your local environment file:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

## 3. Create Supabase project

1. Go to https://supabase.com/
2. Sign in and create a new project.
3. Choose a project name such as `hackathon-core`.
4. Set a strong database password and save it securely.
5. Choose a region suitable for your users.
6. Wait for the database to finish provisioning.
7. Open **Project Settings → API** (or the API Keys section).
8. Copy the Project URL.
9. Copy the publishable key / anon public key.
10. Add both to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_OR_PUBLISHABLE_KEY
```

Never put the `service_role` secret in a `NEXT_PUBLIC_` variable or in browser code.

## 4. Create database tables and security policies

1. In Supabase, open **SQL Editor**.
2. Choose **New query**.
3. Open `supabase/schema.sql` from this project.
4. Copy its complete contents into the SQL editor.
5. Run the query.
6. Confirm the `applications`, `members`, `hackathons` and `projects` tables exist under **Table Editor**.

The SQL enables Row Level Security. Public users can submit applications but cannot read applicant records. Admin users can review and update applications when their trusted Auth `app_metadata.role` is set to `admin`.

## 5. Create the first admin account

1. In Supabase, open **Authentication → Users**.
2. Add a user with your official team admin email and a strong password.
3. Open that user's details.
4. Find the **App Metadata** section and set:

```json
{
  "role": "admin"
}
```

5. Save the change.
6. Sign in at `http://localhost:3000/login`.

Use **App Metadata**, not user-editable User Metadata, for the authorization role. Never let public signup assign an admin role.

For a member account, create the user through the Supabase dashboard and set trusted App Metadata to:

```json
{
  "role": "member"
}
```

This starter does not yet automate invitations or account creation after approval. Provision approved accounts manually in Supabase until that workflow is implemented.

## 6. Run the website

Start the development server:

```bash
npm run dev
```

Open:

http://localhost:3000

Useful routes:

- `/` – Homepage
- `/about` – About
- `/team` – Team
- `/hackathons` – Hackathon watchlist
- `/projects` – Projects
- `/join` – Recruitment form
- `/contact` – Contact
- `/login` – Workspace login
- `/dashboard` – Admin/member workspace

If Supabase is not configured, the public pages still render, but recruitment submission and login will show a setup message.

## 7. Test recruitment

1. Open `/join`.
2. Submit a test application using information you control.
3. Open Supabase → Table Editor → `applications`.
4. Confirm the application appears with `pending` status.
5. Sign in with your admin account at `/login`.
6. Open `/dashboard`.
7. Change the application status to `shortlisted`, `accepted` or `rejected`.
8. Confirm the database status updates.

Do not use real student personal data during testing without appropriate notice and consent. Delete test records before launch.

## 8. Deploy to Vercel

### Option A: GitHub (recommended)

1. Create a GitHub repository named `hackathon-core`.
2. From the project folder, run:

```bash
git init
git add .
git commit -m "Initial Hackathon Core website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hackathon-core.git
git push -u origin main
```

3. Go to https://vercel.com/
4. Sign in with GitHub.
5. Choose **Add New → Project**.
6. Import the `hackathon-core` repository.
7. Keep the detected Next.js framework settings.
8. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
9. Deploy.
10. Open the deployed URL and test every route and form.

### Option B: Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts to link and deploy the project. Add environment variables in Vercel Project Settings before the production deployment.

## 9. Configure Supabase Auth URLs

After deployment:

1. Open Supabase → Authentication → URL Configuration.
2. Set the Site URL to your deployed Vercel domain.
3. Add your local development URL and production URL to the allowed redirect URLs if needed.
4. Save changes.

Example:
- `http://localhost:3000/**`
- `https://YOUR-PROJECT.vercel.app/**`

## 10. Before launch

- Replace demo member names and initials.
- Add real member photos and confirmed roles.
- Remove or replace sample project and hackathon cards.
- Add verified official contact and social links.
- Add a privacy notice explaining how applicant information is used and retained.
- Configure Supabase backups and account security.
- Test RLS using a non-admin account.
- Test the website on mobile.
- Add a custom domain if available.
- Set up spam protection / rate limiting before sharing recruitment publicly.

## Current scope and limitations

This is a functional starter, not a fully finished enterprise platform.

Included and wired:
- Public pages and navigation
- Responsive styling
- Recruitment form submission to Supabase
- Admin/member password login
- Admin application list and status updates
- RLS policies in the supplied SQL

Still to implement in a later phase:
- Applicant-facing status lookup / email notifications
- Automated member invitations after approval
- Full CRUD screens for hackathons and projects
- Task assignment and team calendar
- File upload for resumes or portfolios
- Audit log UI and production rate limiting
- CAPTCHA or equivalent abuse protection

## Troubleshooting

**Missing Supabase configuration**
- Check `.env.local` spelling.
- Restart `npm run dev` after changing environment variables.

**Invalid API key**
- Confirm you copied the public anon/publishable key for the same Supabase project URL.

**Application insert denied**
- Run `supabase/schema.sql`.
- Confirm the insert policy exists and the consent checkbox is selected.

**Admin login succeeds but dashboard access is denied**
- Confirm the account's trusted App Metadata contains `"role": "admin"`.
- Sign out and sign in again to refresh the JWT claims.

**Vercel build fails**
- Run `npm run build` locally.
- Review Vercel build logs.
- Confirm environment variables are configured for the Production environment.

---

Hackathon Core — Think. Build. Innovate. Compete.
