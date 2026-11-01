import Link from "next/link";
import { Zap } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="Hackathon Core home">
      <span className="brand-mark"><Zap size={21} strokeWidth={2.5} /></span>
      {!compact && <span className="brand-copy"><strong>HACKATHON CORE</strong><small>THINK. BUILD. INNOVATE.</small></span>}
    </Link>
  );
}
