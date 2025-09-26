import Link from "next/link";
import { getPostCollectionEntry } from "@/lib/api";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, Block, Inline } from "@contentful/rich-text-types";
import Markdown from "react-markdown";
import styles from "@/components/styles/blog/blogentry.module.scss";
import { Metadata } from "next";
import { truncateRichText } from '@/lib/truncateRichText';


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

  // make an excerpt from the content field
  const excerpt = truncateRichText(post?.content?.json);

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
    <div className={`w-1/2 mx-auto py-10 ${styles.entry}`}>
      {posts.length === 0 && <p>No post found for “{slug}”.</p>}

      {posts.map((post) => {
        const schemaData = {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          dateModified: post.updatedAt || post.date,
          author: {
            "@type": "Person",
            name: "Justin Abercrombia",
          },
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
          <article key={post.sys.id} className={`${styles.blogentry} mx-auto`}>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {formatUTCToMonthDayYear(post.date)}
            </p>
            {post.body ? (<div className="mb-6"><Markdown>{post.body}</Markdown></div>) : (<div className="prose prose-lg max-w-none mb-6">
              {documentToReactComponents(post.content?.json)}
            </div>)}
            

   

            {post.tags && (
              <ul className="flex flex-wrap gap-2 mt-4 ml-0">
                {post.tags.map((tag) => (
                  <li key={tag} className="px-2 py-1 bg-gray-200 rounded list-none">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <Link
              href="/blog"
              className="mt-6 inline-block hover:underline" title="back to all blog posts"
            >
              ← Back to all posts
            </Link>
          </article>
        );
      })}
    </div>
  );
}
