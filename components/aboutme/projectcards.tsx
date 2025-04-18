"use client"

import StackIcon from "tech-stack-icons";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { truncateText } from "../../lib/truncatetext";
import ReactMarkdown from "react-markdown";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoLinkProps {
    data: { 
        slug: string;
        title: string; 
        description: string; 
        technologyNameListCollection: { items: { name: string, techStackIconName: string }[] }, 
        photosCollection: { items: { about: string; title: string }[] } 
    };
}

export default function ProjectCard({ data }: PhotoLinkProps) {
  
    

    return (
        <Card className="transition-transform duration-300 hover:scale-105">
        <CardHeader>
            <CardTitle>  <h3>{data.title}</h3></CardTitle>
            <CardDescription className="flex gap-2 items-center">
                <div>
                    <p>Tech Stack: </p>
                </div>
            {data.technologyNameListCollection.items.map((elem: { name: string, techStackIconName: string }, index: number) => (
                <div key={index} className="flex">
                    <StackIcon name={elem.techStackIconName} className="w-4 h-4 inline" />
                </div>
            ))}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <img src={data.photosCollection.items[0].about} alt={data.title} className="w-full mb-[10px] border"/>
            <ReactMarkdown>{truncateText(data.description, 129)}</ReactMarkdown>
        </CardContent>
        <CardFooter>
            <div className="flex items-center">
                <Button variant="outline" size="icon">
                <Link href={`/projects?slug=${data.slug}`} className="text-sm"><ChevronRight /></Link>
                </Button>
            </div>
        </CardFooter>
      </Card>
      
    );
}
