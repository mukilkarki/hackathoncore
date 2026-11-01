import { createClient } from "@/lib/supabase/server";

/** Always call from a server component/route. RLS remains the data-access boundary. */
export async function requireRole(allowed: Array<"admin" | "member">) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false as const, status: 401, user: null, role: null };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  const role = profile?.role as "admin" | "member" | undefined;
  if (!role || !allowed.includes(role)) return { ok: false as const, status: 403, user, role: role ?? null };
  return { ok: true as const, user, role };
}
