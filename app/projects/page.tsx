import Link from "next/link";
import PageHeader from "../../components/pageheader";

import { getProjectCollection } from "@/lib/api";
import VisitButton from "@/components/visitButton";


export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <>
      <PageHeader pageID="projects"/>
      <div className="container mx-auto">
        <div className="p-[15px]">
        {projects?.map(
          (elem: { title: string; description: string, url: string, photosCollection: { items: { url: string, title: string }[] } }, index: number) => (
            <div className="flex flex-wrap" key={index}>
              <div className="md:w-1/2 w-full content-center p-[10px]">
                <h2>{elem.title}</h2>
                <p>{elem.description}</p>
                <VisitButton bg={"black"} btnText={"Visit"} classes="" textColor={"white"} linkDestination={elem.url} linkDestinationExternal={true} buttonLocation={index % 2 !== 0}/>
              </div>
              <div className="md:w-1/2 w-full  p-[10px]">
                <img src={elem.photosCollection.items[0].url} alt={elem.photosCollection.items[0].title} className="border-2 border-grey p-2"/>
              </div>
            </div>

          )
        )}
        </div>
      </div>
    </>
    
  );
}
