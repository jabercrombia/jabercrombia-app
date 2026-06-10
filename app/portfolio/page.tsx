import Filter from "../../components/ui/filterNav";
import FilterDisplay from "../../components/ui/filterDisplay";
import { Suspense } from "react";
import { getProjectCollection } from "@/lib/api";
import { Metadata } from "next";
import styles from "../../components/styles/aboutme.module.scss";
import { headers } from "next/headers";
import { portfolioTranslations, metadataTranslations, generateHreflang, generateCanonical, type Locale } from "@/lib/translations";

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const m = metadataTranslations[locale].portfolio;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: generateCanonical('/portfolio', locale),
      languages: generateHreflang('/portfolio'),
    },
  };
}

export default async function PortfolioPage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const t = portfolioTranslations[locale];

  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>{t.eyebrow}</div>
          <h1>
            {t.heading}<br />
            <span className={styles.dim}>{t.headingSub}</span>
          </h1>
          <p className={styles.heroSub}>{t.subtitle}</p>
        </section>

        {/* CONTENT */}
        <div className={styles.sectionLabel}>{t.sectionLabel}</div>
        <div className="md:flex gap-12 pb-20">
          {/* Sticky filter sidebar */}
          <aside className="md:w-48 shrink-0">
            <div className="md:sticky md:top-24">
              <Suspense>
                <Filter data={projects} />
              </Suspense>
            </div>
          </aside>

          {/* Project grid */}
          <div className="flex-1 min-w-0">
            <Suspense>
              <FilterDisplay data={projects} />
            </Suspense>
          </div>
        </div>

      </div>
    </div>
  );
}
