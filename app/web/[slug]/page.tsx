import Link from "next/link";
import { getWebCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/links/photos/imagemodal";
import ReactMarkdown from 'react-markdown';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function PlatformPage({ params }: PageProps) {

const { slug } = await params;
let dataGraphQL = await getWebCollectionEntry(slug);
const webCollection = dataGraphQL?.webCollection?.items[0];

  return (
    <div className="container mx-auto">
      
      <div className="flex flex-wrap justify-center">
      {webCollection?.imageGalleryCollection?.items.map(
        (elem: { title: string; body: string; slug: string; url: string; thumbnail: string }, index: number) => (
          <div className="w-1/4 m-6 border-2 border-solid" key={index}>
            <ImageModal imageData={elem}/>
          </div>
        )
      )}
      </div>
      <div className="flex">
        <div className="w-3/3">
          <h1 className="uppercase text-2xl">{webCollection?.title}</h1>
          <ReactMarkdown>{webCollection?.body}</ReactMarkdown>
          <p className="pt-4">[<Link href={webCollection.link} className="text-blue-500">Visit</Link>]</p>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
