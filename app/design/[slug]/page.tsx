import { getDesignCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/links/photos/imagemodal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlatformPage({ params }: PageProps) {

const { slug } = await params;

let dataGraphQL = await getDesignCollectionEntry(slug);
dataGraphQL = dataGraphQL?.designCollection.items[0];

  return (

    <div className="container mx-auto px-[15px] grid grid-cols-1 ">
        <div>
          <h1 className="uppercase mt-[20px] text-xl">{dataGraphQL?.title}</h1>
          <p className="text-xl">{dataGraphQL?.body}</p>
        </div>
        <div>
          <div className="grid grid-cols-1 justify-items-center">
            {dataGraphQL?.designGalleryCollection.items.map(
              (elem: { title: string; url: string; thumbnail: string }, index: number) => (
                <div className="p-4" key={index}>
                  <ImageModal imageData={elem}/>
                </div>
              )
            )}
          </div>        
        </div>


    </div>
  );
}
