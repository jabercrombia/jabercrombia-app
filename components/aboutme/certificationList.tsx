interface CertificationProps {
  name?: string;
  company?: string;
}

export default function CertificationList({ name, company }: CertificationProps) {
  return (
    <div className="mb-3 pl-3 border-l border-blue-500/30">
      <p className="text-sm text-slate-300 font-medium leading-snug">{name}</p>
      <p className="text-xs text-slate-500 mt-0.5">{company}</p>
    </div>
  );
}
