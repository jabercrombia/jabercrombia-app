"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import StackIcon from "tech-stack-icons";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, GitBranch } from "lucide-react";

interface Item {
  id: number;
  name: string;
  title: string;
  slug: string;
  category: string;
  githubUrl: string;
  description: string;
  url: string;
  technologyNameListCollection: { items: { name: string; techStackIconName: string }[] };
  photosCollection: { items: { title: string; thumbnail: string; url: string; dialog: string }[] };
}

interface FilterListProps {
  data: Item[];
}

export default function FilterDisplay({ data }: FilterListProps) {
  const searchParams = useSearchParams();
  const filters = searchParams.getAll("filter");

  const filteredProjects =
    filters.length > 0
      ? data.filter((project) =>
          project.technologyNameListCollection.items.some((tech) =>
            filters.includes(tech.name)
          )
        )
      : data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredProjects.map((item, index) => (
        <Sheet key={index}>
          <SheetTrigger asChild>
            <div className="group bg-[#0e1219] border border-[rgba(255,255,255,0.07)] overflow-hidden cursor-pointer hover:border-[rgba(79,142,247,0.3)] transition-colors">

              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={item.photosCollection.items[0]?.thumbnail}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  priority={index < 3}
                />
              </div>

              {/* Info */}
              <div className="p-4 border-t border-[rgba(255,255,255,0.07)]">
                <h3
                  className="text-[#e8eaf0] text-sm font-semibold mb-2 leading-snug"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3 technologyList">
                  {item.technologyNameListCollection.items.slice(0, 5).map((tech, i) => (
                    <StackIcon key={i} name={tech.techStackIconName} className="w-4 h-4" />
                  ))}
                </div>
                <p className="text-[10px] tracking-[0.1em] uppercase text-[#4a5068] group-hover:text-[#4f8ef7] transition-colors">
                  View details ↗
                </p>
              </div>
            </div>
          </SheetTrigger>

          <SheetContent className="bg-[#0e1219] border-l border-[rgba(255,255,255,0.07)] text-[#e8eaf0] overflow-y-auto">
            <SheetHeader className="mb-6">
              <SheetTitle
                className="text-[#e8eaf0] text-xl font-bold"
                style={{ fontFamily: "var(--font-syne), sans-serif" }}
              >
                {item.title}
              </SheetTitle>
            </SheetHeader>

            <Image
              className="w-full mb-6 border border-[rgba(255,255,255,0.07)]"
              src={item.photosCollection.items[0]?.url}
              width={600}
              height={340}
              alt={item.title}
            />

            <SheetDescription asChild>
              <div className="text-[13.5px] text-[var(--primary-color)] leading-[1.75] mb-6 prose prose-invert prose-sm max-w-none">
                <Markdown>{item.description}</Markdown>
              </div>
            </SheetDescription>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-6 technologyList">
              {item.technologyNameListCollection.items.map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-[11px] text-[var(--primary-color)] bg-[#141920] border border-[rgba(255,255,255,0.07)] px-2 py-1 rounded"
                >
                  <StackIcon name={tech.techStackIconName} className="w-3.5 h-3.5" />
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 border-t border-[rgba(255,255,255,0.07)] pt-4">
              {item.githubUrl && (
                <Link
                  href={item.githubUrl}
                  className="flex items-center gap-1.5 text-[12px] text-[var(--primary-color)] hover:text-[#e8eaf0] transition-colors"
                  target="_blank"
                >
                  <GitBranch size={14} /> GitHub
                </Link>
              )}
              {item.url && (
                <Link
                  href={item.url}
                  className="flex items-center gap-1.5 text-[12px] text-[#4f8ef7] hover:opacity-75 transition-opacity"
                  target="_blank"
                >
                  <ExternalLink size={14} /> Visit site
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
}
