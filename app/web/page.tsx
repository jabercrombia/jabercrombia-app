import Link from "next/link";

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
          <Link href={{
            pathname: '/web/' + elem.slug,
          }} key={index}>
            <div className="p-6 mb-3 hover:brightness-50 hover:text-black-100 text-cloudGray">
                <img src={elem.heroImage.url} alt={elem.title}/>
                <h3 className="uppercase text-xl mt-2">{elem.title}</h3>
            </div>
          </Link>
        )
      )}
    </div>
    </>
  );
}
