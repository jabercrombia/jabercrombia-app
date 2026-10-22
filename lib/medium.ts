import { truncateText } from "./truncatetext";

export const MEDIUM_PROFILE_URL = "https://medium.com/@jabercrombia";
const MEDIUM_FEED_URL = "https://medium.com/feed/@jabercrombia";

export type MediumArticle = {
  id: string;
  title: string;
  url: string;
  date: string;
  tags: string[];
  image: string | null;
  excerpt: string;
};

function decodeEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function readTag(item: string, tag: string): string {
  const match = item.match(new RegExp(`<${tag}(?:\\s[^>]*)?>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return match ? match[1].trim() : "";
}

function parseItem(item: string): MediumArticle {
  const content = readTag(item, "content:encoded");
  const guid = readTag(item, "guid");

  // Skip Medium's 1x1 tracking pixel; the first real image is the cover.
  const image =
    content.match(/<img[^>]+src="(https:\/\/cdn-images-1\.medium\.com\/[^"]+)"/)?.[1] ?? null;

  const firstParagraph = content.match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? "";
  const text = decodeEntities(firstParagraph.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();

  const tags = Array.from(item.matchAll(/<category><!\[CDATA\[([^\]]+)\]\]><\/category>/g)).map(
    (m) => m[1].replace(/-/g, " ")
  );

  const url = readTag(item, "link").split("?")[0];

  return {
    id: guid.split("/").pop() || url,
    title: decodeEntities(readTag(item, "title")),
    url,
    date: new Date(readTag(item, "pubDate")).toISOString(),
    tags,
    image,
    excerpt: truncateText(text, 180),
  };
}

/**
 * Fetches the latest articles from the Medium RSS feed (Medium caps it at 10).
 * Revalidates hourly; returns an empty list if Medium is unreachable so pages still render.
 */
export async function getMediumArticles(limit?: number): Promise<MediumArticle[]> {
  try {
    const res = await fetch(MEDIUM_FEED_URL, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; jabercrombia.com)" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const articles = xml
      .split("<item>")
      .slice(1)
      .map((item) => parseItem(item.split("</item>")[0]));

    return limit ? articles.slice(0, limit) : articles;
  } catch (error) {
    console.error("Failed to fetch Medium feed", error);
    return [];
  }
}
