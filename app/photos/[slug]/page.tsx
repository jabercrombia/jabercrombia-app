
import { getPhotoCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/imagemodal";
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
const slug = await params?.slug;
let dataGraphQL = await getPhotoCollectionEntry(slug);
dataGraphQL = dataGraphQL.photosCollection.items[0];

  return (
    <div className="container mx-auto text-center">
       <h1 className="uppercase mt-[20px]">{dataGraphQL.title}</h1>
       <p className="text-2xl">{dataGraphQL.description}</p>
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
