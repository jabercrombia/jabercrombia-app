import { Button } from "@/components/ui/button"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import StackIcon from "tech-stack-icons";

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
        title: string; 
        githubUrl: string; 
        technologyList: string; 
        description: string, 
        url: string, 
        photosCollection: { items: { url: string, thumbnail: string, title: string }[] }
        technologyNameListCollection: { items: { name: string, techStackIconName: string }[] }
    }    
}


export default function DialogDemo({ data }: ModalProps) {

    const truncatedText = data?.description.length > 100 ? data.description.slice(0, 100) + "..." : data.description;

    return (
        <Dialog>
        <DialogTrigger asChild>
            <div>
                <img className="cursor-pointer border border-black hover:opacity-70" src={data.photosCollection.items[0].thumbnail} alt={data.title} />
                <p className="mt-[5px]">{data.title}</p>
                <p className='text-xs'>{truncatedText}</p>
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
            <img className="border border-black mt-[10px]" src={data.photosCollection.items[0].url} alt={data.title} />
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
                    <Button type="submit"><Link href={data?.url} target="_blank">Go to Page</Link></Button>
                    </div>
                </div>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
