import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/site-nav";
export const metadata: Metadata = {
  title: "HACKATHON CORE — Think. Build. Innovate. Compete.",
  description: "Six members. One vision. Endless possibilities."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteNav />{children}<footer className="container py-10 text-sm text-slate-500">© {new Date().getFullYear()} HACKATHON CORE · Six Members. One Vision. Endless Possibilities.</footer></body></html>;
}
