import type { Metadata } from "next";
import { team } from "@/lib/data";
import { MemberCard } from "@/components/cards";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = { title: "Our Team" };
export default function TeamPage(){return <><section className="page-hero"><div className="container"><PageHeading eyebrow="The people behind the build" title="Six roles. One shared mission." description="Our founding team structure is designed to balance product thinking, software, AI, hardware, research and communication. Replace the role placeholders with confirmed member profiles."/></div></section><section className="content-section container"><div className="card-grid">{team.map(m=><MemberCard key={m.id} member={m}/>)}</div><div className="prose-card" style={{marginTop:24}}><h3>How we work</h3><p>Every core member has a primary responsibility and a backup skill. Roles can evolve as the team grows, but ownership, communication and shared learning remain essential.</p></div></section></>}
