import Link from "next/link";
const links = [["About","/about"],["Team","/team"],["Hackathons","/hackathons"],["Projects","/projects"]];
export function SiteNav() {
  return <header className="sticky top-0 z-20 border-b border-white/10 bg-[#070b18]/85 backdrop-blur-xl">
    <nav className="container flex min-h-16 items-center justify-between gap-4">
      <Link href="/" className="font-black tracking-tight"><span className="gradient-text">HACKATHON</span> CORE</Link>
      <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">{links.map(([label,href])=><Link key={href} href={href} className="hover:text-white">{label}</Link>)}</div>
      <Link href="/recruitment" className="rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-2 text-sm font-semibold shadow-lg shadow-violet-950/40">Join the team ↗</Link>
    </nav>
  </header>;
}
