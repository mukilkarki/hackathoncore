# NexusZero setup

NexusZero is a static frontend with Supabase Auth and Postgres. It supports one team workspace; team, project, task, application, chat, and announcement collections are stored as JSON arrays in the `workspace_data` table.

## Run locally

1. Create a Supabase project.
2. In the Supabase SQL Editor, run [`database/schema.sql`](./database/schema.sql). Re-run this file after pulling schema updates so the application approval function is installed.
3. In **Authentication → Users**, invite the administrator by email. In **Authentication → Providers → Email**, enable email sign-ups so applicants can create accounts. Keep email confirmation enabled; an account without a workspace role cannot enter the workspace.
4. Assign the administrator role in the SQL Editor, replacing the email:

   ```sql
   insert into public.workspace_roles (user_id, role)
   select id, 'admin'
   from auth.users
   where email = 'admin@example.com'
   on conflict (user_id) do update set role = excluded.role;
   ```

5. In **Project Settings → API**, copy the Project URL and the `anon` / publishable key into [`js/config.js`](./js/config.js):

   ```js
   window.NEXUS_SUPABASE_CONFIG = {
     url: "https://YOUR_PROJECT_ID.supabase.co",
     anonKey: "YOUR_SUPABASE_PUBLISHABLE_KEY"
   };
   ```

   The browser key is public by design. Never put a `service_role` key in frontend code. Row Level Security in the schema is required.

6. Serve the repository over HTTP from its root (opening the HTML as a `file://` URL is not supported):

   ```bash
   python3 -m http.server 8000
   ```

7. Open `http://localhost:8000/hackathon_team_portfolio_management_platform.html` and sign in with the invited administrator account.

## Member registration, approval, and sign-in

Applicants use **Join Squad** to create a Supabase Auth account and submit their profile/application. They must confirm their email if prompted. New accounts do not get a workspace role, so they cannot access member tools while their application is pending.

An administrator reviews the application in **Admin Hub** and selects **Accept**. The database approval function checks that the applicant has a confirmed Auth account with the same email, marks the application approved, and grants the `member` role. Both steps happen atomically; an unregistered or unconfirmed applicant cannot be approved yet. Once approved, the member signs in from **Login** with the email and password they created through Join Squad.

In **My Profile** in the Workspace, each signed-in user can edit their name, department, team title, skills, GitHub and LinkedIn links, and avatar URL. These fields are saved to that user's Supabase Auth metadata; changing a profile does not change their workspace role or administrator permissions.

Applications are stored in the private `applications` collection. The registration password is sent only to Supabase Auth and is never included in the application record. If email confirmation is enabled, configure the Supabase Auth site URL and allowed redirect URLs for your deployment.

## Data access and local preview

- Public visitors can read the roster, projects, and announcements.
- Only workspace members can read and update tasks and chat.
- Only administrators can read applications or manage workspace content.
- A Supabase Auth account alone does not grant workspace access; the admin-only application approval function assigns member roles.
- Public applications are submitted through a database function; the application collection itself is not publicly readable.
- Without Supabase configuration, the page runs with sample data in that browser's local storage. Sign-in is disabled in this mode, and local changes are not shared across browsers.

This frontend is an MVP for a single team, not a general multi-tenant SaaS backend. Before using it for multiple organizations or sensitive production data, normalize the JSON collections into tenant-scoped tables and add organization membership, rate limiting, and appropriate application abuse protection.

The page uses the Tailwind CDN for zero-build local setup. Before production deployment, compile Tailwind into a static stylesheet and pin the frontend vendor assets.
