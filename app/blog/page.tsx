import Link from "next/link";
import PageHeader from "../../components/pageheader";
import BlogEntries from "../../components/blog/BlogEntries";
import { getPostCollectionEntries } from "@/lib/api";
import styles from "../../components/styles/blog/blog.module.scss";

export const metadata = {
  title: "jabercrombia | Blog",
};

export default async function BlogPage() {
  let posts = await getPostCollectionEntries();
  posts = posts?.postCollection?.items;

  return (
    <>
      <PageHeader pageID="blog" />
      <div className={`${styles.blog} container mx-auto`}>
        {posts?.map(
          (
            elem: { title: string; slug: string; tags: string[] },
            index: number
          ) => (
            <BlogEntries post={elem} key={index} />
          )
        )}
      </div>
    </>
  );
}
