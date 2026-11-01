import Link from "next/link";
import { ArrowUpRight, BrainCircuit, Cpu, Lightbulb, Rocket, Users } from "lucide-react";
import { team, sampleHackathons, sampleProjects } from "@/lib/data";
import { FeatureCard, HackathonCard, MemberCard, ProjectCard, SectionLink, StatCard } from "@/components/cards";

export default function HomePage() {
  return <>
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="eyebrow">Student innovation team</span>
          <h1>Ideas into reality.<br /><span className="gradient-text">One hackathon at a time.</span></h1>
          <p className="hero-copy">A multidisciplinary team of student innovators building meaningful solutions through technology, creativity and collaboration.</p>
          <div className="hero-actions"><Link className="button" href="/team">Explore our team <ArrowUpRight size={16}/></Link><Link className="button button-secondary" href="/join">Join the team</Link></div>
          <div className="hero-note"><span className="pulse-dot"/> OPEN TO CURIOUS MINDS · MULTIPLE DOMAINS · ONE CORE TEAM</div>
        </div>
        <div className="hero-art" aria-label="Abstract HC innovation core graphic"><div className="orb"><div className="orbit"/><div className="orbit two"/><div className="orb-core">HC</div></div><div className="floating-label label-one">01 / THINK DIFFERENT</div><div className="floating-label label-two">02 / BUILD TOGETHER</div></div>
      </div>
    </section>

    <section className="container"><div className="stat-grid"><StatCard value="06" label="Core team roles"/><StatCard value="∞" label="Ideas to explore"/><StatCard value="01" label="Shared mission"/><StatCard value="All" label="Innovation domains"/></div></section>

    <section className="section">
      <div className="container">
        <div className="section-head"><div><span className="eyebrow">Who we are</span><h2>Different skills.<br/><span className="gradient-text">One team.</span></h2><p>We bring together developers, engineers, designers and problem-solvers to turn ambitious ideas into working prototypes.</p></div><SectionLink href="/about">Discover our story</SectionLink></div>
        <div className="feature-grid"><FeatureCard icon="sparkles" title="AI & innovation" description="Explore emerging technologies and build thoughtful, useful AI-powered experiences."/><FeatureCard icon="cpu" title="Hardware & IoT" description="Connect software with the physical world through embedded systems and connected devices."/><FeatureCard icon="users" title="Collaborative building" description="Work across disciplines, learn from one another and ship solutions as one team."/></div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div className="section-head"><div><span className="eyebrow">The people behind the ideas</span><h2>Meet the <span className="gradient-text">core team.</span></h2><p>Six complementary roles. One shared commitment to learning, building and competing.</p></div><SectionLink href="/team">View all members</SectionLink></div>
        <div className="card-grid">{team.map(m => <MemberCard key={m.id} member={m}/>)}</div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-head"><div><span className="eyebrow">Build in public</span><h2>Ideas become <span className="gradient-text">projects.</span></h2><p>Explore prototypes, experiments and solutions created by Hackathon Core.</p></div><SectionLink href="/projects">Explore projects</SectionLink></div>
        <div className="card-grid">{sampleProjects.map(p => <ProjectCard key={p.title} project={p}/>)}</div>
      </div>
    </section>

    <section className="section section-alt">
      <div className="container">
        <div className="section-head"><div><span className="eyebrow">Find the next challenge</span><h2>Our hackathon <span className="gradient-text">watchlist.</span></h2><p>Track opportunities, prepare early and turn competition deadlines into momentum.</p></div><SectionLink href="/hackathons">View hackathons</SectionLink></div>
        <div className="card-grid">{sampleHackathons.map(e => <HackathonCard key={e.title} event={e}/>)}</div>
      </div>
    </section>

    <section className="section"><div className="container"><div className="cta-panel"><span className="eyebrow">Your next chapter starts here</span><h2>Ready to build something <span className="gradient-text">extraordinary?</span></h2><p>Bring your curiosity, your skills and your willingness to learn. We welcome applicants from different departments and backgrounds.</p><Link className="button" href="/join">Apply to Hackathon Core <ArrowUpRight size={16}/></Link></div></div></section>
  </>;
}
