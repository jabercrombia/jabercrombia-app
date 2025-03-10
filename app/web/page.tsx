import Link from "next/link";
import { event } from "../../lib/gtag";
import WebLink from "../../components/weblink";

import { getWebCollection } from "@/lib/api";
import PageHeader from "../../components/pageheader";
export const metadata = {
  title: 'jabercrombia | Web',
}
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  

  const allPosts = await getWebCollection();
  const posts = allPosts?.webCollection?.items;

  return (
    
    <>

    <PageHeader pageID="web"/>
    <div className="grid md:grid-cols-2 sm:grid-cols-1 container mx-auto">

      {posts.map(
        (elem: { title: string; body: string; heroImage: { url: string }; slug: string }, index: number) => (
          <WebLink elem={elem} index={index} key={index}/>
        )
      )}
    </div>
    </>
  );
}
