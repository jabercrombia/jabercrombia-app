import Link from "next/link";
import { getPostCollectionEntry } from "@/lib/api";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import Markdown from "react-markdown";
import styles from "@/components/styles/aboutme.module.scss";
import { Metadata } from "next";
import { truncateRichText } from "@/lib/truncateRichText";

interface Props {
  params: Promise<{ slug: string }>;
}

interface Post {
  title: string;
  body: string;
  excerpt: string;
  date: string;
  updatedAt: string;
  slug: string;
  sys: { id: string };
  tags?: string[];
  content?: { json: Document };
  coverImage: { url: string };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;
  const data = await getPostCollectionEntry(slug);
  const post = data?.postCollection?.items?.[0] as Post | undefined;

  const excerpt = post?.content?.json
    ? truncateRichText(post.content.json, 100)
    : "Blog post from jabercrombia";

  return {
    title: post ? `${post.title} | jabercrombia` : "Blog | jabercrombia",
    description: excerpt,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`,
    },
    openGraph: {
      title: post?.title,
      description: excerpt,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post?.slug}`,
      images: post?.coverImage?.url ? [{ url: post.coverImage.url }] : [],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPostCollectionEntry(slug);
  const posts = (data?.postCollection?.items ?? []) as Post[];

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">
        {posts.length === 0 && (
          <p className="text-[#7a8099] py-20">No post found for "{slug}".</p>
        )}

        {posts.map((post) => {
          const schemaData = {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.updatedAt || post.date,
            author: { "@type": "Person", name: "Justin Abercrombia" },
            publisher: {
              "@type": "Organization",
              name: "jabercrombia",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/favicon.png`,
              },
            },
            image: post.coverImage?.url,
            description: post.excerpt,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
            },
          };

          return (
            <article key={post.sys.id} className="max-w-2xl py-12">
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
              />

              {/* Back link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[#4a5068] hover:text-[#4f8ef7] transition-colors mb-8"
              >
                ← Blog
              </Link>

              {/* Meta */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[11px] text-[#4a5068] tracking-[0.04em]">
                  {formatUTCToMonthDayYear(post.date)}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] tracking-[0.1em] uppercase text-[#4f8ef7] border border-[rgba(79,142,247,0.3)] px-2 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-[#e8eaf0] font-bold leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {post.title}
              </h1>

              {/* Divider */}
              <div className="border-t border-[rgba(255,255,255,0.07)] mb-8" />

              {/* Body */}
              <div className="prose prose-invert prose-sm max-w-none text-[#7a8099] leading-[1.8] [&_h2]:text-[#e8eaf0] [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_a]:text-[#4f8ef7] [&_a]:no-underline [&_a:hover]:underline [&_hr]:border-[rgba(255,255,255,0.07)] [&_hr]:my-6">
                {post.body
                  ? <Markdown>{post.body}</Markdown>
                  : post?.content?.json && documentToReactComponents(post.content.json)
                }
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
