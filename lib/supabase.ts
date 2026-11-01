import {createServerClient} from "@supabase/ssr";import {cookies} from "next/headers";
export function createClient(){const c=cookies();return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{cookies:{getAll:()=>c.getAll(),setAll:(l)=>{try{l.forEach(({name,value,options})=>c.set(name,value,options))}catch{}}}})}
export async function requireAdmin(){const sb=createClient();const {data:{user}}=await sb.auth.getUser();
if(!user)return null;const {data}=await sb.from("users").select("role").eq("id",user.id).single();return data?.role==="admin"?{sb,user}:null}
