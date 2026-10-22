import { cn } from "@/lib/utils";

type SectionLabelProps = {
  children: React.ReactNode;
  as?: "h2" | "div";
  id?: string;
  action?: React.ReactNode;
  className?: string;
};

export default function SectionLabel({ children, as: Tag = "h2", id, action, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 pb-8 pt-16", className)}>
      <Tag id={id} className="m-0 shrink-0 text-[13px] font-normal uppercase tracking-[0.15em] text-[var(--text3)]">
        {children}
      </Tag>
      <span className="h-px flex-1 bg-[var(--divider)]" aria-hidden="true" />
      {action}
    </div>
  );
}
