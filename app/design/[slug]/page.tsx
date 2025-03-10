import { getDesignCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/links/photos/imagemodal";
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

let dataGraphQL = await getDesignCollectionEntry(params?.slug);
dataGraphQL = dataGraphQL?.designCollection.items[0];

  return (

    <div className="container mx-auto px-[15px]">
        <div className="text-center">
          <h1 className="uppercase mt-[20px] text-3xl">{dataGraphQL?.title}</h1>
          <p className="text-2xl">{dataGraphQL?.body}</p>
        </div>
        <div className="grid grid-cols-2 justify-items-center">
          {dataGraphQL?.designGalleryCollection.items.map(
            (elem: { title: string; url: string; thumbnail: string }, index: number) => (
              <div className="p-4" key={index}>
                <ImageModal imageData={elem}/>
              </div>
            )
          )}
        </div>

    </div>
  );
}
