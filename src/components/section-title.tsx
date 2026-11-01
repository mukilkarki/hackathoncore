export function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div className="mb-8 max-w-2xl"><p className="mb-3 text-xs font-bold uppercase tracking-[.24em] text-violet-300">{eyebrow}</p><h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>{text && <p className="mt-3 leading-7 text-slate-400">{text}</p>}</div>;
}
