"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase,isSupabaseConfigured } from "@/lib/supabase";
import { Brand } from "./brand";
export function LoginForm(){
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);const router=useRouter();
 async function submit(e:FormEvent){e.preventDefault();setError("");if(!isSupabaseConfigured()){setError("Connect Supabase first using the setup guide.");return;}setBusy(true);try{const {data,error}=await getSupabase().auth.signInWithPassword({email,password});if(error)throw error;const role=data.user?.app_metadata?.role;if(role!=="admin"&&role!=="member"){await getSupabase().auth.signOut();throw new Error("This account has not been approved for workspace access.");}router.push("/dashboard");router.refresh();}catch(e){setError(e instanceof Error?e.message:"Unable to sign in.");}finally{setBusy(false);}}
 return <div className="login-card"><Brand/><span className="eyebrow" style={{marginTop:30}}>Private workspace</span><h1>Welcome back.</h1><p className="muted" style={{fontSize:13}}>Sign in to access the Hackathon Core workspace.</p>{error&&<div className="form-message form-error">{error}</div>}<form onSubmit={submit} style={{display:"grid",gap:16,marginTop:25}}><div className="field"><label htmlFor="email">Email</label><input id="email" type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></div><div className="field"><label htmlFor="password">Password</label><input id="password" type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></div><button className="button" disabled={busy}>{busy?"Signing in…":"Sign in ↗"}</button></form><p className="muted" style={{fontSize:11,marginTop:18}}>Access is limited to accounts provisioned by the team administrator.</p></div>
}
