
interface SectionProps {

  name?: string;
  company?: string;
}

export default function Section({  name, company }: SectionProps) {
    return (
      <div className="mb-2">
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="font-light">{company}</p>
      </div>
    )
}


