import Link from "next/link";
import { Brand } from "./brand";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Brand /><p className="muted footer-about">A multidisciplinary student innovation team building meaningful solutions through technology, creativity and collaboration.</p></div>
        <div><strong>Explore</strong><Link href="/about">About</Link><Link href="/team">Our team</Link><Link href="/hackathons">Hackathons</Link><Link href="/projects">Projects</Link></div>
        <div><strong>Get involved</strong><Link href="/join">Join the team</Link><Link href="/contact">Contact</Link><Link href="/login">Member login</Link></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Hackathon Core</span><span>Think. Build. Innovate. Compete.</span></div>
    </footer>
  );
}
