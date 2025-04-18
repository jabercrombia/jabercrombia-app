
interface SectionProps {

  name?: string;
  company?: string;
}

export default function Section({  name, company }: SectionProps) {

    return (

            <div className="container mx-auto bg-[#f2f2f2] shadow-md rounded-lg p-4 mb-4 transition-transform duration-300 hover:scale-105">
                <h4 className="font-medium">{name}</h4>
                <p className="font-light">{company}</p>
            </div>

    )
}


