"use client";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import { truncateText } from "../../lib/truncatetext";
import Link from "next/link";

type Post = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  coverImage?: { url: string; height: number; title: string; width: number };
  tags?: string[];
  sys?: { id: string; firstPublishedAt: string };
};

export default function BlogEntries({
  post,
  first = false,
}: {
  post: Post;
  first?: boolean;
}) {
  return (
    <div
      className={`grid py-8 gap-8 ${first ? "" : "border-t border-[var(--border-subtle)]"}`}
      style={{ gridTemplateColumns: "150px 1fr" }}
    >
      {/* Left col — date + tags */}
      <div>
        <div className="text-[11px] text-muted-foreground tracking-[0.04em] leading-relaxed mb-2">
          {formatUTCToMonthDayYear(post.date || post.sys?.firstPublishedAt || "")}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-col gap-1">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-[10px] tracking-[0.1em] uppercase text-[var(--accent-color)] hover:opacity-70 transition-opacity"
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Right col — content */}
      <div>
        <h2
          className="text-foreground text-lg font-semibold mb-2 leading-snug hover:text-[var(--accent-color)] transition-colors"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          <Link href={`blog/${post.slug}`} title={post.title}>
            {post.title}
          </Link>
        </h2>
        <p className="text-[13.5px] text-[var(--primary-color)] leading-[1.75] mb-4">
          {post.excerpt}
        </p>
        <Link
          href={`blog/${post.slug}`}
          title={post.title}
          className="text-[11px] tracking-[0.1em] uppercase text-[var(--accent-color)] hover:opacity-70 transition-opacity"
        >
          Read more ↗
        </Link>
      </div>
    </div>
  );
}
