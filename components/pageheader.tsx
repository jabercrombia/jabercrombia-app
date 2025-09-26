import { getPageHeaderCollection } from "@/lib/api";
import { Metadata } from "next";
import { truncateText } from "@/lib/truncatetext";

interface PageHeaderProps {
  pageID: string;
}

// Helper function to get metadata dynamically
export async function getPageHeaderMetadata(pageID: string): Promise<Metadata> {
  let pageHeader = await getPageHeaderCollection(pageID);
  pageHeader = pageHeader?.pageHeaderCollection?.items?.[0];

  return {
    title: pageHeader ? `${pageHeader.title} | jabercrombia` : "jabercrombia",
    description: truncateText(pageHeader?.body, 130),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageHeader?.title || pageID}`,
    },
    openGraph: {
      title: pageHeader?.title,
      description: truncateText(pageHeader?.body, 130),
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${pageHeader?.title || pageID}`,
    },
  };
}

// Component to render the page header
export default async function PageHeader({ pageID }: PageHeaderProps) {
  let pageHeader = await getPageHeaderCollection(pageID);
  pageHeader = pageHeader?.pageHeaderCollection?.items?.[0];

  if (!pageHeader) return null;

  return (
    <div className="mx-auto mt-[20px] h-[200px] container flex items-center text-center">
      <header className="px-[15px] w-full text-black">
        <h1 className="uppercase text-4xl">{pageHeader.title}</h1>
        <p className="text-sm mb-5">{pageHeader.body}</p>
      </header>
    </div>
  );
}
