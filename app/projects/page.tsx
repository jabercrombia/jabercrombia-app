import PageHeader from "../../components/pageheader";
import Filter from "../../components/ui/filter";
import { Suspense } from "react";

import { getProjectCollection } from "@/lib/api";
export const metadata = {
  title: 'jabercrombia | Projects',
}
export default async function PostPage() {

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <>
      <PageHeader pageID="projects"/>
      <Suspense fallback={<div>Loading...</div>}>
      <Filter data={projects}/>
      </Suspense>

    </>
    
  );
}
