import Link from "next/link";
import { draftMode } from "next/headers";

import MoreStories from "../../more-stories";
import Avatar from "../../avatar";
import Date from "../../date";
import CoverImage from "../../cover-image";

import { Markdown } from "@/lib/markdown";
import { getWebCollection } from "@/lib/api";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  const allPosts = await getWebCollection();

  const posts = allPosts.webCollection.items;

  return (
    <div className="grid grid-cols-2 container mx-auto">
      {posts.map(
        (elem: { title: string; body: string; heroImage: { url: string }; slug: string }, index: number) => (
          <Link href={elem.slug} key={index}>
            <div className="p-6 mb-3 hover:brightness-50 hover:text-black-100 text-cloudGray">
                <img src={elem.heroImage.url} alt={elem.title}/>
                <h3 className="uppercase text-xl mt-2">{elem.title}</h3>
            </div>
          </Link>
        )
      )}
    </div>
  );
}
