import PageHeader from "../../components/pageheader";
import BlogEntries from "../../components/blog/BlogEntries";
import { getPostCollectionEntries } from "@/lib/api";
import styles from "../../components/styles/blog/blog.module.scss";

interface Post {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  coverImage: {
    url: string;
    width: number;
    height: number;
    title: string;
  };
}

export const metadata = {
  title: "jabercrombia | Blog",
};

export default async function BlogPage() {
  const data = await getPostCollectionEntries();
  const posts: Post[] = data?.postCollection?.items ?? [];

  return (
    <>
      <PageHeader pageID="blog" />
      <div className={`${styles.blog} container mx-auto`}>
        {posts.map((post, index) => (
          <BlogEntries post={post} key={index} />
        ))}
      </div>
    </>
  );
}
