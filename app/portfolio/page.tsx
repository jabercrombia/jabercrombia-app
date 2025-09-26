import Filter from "../../components/ui/filter";
import { Suspense } from "react";

import { getProjectCollection } from "@/lib/api";

import PageHeader, { getPageHeaderMetadata } from "@/components/pageheader";
import { Metadata } from "next";

// Dynamic metadata at the page level
export async function generateMetadata(): Promise<Metadata> {
  return await getPageHeaderMetadata("portfolio");
}

export default async function PostPage() {

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <>
      <PageHeader pageID="portfolio"/>
      <Suspense fallback={<div>Loading...</div>}>
      <Filter data={projects}/>
      </Suspense>

    </>
    
  );
}
