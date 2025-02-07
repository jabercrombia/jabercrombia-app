import { getPageHeaderCollection } from "@/lib/api";
import Image from 'next/image'
import Link from "next/link";   
interface PageHeaderProps {
    pageID: string;
}

async function ImageHeader(pageID: any) {

    let pageHeader = await getPageHeaderCollection(pageID.pageID);
    pageHeader = pageHeader?.pageHeaderCollection?.items[0];

    return (
  
        <div className="container mx-auto mt-[20px]">
            <div className="px-[15px] w-full text-center text-black">
                <h1 className="uppercase">{pageHeader.title}</h1>
                <p className="md:text-lg text-xs tracking-[2px]">{pageHeader.body}</p>
            </div>
        </div>
    )
};
    
export default ImageHeader;