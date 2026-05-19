import Link from "next/link";
import { getPostBySlug, getAllPostSlugs } from "@/lib/sanity";
import Markdown from "react-markdown";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import styles from "@/components/styles/aboutme.module.scss";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);
  const description = post?.excerpt ?? "Blog post from jabercrombia";

  return {
    title: post ? `${post.title} | jabercrombia` : "Blog | jabercrombia",
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`,
    },
    openGraph: {
      title: post?.title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className={styles.page}>
        <div className="container mx-auto px-6">
          <p className="text-[var(--primary-color)] py-20">No post found for &ldquo;{slug}&rdquo;.</p>
        </div>
      </div>
    );
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Justin Abercrombia",
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "jabercrombia",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
  };

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">
        <article className="max-w-2xl py-12">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          />

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[var(--text3)] hover:text-[var(--accent)] transition-colors mb-8"
          >
            ← Blog
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] text-[var(--text3)] tracking-[0.04em]">
              {formatUTCToMonthDayYear(post.publishedAt)}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => {
                  const normalized = tag.toLowerCase().replace(/\s+/g, "-");
                  return (
                    <Link
                      key={tag}
                      href={`/blog?tag=${normalized}`}
                      className="text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] border border-[rgba(79,142,247,0.3)] px-2 py-0.5 rounded-full hover:opacity-70 transition-opacity"
                    >
                      {normalized}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Title */}
          <h1
            className="text-[var(--text)] font-bold leading-tight mb-4"
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {post.title}
          </h1>

          {/* Divider */}
          <div className="border-t border-[var(--divider)] mb-8" />

          {/* Body */}
          {post.body && (
            <div className="prose prose-invert prose-sm max-w-none text-[var(--primary-color)] leading-[1.8] [&_p]:text-[var(--text3)] [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-[var(--accent)] [&_a]:no-underline [&_a:hover]:underline [&_hr]:border-[var(--divider)] [&_hr]:my-6 [&_ul]:pl-0 [&_ul]:mt-0 [&_li]:my-0 [&_ul_p]:m-0 [&_ol_li_p]:m-0">
              <Markdown>{post.body}</Markdown>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
