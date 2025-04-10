import PageHeader from "../../components/pageheader";
import Filter from "../../components/ui/filter";
import { getProjectCollection } from "@/lib/api";
import Dialog from "../../components/links/projects/dialog";
export const metadata = {
  title: 'jabercrombia | Projects',
}
export default async function PostPage() {

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <>
      <PageHeader pageID="projects"/>
      <Filter data={projects}/>
    </>
    
  );
}
