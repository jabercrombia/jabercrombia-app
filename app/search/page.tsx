import Link from "next/link";
import styles from "../../components/styles/aboutme.module.scss";
import { fetchContentful } from "@/lib/contentful";
import { SEARCH_CONTENT_QUERY } from "@/lib/queries";

interface SearchResult {
  sys: { id: string };
  title: string;
  description: string;
  slug: string;
  type: string;
  url: string;
  images: { items: { url: string }[] };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  let results: SearchResult[] = [];

  if (query.length > 0) {
    const data = await fetchContentful(SEARCH_CONTENT_QUERY, { keyword: query });

    const designData = (data?.design?.items ?? []).map((item: any) => ({
      ...item, type: "design", url: `/design/${item.slug}`,
    }));
    const projectData = (data?.projects?.items ?? []).map((item: any) => ({
      ...item, type: "projects", url: `/projects?slug=${item.slug}`,
    }));
    const webData = (data?.web?.items ?? []).map((item: any) => ({
      ...item, type: "web", url: `/web/${item.slug}`,
    }));

    results = [...webData, ...designData, ...projectData];
  }

  const typeLabel: Record<string, string> = {
    design: "Design",
    projects: "Portfolio",
    web: "Web",
  };

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Search</div>
          <h1>
            {query ? (
              <>
                Results for<br />
                <span className={styles.hi}>&ldquo;{query}&rdquo;</span>
              </>
            ) : (
              <>Search<br /><span className={styles.dim}>the site</span></>
            )}
          </h1>
          {results.length > 0 && (
            <p className={styles.heroSub}>
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </p>
          )}
        </section>

        {/* RESULTS */}
        <div className={styles.sectionLabel}>
          {results.length > 0 ? "Results" : "No results"}
        </div>

        {results.length === 0 && query.length > 0 && (
          <p className="text-[#4a5068] text-sm py-8">
            No results found for &ldquo;{query}&rdquo;. Try a different search term.
          </p>
        )}

        <div className="flex flex-col mb-16">
          {results.map((item, index) => (
            <Link
              key={item.sys?.id ?? index}
              href={item.url}
              className={`group flex gap-6 items-start py-7 ${index === 0 ? "" : "border-t border-[rgba(255,255,255,0.07)]"} hover:opacity-80 transition-opacity`}
            >
              {/* Thumbnail */}
              {item.images?.items?.[0]?.url && (
                <div className="shrink-0 w-20 h-16 overflow-hidden bg-[#0e1219] border border-[rgba(255,255,255,0.07)]">
                  <img
                    src={item.images.items[0].url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-[#4f8ef7]">
                    {typeLabel[item.type] ?? item.type}
                  </span>
                </div>
                <h2
                  className="text-[#e8eaf0] text-base font-semibold mb-1 group-hover:text-[#4f8ef7] transition-colors"
                  style={{ fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {item.title}
                </h2>
                <p className="text-[13px] text-[var(--primary-color)] leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
