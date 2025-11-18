"use client";

import { useRouter, useSearchParams } from "next/navigation";
import StackIcon from "tech-stack-icons";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import Image from 'next/image';
import Markdown from "react-markdown";
import { ExternalLink, Github } from "lucide-react";




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
  technologyNameListCollection: { items: { name: string, techStackIconName: string }[] };
  photosCollection: { items: { title: string; thumbnail: string; url: string; dialog: string }[] };
}

interface FilterListProps {
  data: Item[];
}

export default function FilterList({ data }: FilterListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read ?filter=NextJS&filter=Go
  const filters = searchParams.getAll("filter");

  // Match function
  const matchByTechNames = (filters: string[], projects: Item[]) => {
    return projects.filter(project =>
      project.technologyNameListCollection.items.some(tech =>
        filters.includes(tech.name)
      )
    );
  };

  // Apply filter (or show all if no URL filters)
  const filteredProjects =
    filters.length > 0 ? matchByTechNames(filters, data) : data;
  console.log(filteredProjects);

  return (
    <div className="container mx-auto pb-[100px]">
      <div className="grid grid-cols-3 gap-4 mb-4 justify-center pt-[20px] px-[15px]">

        {filteredProjects.map((item, index) => (
          <div key={index} className="hover:opacity-50 transition-opacity duration-300">

            <Sheet>
              <SheetTrigger asChild>
                <div>
                  <img className="grayscale border" src={item.photosCollection.items[0].thumbnail} alt={item.title}/>
                  <p className="text-sm pt-[10px]">{item.title}</p>
                </div>

              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{item.title}</SheetTitle>
                  <SheetDescription>
                    <Image className="border mb-6" src={item.photosCollection.items[0].url} width={400} height={225} alt={item.title}/>
                    <Markdown>{item.description}</Markdown>
                  </SheetDescription>
                </SheetHeader>
                <div className="flex justify-between mt-4">
                  {item.githubUrl && <Link href={item.githubUrl}><Github className="inline"/> Github</Link>}
                  {item.url && <Link href={item.url}><ExternalLink className="inline" /> Visit</Link>}
                </div>
                <SheetFooter>
               
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        ))}

      </div>
    </div>
  );
}
