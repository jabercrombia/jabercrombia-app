import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  name?: string;
}

export default function Section({ children, name }: SectionProps) {
  return (
    <section className="mb-10">
      <div className="container mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xs uppercase tracking-widest font-semibold text-slate-500 shrink-0">{name}</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-blue-500/25 to-transparent" />
        </div>
        {children}
      </div>
    </section>
  );
}
