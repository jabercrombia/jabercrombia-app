import { getPostCollectionEntries } from "@/lib/api";
import BlogEntries from "../../components/blog/BlogEntries";
import styles from "../../components/styles/aboutme.module.scss";

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
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Writing</div>
          <h1>
            Blog<br />
            <span className={styles.dim}>& Notes</span>
          </h1>
          <p className={styles.heroSub}>
            Thoughts on front-end development, tooling, and the web.
          </p>
        </section>

        {/* POSTS */}
        <div className={styles.sectionLabel}>Posts</div>
        {posts.map((post, index) => (
          <BlogEntries post={post} key={index} first={index === 0} />
        ))}

      </div>
    </div>
  );
}
