import { getDesignCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/imagemodal";
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

let dataGraphQL = await getDesignCollectionEntry(params?.slug);
dataGraphQL = dataGraphQL?.designCollection.items[0];

  return (

    <div className="container mx-auto px-[15px]">
      <div className="grid lg:grid-cols-2 grid-cols-1 ">
        <div>
          <h1 className="uppercase mt-[20px]">{dataGraphQL?.title}</h1>
          <p>{dataGraphQL?.body}</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {dataGraphQL?.designGalleryCollection.items.map(
            (elem: { title: string; url: string; thumbnail: string }, index: number) => (
              <div className="w-1/2 p-4" key={index}>
                <ImageModal imageData={elem} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
