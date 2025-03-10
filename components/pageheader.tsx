import { getPageHeaderCollection } from "@/lib/api";

interface PageHeaderProps {
    pageID: string;
}

async function ImageHeader(pageID: any) {

    let pageHeader = await getPageHeaderCollection(pageID.pageID);
    pageHeader = pageHeader?.pageHeaderCollection?.items[0];

    return (
  
        <div className="mx-auto mt-[20px] container">
            <div className="px-[15px] w-full text-center text-black">
                <h1 className="uppercase text-2xl">{pageHeader.title}</h1>
                <p className="">{pageHeader.body}</p>
            </div>
        </div>
    )
};
    
export default ImageHeader;