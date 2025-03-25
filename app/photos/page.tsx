import PageHeader from "../../components/pageheader";
import Head from "next/head";
import { getPhotosCollection } from "@/lib/api";
import PhotoLink from "../../components/links/photos/photogrid";

export default async function PostPage() {

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
                <PhotoLink elem={elem} />
              </div>
          )
        )}
        </div>
      </div>
    </>
    
  );
}
