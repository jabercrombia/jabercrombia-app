
import { getPhotoCollectionEntry } from "@/lib/api";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

let dataGraphQL = await getPhotoCollectionEntry(params?.slug);
dataGraphQL = dataGraphQL.photosCollection.items[0];
console.log(dataGraphQL);

  return (
    <div className="container mx-auto text-center">
       <h1 className="uppercase mt-[20px]">{dataGraphQL.title}</h1>
       <p className="text-2xl">{dataGraphQL.description}</p>
      <div className="flex flex-wrap justify-center">
        {dataGraphQL?.photosCollection.items.map(
          (elem: { title: string; url: string }, index: number) => (
            <div className="w-full lg:w-1/4 m-6 border-2 border-solid" key={index}>
              <img src={elem.url} alt={elem.title}/>
            </div>
          )
        )}
      </div>
     

    </div>
  );
}
