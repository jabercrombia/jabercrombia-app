import { getAllPosts } from "@/lib/sanity";
import BlogEntries from "../../components/blog/BlogEntries";
import styles from "../../components/styles/aboutme.module.scss";
import Link from "next/link";

export const metadata = {
  title: "jabercrombia | Blog",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const allPosts = await getAllPosts();
  const posts = tag
    ? allPosts.filter((p) =>
        p.tags?.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
      )
    : allPosts;

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

        {/* ACTIVE TAG FILTER */}
        {tag && (
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[11px] tracking-[0.1em] uppercase text-[var(--text3)]">
              Filtered by
            </span>
            <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] border border-[rgba(79,142,247,0.3)] px-2 py-0.5 rounded-full">
              {tag}
            </span>
            <Link
              href="/blog"
              className="text-[10px] tracking-[0.1em] uppercase text-[var(--text3)] hover:text-[var(--text)] transition-colors"
            >
              Clear ×
            </Link>
          </div>
        )}

        {/* POSTS */}
        <div className={styles.sectionLabel}>Posts</div>
        {posts.length === 0 && (
          <p className="text-[var(--text3)] text-sm py-8">No posts found for &ldquo;{tag}&rdquo;.</p>
        )}
        {posts.map((post, index) => (
          <BlogEntries post={post} key={post._id} first={index === 0} />
        ))}

      </div>
    </div>
  );
}
