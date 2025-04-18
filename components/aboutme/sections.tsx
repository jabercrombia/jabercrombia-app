import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  name?: string;
}

export default function Section({ children, name }: SectionProps) {

    return (
        <section className="w-full">
            <div className="container mx-auto">
                <h2>{name}</h2>
                {children}
            </div>
        </section>
    )
}


