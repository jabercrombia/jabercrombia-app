"use client";

import { useRouter, useSearchParams } from "next/navigation";
import StackIcon from "tech-stack-icons";
import { useState, useEffect } from "react";

interface TechnologyItem {
  name: string;
  techStackIconName?: string;
}

interface Item {
  id: number;
  name: string;
  title: string;
  slug: string;
  category: string;
  githubUrl: string;
  description: string;
  url: string;
  technologyNameListCollection: { items: TechnologyItem[] };
  photosCollection: { items: { title: string; thumbnail: string; url: string; dialog: string }[] };
}

interface FilterListProps {
  data: Item[];
}

export default function FilterList({ data }: FilterListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read filters from URL on page load
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    () => searchParams.getAll("filter")
  );

  // Update URL whenever selectedTechnologies changes
  useEffect(() => {
    const params = new URLSearchParams();
    selectedTechnologies.forEach((tech) => params.append("filter", tech));
    router.replace(`?${params.toString()}`);
  }, [selectedTechnologies, router]);

  // Toggle checkbox selection
  const handleCheckboxChange = (tech: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(tech)
        ? prev.filter((t) => t !== tech)
        : [...prev, tech]
    );
  };

  // Unique technology items
  const uniqueTechItems = Array.from(
    new Map(
      data
        .flatMap((item) => item.technologyNameListCollection.items || [])
        .map((t) => [t.name, t])
    ).values()
  );

  return (
    <div className="container mx-auto pb-[100px]">
      <div className="flex flex-col gap-4 mb-4 justify-center pt-[20px] px-[15px]">
        {uniqueTechItems.map((tech, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedTechnologies.includes(tech.name)}
              onChange={() => handleCheckboxChange(tech.name)}
              className="h-4 w-4 border-gray-300 rounded"
            />
            <span className="flex items-center gap-1">
              {tech.name}
              <StackIcon name={tech.techStackIconName} className="w-[15px]" />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
