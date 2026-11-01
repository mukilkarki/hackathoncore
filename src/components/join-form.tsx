"use client";
import { FormEvent, useState } from "react";
import { isSupabaseConfigured, getSupabase } from "@/lib/supabase";

const initial = { full_name:"", email:"", phone:"", college:"", department:"", study_year:"", primary_skill:"", secondary_skills:"", technologies:"", github_url:"", portfolio_url:"", experience:"", weekly_availability:"", preferred_role:"", backup_role:"", motivation:"", consent:false };

export function JoinForm(){
  const [form,setForm]=useState(initial);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState(false);
  function update(key:string,value:string|boolean){setForm(old=>({...old,[key]:value}));}
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setMessage("");setError(false);
    if(!form.consent){setError(true);setMessage("Please confirm the declaration before submitting.");return;}
    if(!isSupabaseConfigured()){setError(true);setMessage("The application form is ready, but Supabase is not connected yet. Follow the setup guide to configure it.");return;}
    setBusy(true);
    try{
      const supabase=getSupabase();
      const {error:dbError}=await supabase.from("applications").insert({
        full_name:form.full_name,email:form.email,phone:form.phone,college:form.college,
        department:form.department,study_year:form.study_year,primary_skill:form.primary_skill,
        secondary_skills:form.secondary_skills.split(",").map(s=>s.trim()).filter(Boolean),
        technologies:form.technologies.split(",").map(s=>s.trim()).filter(Boolean),
        github_url:form.github_url||null,portfolio_url:form.portfolio_url||null,
        experience:form.experience,weekly_availability:form.weekly_availability,
        preferred_role:form.preferred_role,backup_role:form.backup_role,motivation:form.motivation,consent:form.consent
      });
      if(dbError) throw dbError;
      setMessage("Application submitted successfully. The Hackathon Core team will review it.");
      setForm(initial);
    }catch(err){setError(true);setMessage(err instanceof Error?err.message:"Unable to submit. Please try again.");}
    finally{setBusy(false);}
  }
  return <>
    <div style={{marginBottom:24}}><span className="eyebrow">Member application</span><h2 style={{fontSize:30}}>Join Hackathon Core</h2><p className="muted" style={{fontSize:13}}>Tell us about your skills, interests and what you want to build.</p></div>
    {message&&<div className={error?"form-message form-error":"form-message"} role="status">{message}</div>}
    <form onSubmit={submit}>
      <div className="form-grid">
        <div className="field"><label htmlFor="full_name">Full name *</label><input id="full_name" required maxLength={100} value={form.full_name} onChange={e=>update("full_name",e.target.value)} placeholder="Your name"/></div>
        <div className="field"><label htmlFor="email">College email *</label><input id="email" required type="email" maxLength={254} value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@college.edu"/></div>
        <div className="field"><label htmlFor="phone">Phone number *</label><input id="phone" required type="tel" maxLength={20} value={form.phone} onChange={e=>update("phone",e.target.value)} placeholder="Contact number"/></div>
        <div className="field"><label htmlFor="college">College name *</label><input id="college" required maxLength={150} value={form.college} onChange={e=>update("college",e.target.value)} placeholder="College / institution"/></div>
        <div className="field"><label htmlFor="department">Department *</label><input id="department" required maxLength={100} value={form.department} onChange={e=>update("department",e.target.value)} placeholder="CSE, ECE, EEE, etc."/></div>
        <div className="field"><label htmlFor="study_year">Year of study *</label><select id="study_year" required value={form.study_year} onChange={e=>update("study_year",e.target.value)}><option value="">Select year</option>{["1st year","2nd year","3rd year","4th year","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div className="field"><label htmlFor="primary_skill">Primary skill *</label><select id="primary_skill" required value={form.primary_skill} onChange={e=>update("primary_skill",e.target.value)}><option value="">Select skill</option>{["Frontend development","Backend development","AI / Machine Learning","Hardware / IoT","UI/UX design","Research / Documentation / Pitching","Other"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div className="field"><label htmlFor="preferred_role">Preferred role</label><input id="preferred_role" value={form.preferred_role} onChange={e=>update("preferred_role",e.target.value)} placeholder="Your preferred team role"/></div>
        <div className="field full"><label htmlFor="secondary_skills">Other skills (comma separated)</label><input id="secondary_skills" value={form.secondary_skills} onChange={e=>update("secondary_skills",e.target.value)} placeholder="Figma, Python, public speaking"/></div>
        <div className="field full"><label htmlFor="technologies">Technologies you have used (comma separated)</label><input id="technologies" value={form.technologies} onChange={e=>update("technologies",e.target.value)} placeholder="React, Python, Arduino, Firebase"/></div>
        <div className="field"><label htmlFor="github_url">GitHub URL</label><input id="github_url" type="url" value={form.github_url} onChange={e=>update("github_url",e.target.value)} placeholder="https://github.com/..."/></div>
        <div className="field"><label htmlFor="portfolio_url">Portfolio URL</label><input id="portfolio_url" type="url" value={form.portfolio_url} onChange={e=>update("portfolio_url",e.target.value)} placeholder="https://..."/></div>
        <div className="field full"><label htmlFor="experience">Previous hackathons / projects</label><textarea id="experience" value={form.experience} onChange={e=>update("experience",e.target.value)} placeholder="Tell us about your experience or personal projects."/></div>
        <div className="field"><label htmlFor="weekly_availability">Weekly availability *</label><select id="weekly_availability" required value={form.weekly_availability} onChange={e=>update("weekly_availability",e.target.value)}><option value="">Select hours</option>{["1–3 hours","4–6 hours","7–10 hours","10+ hours"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div className="field"><label htmlFor="secondary_role">Backup role / skill</label><input id="secondary_role" value={form.backup_role} onChange={e=>update("backup_role",e.target.value)} placeholder="A skill you can support"/></div>
        <div className="field full"><label htmlFor="motivation">Why do you want to join Hackathon Core? *</label><textarea id="motivation" required maxLength={2000} value={form.motivation} onChange={e=>update("motivation",e.target.value)} placeholder="Tell us what motivates you and what you hope to contribute."/></div>
        <div className="field full"><label className="checkbox-row"><input type="checkbox" checked={form.consent} onChange={e=>update("consent",e.target.checked)}/> I confirm that the information is accurate and agree to the recruitment review process. *</label></div>
      </div>
      <div className="form-actions"><span className="muted" style={{fontSize:11}}>Fields marked * are required.</span><button className="button" type="submit" disabled={busy}>{busy?"Submitting…":"Submit application ↗"}</button></div>
    </form>
  </>;
}
