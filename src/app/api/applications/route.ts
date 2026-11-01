import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema=z.object({
 name:z.string().trim().min(2).max(120), email:z.string().trim().email().max(254),
 phone:z.string().trim().max(40).optional(), college:z.string().trim().min(2).max(180),
 department:z.string().trim().min(2).max(120), year:z.string().trim().min(1).max(30),
 primary_skill:z.string().trim().min(1).max(120), secondary_skill:z.string().max(120).optional(),
 technologies:z.string().max(500).optional(), github_url:z.union([z.literal(""),z.string().url().max(500)]).optional(),
 hackathon_experience:z.string().max(1500).optional(), project_experience:z.string().max(1500).optional(),
 weekly_availability:z.string().max(300).optional(), preferred_role:z.string().max(120).optional(),
 backup_role:z.string().max(120).optional(), motivation:z.string().trim().min(30).max(3000),
 consent:z.literal("true")
});
export async function POST(req:Request){
 try{
  const body=await req.json();const parsed=schema.safeParse(body);
  if(!parsed.success)return NextResponse.json({error:"Please check the required fields and try again."},{status:400});
  // Add verified CAPTCHA + IP/email throttling here before enabling public production intake.
  const supabase=await createClient();
  const {data,error}=await supabase.from("applications").insert({...parsed.data, status:"submitted"}).select("id").single();
  if(error){console.error("Application insert failed",error.code);return NextResponse.json({error:"Applications are not configured yet. Please contact the team."},{status:503});}
  return NextResponse.json({ok:true,reference:data.id},{status:201});
 }catch{return NextResponse.json({error:"Invalid request."},{status:400});}
}
