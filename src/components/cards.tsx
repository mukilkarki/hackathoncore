import Link from "next/link";
import { ArrowUpRight, Code2, Cpu, Sparkles, Trophy, Users } from "lucide-react";

export function StatCard({ value, label }: { value: string; label: string }) {
  return <div className="stat-card"><strong>{value}</strong><span>{label}</span></div>;
}

export function MemberCard({ member }: { member: { id: string; name: string; role: string; department: string; skills: string[]; initials: string } }) {
  return <article className="member-card"><div className="avatar">{member.initials}</div><div className="member-id">{member.id}</div><h3>{member.name}</h3><p>{member.role}</p><div className="tag-row">{member.skills.map(s => <span className="tag" key={s}>{s}</span>)}</div></article>;
}

export function ProjectCard({ project }: { project: { title: string; category: string; description: string; stack: string[]; status: string } }) {
  return <article className="content-card project-card"><div className="card-icon"><Code2 /></div><div className="card-meta">{project.category} <span>{project.status}</span></div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.stack.map(s => <span className="tag" key={s}>{s}</span>)}</div></article>;
}

export function HackathonCard({ event }: { event: { title: string; type: string; date: string; deadline: string; mode: string; description: string; status: string } }) {
  return <article className="content-card event-card"><div className="card-meta">{event.type}<span className="status-pill">{event.status}</span></div><div className="card-icon"><Trophy /></div><h3>{event.title}</h3><p>{event.description}</p><div className="event-details"><span>◷ {event.date}</span><span>⌁ {event.mode}</span><span>Deadline: {event.deadline}</span></div></article>;
}

export function FeatureCard({ icon, title, description }: { icon: "users" | "cpu" | "sparkles"; title: string; description: string }) {
  const Icon = icon === "users" ? Users : icon === "cpu" ? Cpu : Sparkles;
  return <div className="feature-card"><div className="card-icon"><Icon /></div><h3>{title}</h3><p>{description}</p></div>;
}

export function SectionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="text-link">{children} <ArrowUpRight size={16} /></Link>;
}
