import Link from "next/link";
import { Metadata } from "next";
import { headers } from "next/headers";
import { getMediumArticles, MEDIUM_PROFILE_URL } from "@/lib/medium";
import ArticleCard from "../../components/writing/articleCard";
import SectionLabel from "../../components/aboutme/sectionLabel";
import { MediumIcon } from "../../components/socialIcons";
import { writingTranslations, metadataTranslations, generateHreflang, generateCanonical, type Locale } from "@/lib/translations";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const m = metadataTranslations[locale].writing;
  const canonical = generateCanonical('/writing', locale);
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical,
      languages: generateHreflang('/writing'),
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function WritingPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const t = writingTranslations[locale];

  const articles = await getMediumArticles();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: metadataTranslations[locale].writing.title,
    url: generateCanonical('/writing', locale),
    author: { "@type": "Person", name: "Justin Abercrombia", url: process.env.SITE_URL },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: article.url,
      datePublished: article.date,
      image: article.image ?? undefined,
      keywords: article.tags.join(", "),
      author: { "@type": "Person", name: "Justin Abercrombia" },
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[15px] font-light leading-[1.7] text-[var(--text-bright)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className="pt-4">
          <div className="mb-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] before:block before:h-px before:w-6 before:bg-[var(--accent)]">
            {t.eyebrow}
          </div>
          <h1 className="mb-6 font-[family-name:var(--font-syne)] text-[clamp(2.8rem,6.5vw,5rem)] font-medium leading-none tracking-[-0.02em]">
            {t.heading}
            <br />
            <span className="text-[var(--text-dim)]">{t.headingSub}</span>
          </h1>
          <p className="mb-8 max-w-[520px] leading-[1.8] text-[var(--text3)]">{t.subtitle}</p>
          <Link
            href={MEDIUM_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            title={t.followOn}
            className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-[var(--primary-color)] transition-colors hover:text-[var(--accent)]"
          >
            <MediumIcon />
            {t.followOn}
          </Link>
        </section>

        {/* ARTICLES */}
        <section aria-labelledby="articles-heading" className="pb-20">
          <SectionLabel id="articles-heading">{t.sectionLabel}</SectionLabel>
          {articles.length > 0 ? (
            <div className="flex flex-col gap-5">
              {articles.map((article, index) => (
                <ArticleCard key={article.id} article={article} readLabel={t.readOn} layout="row" priority={index === 0} />
              ))}
            </div>
          ) : (
            <p className="text-[var(--text3)]">
              {t.empty}{" "}
              <Link href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--accent)]">
                {t.readOn}
              </Link>
            </p>
          )}
        </section>

      </div>
    </div>
  );
}
