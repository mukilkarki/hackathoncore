import Link from "next/link";
import { Brand } from "./brand";
import { Menu } from "lucide-react";

const links = [
  ["About", "/about"],
  ["Team", "/team"],
  ["Hackathons", "/hackathons"],
  ["Projects", "/projects"]
];

export function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="login-link" href="/login">Member login</Link>
          <Link className="button button-small" href="/join">Join the team <span>↗</span></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation"><Menu size={22} /></summary>
          <div className="mobile-menu-panel">
            {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            <Link href="/join">Join the team</Link>
            <Link href="/login">Member login</Link>
          </div>
        </details>
      </div>
    </header>
  );
}
