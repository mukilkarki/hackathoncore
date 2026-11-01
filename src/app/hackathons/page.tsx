import type { Metadata } from "next";
import { sampleHackathons } from "@/lib/data";
import { HackathonCard } from "@/components/cards";
import { PageHeading } from "@/components/page-heading";
export const metadata: Metadata = { title: "Hackathons" };
export default function HackathonsPage(){return <><section className="page-hero"><div className="container"><PageHeading eyebrow="Find the next challenge" title="Discover. Prepare. Compete." description="A central watchlist for hackathons and innovation challenges. Add verified event details and official registration links before publishing."/></div></section><section className="content-section container"><div className="card-grid">{sampleHackathons.map(e=><HackathonCard key={e.title} event={e}/>)}</div><p className="muted" style={{fontSize:12,marginTop:20}}>The displayed events are sample placeholders, not confirmed live competitions. Replace them with verified event information.</p></section></>}
