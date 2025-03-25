import PageHeader from "../../components/pageheader";

import { getProjectCollection } from "@/lib/api";
import ImageModal from "../../components/links/projects/imagemodal";
import Sheet from "../../components/links/projects/sheet";
export const metadata = {
  title: 'jabercrombia | Projects',
}
export default async function PostPage() {

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;
  
  return (
    <>
      <PageHeader pageID="projects"/>
      <div className="container mx-auto projects mt-[40px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-[15px]">
        {projects?.map(
          (elem: { title: string; githubUrl: string; description: string, url: string, photosCollection: { items: { url: string, thumbnail: string, title: string }[] } }, index: number) => (
            <div key={index}>
              {/* <ImageModal imageData={elem}/> */}
              <Sheet data={elem}/>
            </div>
          )
        )}
        </div>
      </div>
    </>
    
  );
}
