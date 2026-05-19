import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  tags,
  excerpt
`;

export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  tags?: string[];
  excerpt: string;
  body?: string;
}

export async function getAllPosts(): Promise<SanityPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`,
    {},
    { next: { tags: ["posts"] } }
  );
}

export async function getPostBySlug(slug: string): Promise<SanityPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] { ${POST_FIELDS}, body }`,
    { slug },
    { next: { tags: ["posts"] } }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  return sanityClient.fetch(
    `*[_type == "post"] { "slug": slug.current }`,
    {},
    { next: { tags: ["posts"] } }
  );
}

export interface SanityExperience {
  _id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  jobDescription?: string;
  logo?: { url: string; title: string };
}

export async function getAllExperience(): Promise<SanityExperience[]> {
  return sanityClient.fetch(
    `*[_type == "experience"] | order(startDate desc) {
      _id,
      company,
      jobTitle,
      startDate,
      endDate,
      summary,
      jobDescription,
      "logo": {
        "url": logo.asset->url,
        "title": company
      }
    }`,
    {},
    { next: { tags: ["experience"] } }
  );
}
