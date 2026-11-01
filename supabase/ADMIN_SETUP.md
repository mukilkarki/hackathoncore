# Admin account setup

The starter authorizes admin access using Supabase Auth `app_metadata.role`.

1. Create the user in Supabase Authentication → Users.
2. Open the user record.
3. Set App Metadata to `{"role":"admin"}`.
4. Save.
5. Sign out of the website and sign in again.

Do not use user-editable `user_metadata` for permissions. Never expose the service-role key in frontend code.

The dashboard is a starter review interface. Expand it only with server-side authorization and matching RLS policies.
