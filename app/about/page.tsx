import Link from "next/link";
import { event } from "../../lib/gtag";
import WebLink from "../../components/weblink";
import ReactMarkdown from "react-markdown";

import { getAboutCollection } from "@/lib/api";
import PageHeader from "../../components/pageheader";
export const metadata = {
  title: 'jabercrombia | About',
}
export default async function PostPage() {

  const allPosts = await getAboutCollection();
  const posts: { body: string }[] = allPosts.blankPageCollection.items;

  return (
    <>
    <div className="grid sm:grid-cols-1 container mx-auto aboutme">

      {posts.map(
        (elem: { body: string, }, index: number) => (
            <div key={index} className="pb-[20px]">
                      <ReactMarkdown>{elem.body}</ReactMarkdown>
            </div>

        )
      )}
    </div>
    </>
  );
}
