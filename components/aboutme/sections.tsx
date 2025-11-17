import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  name?: string;
}

export default function Section({ children, name }: SectionProps) {

    return (
        <section>
            <div className="container mx-auto">
                <h2 className="uppercase font-medium text-xs">{name}</h2>
                {children}
            </div>
        </section>
    )
}


