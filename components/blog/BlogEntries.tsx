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
};


export const metadata = {
  title: 'i',
  description: '',
  alternates: {
    canonical: '',
  }
};

export default function BlogContent({
  post,
}: {
  post: Post;
}) {
  return (
    <div className="pb-5">
      <div className="p-2 flex">
        <div className="w-1/6">{formatUTCToMonthDayYear(post.date)}</div>
        <div>
          <h2 className="text-2xl font-bold mb-1"><Link href={`blog/${post.slug}`} title={post.title} className="text-black">{post.title}</Link></h2>
          <p className="pb-4">{truncateText(post.excerpt, 60)}</p>
          <Link href={`blog/${post.slug}`} title={post.title}>Read More</Link>
        </div>
      </div>
    </div>
  );
}
