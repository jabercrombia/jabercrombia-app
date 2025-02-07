import Link from "next/link";
import PageHeader from "../../components/pageheader";

import { getDesignCollection } from "@/lib/api";


export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  let design = await getDesignCollection();
  design = design?.designCollection?.items;

  return (
    <>
      <PageHeader pageID="design"/>
      <div className="flex flex-wrap justify-center container mx-auto mt-10">
        {design?.map(
          (elem: { title: string; slug: string, designGalleryCollection: { items: { url: string, title: string }[] } }, index: number) => (
              <div className={`w-1/3 p-10`} key={index}>
                <Link href={`design/${elem.slug}`}>
                <img src={elem?.designGalleryCollection?.items[0]?.url} alt={elem?.designGalleryCollection?.items[0]?.title} />
                <h2 className="text-black text-center tracking-[2px] uppercase text-2xl mt-[10px]">{elem?.title}</h2>
                </Link>
              </div>
          )
        )}
      </div>
    </>

  );
}
