"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";

interface ModalProps {
  data: {  title: string; githubUrl: string; technologyList: string; description: string, url: string, photosCollection: { items: { url: string, thumbnail: string, title: string }[] }};
}

export default function ImageSheet({ data }: ModalProps) {

  const [open, setOpen] = useState(false);
  const truncatedText = data?.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description;

  return (
    <div>
      {/* Image that triggers the sheet */}
      <button onClick={() => setOpen(true)}>
      <img className="cursor-pointer border border-black rounded-md hover:opacity-70" src={data.photosCollection.items[0].url} alt={data.title} />
      </button>
      <h2 className="mt-[10px]">{data.title}</h2>
      <p className='text-xs'>{truncatedText}</p>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <h2 className="text-xl font-bold mb-[10px]">{data.title}</h2>
          <p>{data?.description}</p>
          <img className="border border-black mt-[10px]" src={data.photosCollection.items[0].url} alt={data.title} />
          {data.githubUrl && <p className="mt-[10px] text-xs">Github: <Link href={data.githubUrl}>{data.githubUrl}</Link></p>}
          <Button className="mt-[15px]"><Link href={data?.url}>Go to Page</Link></Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}
