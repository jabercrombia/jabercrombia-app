import { getPageHeaderCollection } from "@/lib/api";

interface PageHeaderProps {
  pageID: string;
}

async function ImageHeader(pageID: any) {
  let pageHeader = await getPageHeaderCollection(pageID.pageID);
  pageHeader = pageHeader?.pageHeaderCollection?.items[0];

  return (
    <div className="mx-auto mt-[20px] h-[200px] container flex items-center text-center">
      <header className="px-[15px] w-full text-black">
        <h1 className="uppercase text-4xl">{pageHeader.title}</h1>
        <p className="text-sm mb-5">{pageHeader.body}</p>
      </header>
    </div>
  );
}

export default ImageHeader;
