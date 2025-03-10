"use client"

import Link from "next/link";
import PageHeader from "../../components/pageheader";
import Head from "next/head";
import { getPhotosCollection } from "@/lib/api";

// export const metadata = {
//   title: 'jabercrombia | Photos',
// }
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  


  let photos = await getPhotosCollection();
  photos = photos?.photosCollection?.items;

  return (
    <>
    <Head>
        <title>title</title>
        <meta name="description" content="{description}" />
      </Head>
      <PageHeader pageID="photos"/>
      <div className="container mx-auto mt-10">
        <div className="sm:columns-1 md:columns-3">
        {photos?.map(
          (elem: { title: string; slug: string, photosCollection: { items: { url: string, title: string }[] } }, index: number) => (
              <div className="p-3" key={index}>
                <Link href={`photos/${elem.slug}`}>
                <img className="cursor-pointer" src={elem?.photosCollection?.items[0]?.url} alt={elem?.photosCollection?.items[0]?.title} />
                <h2 className="text-black text-center tracking-[2px] uppercase lg:text-2xl mt-[10px]">{elem?.title}</h2>
                </Link>
              </div>
          )
        )}
        </div>
      </div>
    </>
    
  );
}
