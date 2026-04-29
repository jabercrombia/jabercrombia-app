import Link from "next/link";
import Image from "next/image";
import { getDesignCollection } from "@/lib/api";
import { getPageHeaderMetadata } from "@/components/pageheader";
import { Metadata } from "next";
import styles from "../../components/styles/aboutme.module.scss";
import { cacheLife } from 'next/cache'

export async function generateMetadata(): Promise<Metadata> {
  return await getPageHeaderMetadata("design");
}

type DesignItem = {
  title: string;
  slug: string;
  designGalleryCollection: {
    items: { thumbnail: string; url: string; title: string }[];
  };
};

export default async function DesignPage() {
  'use cache'
  cacheLife('days')


  let design = await getDesignCollection();
  design = design?.designCollection?.items as DesignItem[];

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Creative work</div>
          <h1>
            Design<br />
            <span className={styles.dim}>Portfolio</span>
          </h1>
          <p className={styles.heroSub}>
            Visual design, brand systems, and UI work across web and print.
          </p>
        </section>

        {/* GRID */}
        <div className={styles.sectionLabel}>Projects</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {design?.map((elem: DesignItem, index: number) => (
            <Link
              href={`design/${elem.slug}`}
              key={index}
              className="group block bg-[#0e1219] overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={elem?.designGalleryCollection?.items[0]?.thumbnail}
                  alt={elem?.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-[#080b10] opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
              </div>
              <div className="p-6 border-t border-[rgba(255,255,255,0.07)]">
                <h2
                  className="text-[#e8eaf0] text-base font-semibold tracking-tight"
                  style={{ fontFamily: "var(--font-inter), sans-serif" }}
                >
                  {elem?.title}
                </h2>
                <p className="text-[11px] tracking-[0.1em] uppercase text-[#4a5068] mt-1">
                  View project ↗
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
