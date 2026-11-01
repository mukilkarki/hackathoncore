import {redirect} from "next/navigation";import {revalidatePath} from "next/cache";import Link from "next/link";import {requireAdmin} from "@/lib/supabase";
async function setStatus(fd:FormData){"use server";const a=await requireAdmin();if(!a)redirect("/admin/login");
const status=String(fd.get("status"));if(!["new","shortlisted","rejected","accepted"].includes(status))return;
await a.sb.from("applications").update({status,reviewed_by:a.user.id,reviewed_at:new Date().toISOString()}).eq("id",String(fd.get("id")));
await a.sb.from("activity_logs").insert({actor_id:a.user.id,action:"application."+status,entity:"applications",entity_id:String(fd.get("id"))});revalidatePath("/admin/applications")}
export default async function P({searchParams}:{searchParams:{q?:string;s?:string}}){const a=await requireAdmin();
if(!a)return <p role="alert" className="glass p-6 mt-10">Your account is not an admin. Ask an existing admin to grant access.</p>;
let q=a.sb.from("applications").select("id,name,email,department,year,primary_skill,status,created_at").order("created_at",{ascending:false});
if(searchParams.s)q=q.eq("status",searchParams.s);if(searchParams.q)q=q.or(`name.ilike.%${searchParams.q.replace(/[%,()]/g,"")}%,email.ilike.%${searchParams.q.replace(/[%,()]/g,"")}%`);
const {data,error}=await q;
return(<div className="py-8 space-y-4"><div className="flex flex-wrap gap-3 items-center justify-between"><h1 className="text-2xl font-semibold">Applications</h1>
<Link href="/admin/export" className="btn" prefetch={false}>Export CSV</Link></div>
<form className="flex gap-2"><input name="q" defaultValue={searchParams.q} placeholder="Search name or email" aria-label="Search" className="inp"/>
<select name="s" defaultValue={searchParams.s??""} aria-label="Status" className="inp w-40"><option value="">All</option>{["new","shortlisted","rejected","accepted"].map(s=><option key={s}>{s}</option>)}</select><button className="btn">Filter</button></form>
{error?<p role="alert">Could not load applications.</p>:!data?.length?<p className="glass p-4">No applications match.</p>:
<ul className="space-y-3">{data.map(r=><li key={r.id} className="glass p-4 flex flex-wrap gap-3 justify-between items-center"><div><p className="font-medium">{r.name} <span className="text-xs text-violet-300">{r.status}</span></p>
<p className="text-sm text-slate-400">{r.email} · {r.department}, year {r.year} · {r.primary_skill} · {new Date(r.created_at).toLocaleString()}</p></div>
<form action={setStatus} className="flex gap-2"><input type="hidden" name="id" value={r.id}/>{["shortlisted","accepted","rejected"].map(s=><button key={s} name="status" value={s} className="inp w-auto text-sm">{s}</button>)}</form></li>)}</ul>}</div>)}
