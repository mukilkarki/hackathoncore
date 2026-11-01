import "./globals.css";import Link from "next/link";
export const metadata={title:"HACKATHON CORE",description:"Think. Build. Innovate. Compete."};
const nav=[["/","Home"],["/recruit","Recruitment"],["/admin","Admin"]];
export default function L({children}:{children:React.ReactNode}){return(<html lang="en"><body className="font-sans antialiased">
<header className="sticky top-0 z-10 backdrop-blur border-b border-white/10"><nav aria-label="Main" className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 p-4">
<Link href="/" className="font-bold tracking-wide">HACKATHON CORE</Link><div className="flex gap-4 text-sm">{nav.map(([h,t])=><Link key={h} href={h}>{t}</Link>)}</div></nav></header>
<main className="max-w-5xl mx-auto p-4">{children}</main>
<footer className="text-center text-sm text-slate-400 p-8">Six Members. One Vision. Endless Possibilities.</footer></body></html>)}
