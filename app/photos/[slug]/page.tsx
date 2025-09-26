
import { getPhotoCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/links/photos/imagemodal";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlatformPage({ params }: PageProps) {

const { slug } = await params;

let dataGraphQL = await getPhotoCollectionEntry(slug);
dataGraphQL = dataGraphQL.photosCollection.items[0];

var photoSchema = {
  "@context": "https://schema.org/",
  "@type": "ImageGallery",
  name: dataGraphQL.title,
  description: dataGraphQL.description,
  url: `https://jabercrombia.com/photos/${dataGraphQL.slug}`,
  mainEntity: dataGraphQL?.photosCollection.items.map((photo: { title: string; url: string; thumbnail: string }) => ({
    "@type": "ImageObject",
    contentUrl: photo.url,
    thumbnailUrl: photo.thumbnail,
    name: photo.title,
    creditText: "Justin Abercrombia",
    creator: {
      "@type": "Person",
      name: "Justin Abercrombia",
    },
  })),
};

  return (
    <div className="container mx-auto text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photoSchema) }}
      />
       <h1 className="uppercase mt-[20px] text-xl">{dataGraphQL.title}</h1>
       <p className="">{dataGraphQL.description}</p>
      <div className="flex flex-wrap justify-center">
        {dataGraphQL?.photosCollection.items.map(
          (elem: { title: string; url: string; thumbnail: string }, index: number) => (
            <div className="w-full lg:w-1/4 m-6 border-2 border-solid" key={index}>
              <ImageModal imageData={elem} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
