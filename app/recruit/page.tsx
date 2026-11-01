import {z} from "zod";import {redirect} from "next/navigation";import {createClient} from "@/lib/supabase";
const S=z.object({name:z.string().min(2).max(100),email:z.string().email().max(200),phone:z.string().max(30).optional(),college:z.string().min(2).max(150),
department:z.string().min(2).max(100),year:z.coerce.number().int().min(1).max(8),primary_skill:z.string().min(2).max(80),secondary_skill:z.string().max(80).optional(),
technologies:z.string().max(300).optional(),portfolio_url:z.string().url().max(300).optional().or(z.literal("")),hackathon_experience:z.string().max(1000).optional(),
project_experience:z.string().max(1000).optional(),weekly_hours:z.coerce.number().int().min(1).max(80),motivation:z.string().min(20).max(2000),
preferred_role:z.string().max(80).optional(),backup_role:z.string().max(80).optional(),consent:z.literal("on")});
async function submit(fd:FormData){"use server";
if(fd.get("website"))redirect("/recruit?done=1"); // honeypot: silently drop bots
const raw=Object.fromEntries([...fd.entries()].filter(([,v])=>v!==""));const p=S.safeParse(raw);
if(!p.success)redirect("/recruit?e="+encodeURIComponent(p.error.issues[0].path.join(".")+": "+p.error.issues[0].message));
const {consent,...row}=p.data;const {error}=await createClient().from("applications").insert({...row,consent:true}); // no .select(): anon cannot read rows
if(error)redirect("/recruit?e="+encodeURIComponent(error.code==="23505"?"This email has already applied.":"Could not save your application. Try again."));
redirect("/recruit?done=1")}
const F=(n:string,l:string,t="text",req=true)=><label className="block text-sm">{l}<input name={n} type={t} required={req} className="inp mt-1"/></label>;
export default function P({searchParams}:{searchParams:{done?:string;e?:string}}){
if(searchParams.done)return <div className="glass p-8 mt-10 text-center"><h1 className="text-2xl font-semibold">Application received</h1><p className="mt-2 text-slate-300">We saved your application and will email you about next steps.</p></div>;
return(<form action={submit} className="glass p-6 mt-8 grid gap-4 sm:grid-cols-2"><h1 className="sm:col-span-2 text-2xl font-semibold">Join HACKATHON CORE</h1>
{searchParams.e&&<p role="alert" className="sm:col-span-2 text-red-300 text-sm">{searchParams.e}</p>}
{F("name","Full name")}{F("email","Email","email")}{F("phone","Phone","tel",false)}{F("college","College")}{F("department","Department")}{F("year","Year of study","number")}
{F("primary_skill","Primary skill")}{F("secondary_skill","Secondary skill","text",false)}{F("technologies","Technologies (comma separated)","text",false)}{F("portfolio_url","GitHub or portfolio URL","url",false)}
{F("weekly_hours","Weekly availability (hours)","number")}{F("preferred_role","Preferred role","text",false)}{F("backup_role","Backup role","text",false)}
<label className="sm:col-span-2 text-sm">Previous hackathon experience<textarea name="hackathon_experience" rows={2} className="inp mt-1"/></label>
<label className="sm:col-span-2 text-sm">Project experience<textarea name="project_experience" rows={2} className="inp mt-1"/></label>
<label className="sm:col-span-2 text-sm">Why do you want to join?<textarea name="motivation" rows={4} required minLength={20} className="inp mt-1"/></label>
<input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden/>
<label className="sm:col-span-2 text-sm flex gap-2"><input name="consent" type="checkbox" required/>I agree to the team storing my details for recruitment only.</label>
<button className="btn sm:col-span-2">Submit application</button></form>)}
