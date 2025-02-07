import Link from "next/link";
import PageHeader from "../../components/pageheader";

import { getPhotosCollection } from "@/lib/api";


export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  let photos = await getPhotosCollection();
  photos = photos?.photosCollection?.items;

  return (
    <>
      <PageHeader pageID="photos"/>
      <div className="flex container mx-auto mt-10">
        {photos?.map(
          (elem: { title: string; slug: string, photosCollection: { items: { url: string, title: string }[] } }, index: number) => (
              <div className={`h-[40px] w-1/3 p-3`} key={index}>
                <Link href={`photos/${elem.slug}`}>
                <img src={elem?.photosCollection?.items[0]?.url} alt={elem?.photosCollection?.items[0]?.title} />
                <h2 className="text-black text-center tracking-[2px] uppercase text-2xl mt-[10px]">{elem?.title}</h2>
                </Link>
              </div>
          )
        )}
      </div>
    </>
    
  );
}
