import {requireAdmin} from "@/lib/supabase";
const esc=(v:unknown)=>{let s=String(v??"");if(/^[=+\-@]/.test(s))s="'"+s;return `"${s.replace(/"/g,'""')}"`}; // blocks CSV formula injection
export async function GET(){const a=await requireAdmin();if(!a)return new Response("Forbidden",{status:403});
const {data}=await a.sb.from("applications").select("*").order("created_at");const rows=data??[];if(!rows.length)return new Response("No data",{status:204});
const cols=Object.keys(rows[0]);await a.sb.from("activity_logs").insert({actor_id:a.user.id,action:"applications.export",entity:"applications"});
return new Response([cols.join(","),...rows.map(r=>cols.map(c=>esc((r as any)[c])).join(","))].join("\n"),{headers:{"Content-Type":"text/csv","Content-Disposition":"attachment; filename=applications.csv"}})}
