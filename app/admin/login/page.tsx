import {redirect} from "next/navigation";import {createClient} from "@/lib/supabase";
async function login(fd:FormData){"use server";const sb=createClient();
const {error}=await sb.auth.signInWithPassword({email:String(fd.get("email")),password:String(fd.get("password"))});
if(error)redirect("/admin/login?e=1");redirect("/admin/applications")}
export default function P({searchParams}:{searchParams:{e?:string}}){return(<form action={login} className="glass p-6 max-w-sm mx-auto mt-16 space-y-3">
<h1 className="text-xl font-semibold">Admin sign in</h1>{searchParams.e&&<p role="alert" className="text-red-300 text-sm">Email or password is incorrect.</p>}
<label className="block text-sm">Email<input name="email" type="email" required className="inp mt-1"/></label>
<label className="block text-sm">Password<input name="password" type="password" required className="inp mt-1"/></label><button className="btn">Sign in</button></form>)}
