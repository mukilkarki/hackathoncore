import Link from "next/link";import {createClient} from "@/lib/supabase";
export const dynamic="force-dynamic";
export default async function Home(){const sb=createClient();
const {data:hacks,error}=await sb.from("hackathons").select("id,title,organizer,starts_on,status,is_sample").neq("status","completed").order("starts_on").limit(4);
return(<div className="space-y-12 py-10">
<section className="relative overflow-hidden glass p-8 md:p-14"><div className="orb absolute -top-20 -right-20 h-72 w-72 rounded-full bg-violet-600/40 blur-3xl" aria-hidden/>
<h1 className="relative text-4xl md:text-6xl font-bold">Think. Build. Innovate. Compete.</h1>
<p className="relative mt-4 max-w-xl text-slate-300">Six students from different departments entering as many hackathons as we can, building real solutions and sharpening our skills.</p>
<Link href="/recruit" className="btn relative mt-6">Apply to join</Link></section>
<section><h2 className="text-2xl font-semibold mb-4">Upcoming hackathons</h2>
{error?<p role="alert" className="glass p-4">Could not load hackathons. Check your Supabase setup.</p>:
!hacks?.length?<p className="glass p-4">No upcoming hackathons yet. Admins can add one from the dashboard.</p>:
<ul className="grid gap-4 sm:grid-cols-2">{hacks.map(h=><li key={h.id} className="glass p-4"><h3 className="font-semibold">{h.title}</h3>
<p className="text-sm text-slate-400">{h.organizer} · {h.starts_on??"TBA"} · {h.status}</p>{h.is_sample&&<span className="text-xs text-amber-300">Sample data</span>}</li>)}</ul>}</section></div>)}
