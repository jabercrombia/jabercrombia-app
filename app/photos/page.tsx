import Head from "next/head";
import { getPhotosCollection } from "@/lib/api";
import PhotoLink from "../../components/links/photos/photogrid";

import PageHeader, { getPageHeaderMetadata } from "@/components/pageheader";
import { Metadata } from "next";

// Dynamic metadata at the page level
export async function generateMetadata(): Promise<Metadata> {
  return await getPageHeaderMetadata("photos");
}

export default async function PostPage() {

  let photos = await getPhotosCollection();
  photos = photos?.photosCollection?.items;



var photosSchema = photos?.map((photo: { title: string; slug: string, photosCollection: { items: { url: string, title: string }[] } }) => ({
  "@context": "https://schema.org/",
  "@type": "ImageObject",
  contentUrl: photo.photosCollection.items[0].url,
  name: photo.title,
  url: `https://jabercrombia.com/photos/${photo.slug}`,
  creditText: "Justin Abercrombia",
  creator: {
    "@type": "Person",
    name: "Justin Abercrombia",
  },
}));

  

  return (
    <>
    <Head>
        <title>title</title>
        <meta name="description" content="{description}" />
      </Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photosSchema) }}
      />
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
