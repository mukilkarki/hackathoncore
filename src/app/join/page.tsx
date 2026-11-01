import type { Metadata } from "next";
import { PageHeading } from "@/components/page-heading";
import { JoinForm } from "@/components/join-form";
export const metadata: Metadata = { title: "Join the Team" };
export default function JoinPage(){return <><section className="page-hero"><div className="container"><PageHeading eyebrow="Open recruitment" title="Bring your curiosity. Build with us." description="We welcome motivated students from different departments. You do not need to know everything already; commitment, curiosity and willingness to learn matter."/></div></section><section className="content-section container"><div className="form-shell"><JoinForm/></div><p className="muted" style={{maxWidth:760,margin:"18px auto",fontSize:12}}>Applications are reviewed by the Hackathon Core admin team. Submitting an application does not guarantee selection. Do not submit sensitive personal information.</p></section></>}
