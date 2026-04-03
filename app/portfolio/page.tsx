import Filter from "../../components/ui/filterNav";
import FilterDisplay from "../../components/ui/filterDisplay";
import { Suspense } from "react";
import { getProjectCollection } from "@/lib/api";
import { getPageHeaderMetadata } from "@/components/pageheader";
import { Metadata } from "next";
import styles from "../../components/styles/aboutme.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  return await getPageHeaderMetadata("portfolio");
}

export default async function PortfolioPage() {
  let projects = await getProjectCollection();
  projects = projects?.projectsCollection?.items;

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Work</div>
          <h1>
            Portfolio<br />
            <span className={styles.dim}>Projects</span>
          </h1>
          <p className={styles.heroSub}>
            A selection of web applications, eCommerce builds, and open-source projects.
          </p>
        </section>

        {/* CONTENT */}
        <div className={styles.sectionLabel}>Projects</div>
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
