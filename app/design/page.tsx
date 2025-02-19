import Link from "next/link";
import PageHeader from "../../components/pageheader";

import { getDesignCollection } from "@/lib/api";

export const metadata = {
  title: 'jabercrombia | Design',
}
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
      <div className="grid md:grid-cols-3 sm:grid-cols-1 justify-center container mx-auto mt-10">
        {design?.map(
          (elem: { title: string; slug: string, designGalleryCollection: { items: { thumbnail: string; url: string, title: string }[] } }, index: number) => (
              <div className="p-10" key={index}>
                <Link href={`design/${elem.slug}`}>
                <img src={elem?.designGalleryCollection?.items[0]?.thumbnail} alt={elem?.designGalleryCollection?.items[0]?.title} />
                <h2 className="text-black text-center tracking-[2px] uppercase text-2xl mt-[10px]">{elem?.title}</h2>
                </Link>
              </div>
          )
        )}
      </div>
    </>

  );
}
