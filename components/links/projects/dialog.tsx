"use client"

import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import StackIcon from "tech-stack-icons";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'

import { truncateText } from "@/lib/truncatetext";
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


interface ModalProps {
    data: { 
        slug: string; 
        title: string; 
        githubUrl: string; 
        description: string, 
        url: string, 
        photosCollection: { items: { url: string, thumbnail: string, title: string, dialog: string }[] }
        technologyNameListCollection: { items: { name: string, techStackIconName: string }[] }
    }
    open: boolean;
    setOpen: (open: boolean) => void;   
}



export default function DialogComponent({ data, open, setOpen }: ModalProps) {

    const searchParams = useSearchParams();
    const slugIdFromUrl = searchParams.get("slug");
    const [openDialogId, setOpenDialogId] = useState<string | null>(null);
    
      useEffect(() => {
        if (slugIdFromUrl) {
          setOpenDialogId(slugIdFromUrl);
        }
      }, [slugIdFromUrl]);
    return (
        <div>
            <Suspense>
            <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <div>
                    <img className="cursor-pointer border border-black hover:opacity-70" src={data.photosCollection.items[0].thumbnail} alt={data.title} />
                    <p className="mt-[5px]">{data.title}</p>
                    <p className='text-xs'>{truncateText(data.description, 100)}</p>
                </div>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[375px] md:max-w-[825px]">
                <DialogHeader>
                <DialogTitle>{data.title}</DialogTitle>
                <DialogDescription>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.description}</ReactMarkdown>

                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-2 items-center technologyList">
                    <span className="text-xs">Tech Stack:</span>
                    {data.technologyNameListCollection.items.map((elem: { name: string, techStackIconName: string }, index: number) => (
                        <div key={index} className="flex items-center">
                            <StackIcon name={elem.techStackIconName} />
                        </div>
                    ))}
                </div>
                <div className="grid place-items-center">
                    <img className="border border-black mt-[10px]" src={data.photosCollection.items[0].dialog} alt={data.title} />
                </div>
                <DialogFooter>
                    <div className={`flex  ${data.githubUrl ? `justify-between`: `justify-end`} w-full`}>
                        {data.githubUrl &&
                            <div>
                                <Button>
                                    <Link href={data.githubUrl} target="_blank">Github</Link>
                                </Button>
                            </div>
                        }
                        <div>
                        <Button type="submit"><Link href={data?.url} target="_blank">Go to Site</Link></Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
            </Dialog>
            </Suspense>
        </div>
    )
}
