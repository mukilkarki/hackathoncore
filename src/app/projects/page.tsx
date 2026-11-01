import type { Metadata } from "next";
import { sampleProjects } from "@/lib/data";
import { ProjectCard } from "@/components/cards";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = { title: "Projects" };
export default function ProjectsPage(){return <><section className="page-hero"><div className="container"><PageHeading eyebrow="Our work" title="From problem statements to prototypes." description="A portfolio of experiments, hackathon builds and real-world solutions. Publish projects when the team is ready to share them."/></div></section><section className="content-section container"><div className="card-grid">{sampleProjects.map(p=><ProjectCard key={p.title} project={p}/>)}</div><p className="muted" style={{fontSize:12,marginTop:20}}>Project Alpha, Nova and Pulse are demo placeholders. Replace or remove them before launch.</p></section></>}
