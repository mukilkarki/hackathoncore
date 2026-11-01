# HACKATHON CORE

Think. Build. Innovate. Compete.

A Next.js + TypeScript + Tailwind + Supabase starter for a six-member hackathon team portal.

## Included
- Public home, team, hackathons, projects, recruitment, and contact routes
- Supabase browser/server client setup
- Server-side admin/member authorization helpers
- Recruitment submission route with validation and rate-limit hook point
- SQL schema with constraints and Row Level Security policies
- Environment template and deployment notes

## Setup
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in your Supabase project values.
4. Run the SQL in `supabase/schema.sql` in the Supabase SQL editor.
5. Run `npm run dev`.

## Production checklist
- Create Supabase Auth users for admins and members; assign roles in `profiles`.
- Configure Supabase Auth email templates and allowed redirect URLs.
- Configure CAPTCHA/Turnstile and request throttling on the recruitment route.
- Set Vercel environment variables; never expose the service-role key in browser code.
- Configure Storage buckets and policies before enabling uploads.
- Review RLS policies and have them security-reviewed before accepting real applicant data.

This is a deployable starter, not a claim that a live Supabase/Vercel deployment or third-party registration integration has already been configured.
