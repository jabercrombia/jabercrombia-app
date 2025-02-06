import Link from "next/link";
import { getWebCollectionEntry } from "@/lib/api";



export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

let dataGraphQL = await getWebCollectionEntry(params?.slug);
const webCollection = dataGraphQL?.webCollection?.items[0];
console.log(webCollection);

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-center">
      {webCollection?.imageGalleryCollection?.items.map(
        (elem: { title: string; body: string; slug: string; url: string }, index: number) => (
          <div className="w-1/4 m-6 border-2 border-solid" key={index}>
            <img src={elem.url} alt={elem.title}/>
          </div>
        )
      )}
      </div>
      <div className="flex">
        <div className="w-3/3">
          <h1 className="uppercase text-2xl">{webCollection?.title}</h1>
          <p>{webCollection?.body}</p>
          

          <h2 className="text-xl my-2">Technologies</h2>
            <ul className="list-none">
              {webCollection?.technologyCollection.items.map(
                (elem: { technologyName: string; }, index: number) => (
                  <li className="inline-block mr-2 text-sm" key={index}>
                    {elem.technologyName}
                  </li>
                )
              )}
            </ul>
          <p className="pt-4">[<Link href={webCollection.link} className="text-blue-500">Visit</Link>]</p>
        </div>
        <div>
         
        </div>
      </div>

    </div>
  );
}
