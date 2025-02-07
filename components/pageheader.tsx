import { getPageHeaderCollection } from "@/lib/api";
import Image from 'next/image'

interface PageHeaderProps {
    pageID: string;
}

async function ImageHeader(pageID: any) {

    let pageHeader = await getPageHeaderCollection(pageID.pageID);
    pageHeader = pageHeader?.pageHeaderCollection?.items[0];

    return (
        <div className="w-full bg-black flex-none relative">
            <img src={pageHeader?.heroImage?.url} className="object-cover opacity-50"/>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-white">
                <h1 className="uppercase">{pageHeader.title}</h1>
                <p className="tracking-[2px]">{pageHeader.body}</p>
            </div>
        </div>
    )
};
    
export default ImageHeader;