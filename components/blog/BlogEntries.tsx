"use client";
import { formatUTCToMonthDayYear } from "@jabercrombia/date-utility";
import { truncateText } from "../../lib/truncatetext";
import Link from "next/link";

type Post = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  coverImage: { url: string; height: number; title: string; width: number };
  tags?: string[];
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
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
          <p>{truncateText(post.excerpt, 60)}</p>
          <Link href={`blog/${post.slug}`}>Read More</Link>
        </div>
      </div>
    </div>
  );
}
