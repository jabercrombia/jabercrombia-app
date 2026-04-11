"use client";

import { useRouter, useSearchParams } from "next/navigation";
import StackIcon from "tech-stack-icons";
import { useState, useEffect } from "react";

interface TechnologyItem {
  name: string;
  techStackIconName?: string;
}

interface Item {
  technologyNameListCollection: { items: TechnologyItem[] };
}

interface FilterListProps {
  data: Item[];
}

export default function FilterList({ data }: FilterListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    () => searchParams.getAll("filter")
  );

  useEffect(() => {
    const params = new URLSearchParams();
    selectedTechnologies.forEach((tech) => params.append("filter", tech));
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedTechnologies, router]);

  const handleToggle = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const uniqueTechItems = Array.from(
    new Map(
      data
        .flatMap((item) => item.technologyNameListCollection.items || [])
        .map((t) => [t.name, t])
    ).values()
  );

  return (
    <div className="flex flex-col gap-1 pt-2">
      <div className="text-[10px] tracking-[0.15em] uppercase text-[#4a5068] mb-3">
        Filter by tech
      </div>
      {uniqueTechItems.map((tech, index) => {
        const active = selectedTechnologies.includes(tech.name);
        return (
          <button
            key={index}
            onClick={() => handleToggle(tech.name)}
            className={`flex items-center gap-2 px-3 py-2 mb-1 rounded text-left text-[12px] tracking-[0.03em] transition-colors w-full border ${
              active
                ? "bg-[#141920] text-[#4f8ef7] border-[rgba(79,142,247,0.3)]"
                : "bg-[#0e1219] text-[#7a8099] border-[rgba(255,255,255,0.07)] hover:text-[#e8eaf0] hover:border-[rgba(255,255,255,0.15)]"
            }`}
          >
            <StackIcon name={tech.techStackIconName} className="w-4 h-4 shrink-0" />
            {tech.name}
          </button>
        );
      })}
      {selectedTechnologies.length > 0 && (
        <button
          onClick={() => setSelectedTechnologies([])}
          className="mt-3 text-[10px] tracking-[0.1em] uppercase text-[#4a5068] hover:text-[#e8eaf0] transition-colors text-left"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
