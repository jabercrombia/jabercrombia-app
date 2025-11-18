import Filter from "../../components/ui/filterNav";
import FilterDisplay from "../../components/ui/filterDisplay";
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
      <div className="container mx-auto md:flex gap-10">
        <div className="w-1/3">
        <div className="md:sticky top-40">
          <PageHeader pageID="portfolio"/>
          <Filter data={projects}/>
        </div>
        </div>
        <div className="w-3/4">
          <FilterDisplay data={projects}/>
        </div>
      </div>

    </>
  );
}
