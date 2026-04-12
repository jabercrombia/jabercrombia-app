import { getDesignCollectionEntry } from "@/lib/api";
import styles from "../../../components/styles/aboutme.module.scss";
import ImageModal from "../../../components/links/photos/imagemodal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type GalleryItem = { title: string; url: string; thumbnail: string };

export default async function DesignEntryPage({ params }: PageProps) {
  const { slug } = await params;

  let dataGraphQL = await getDesignCollectionEntry(slug);
  dataGraphQL = dataGraphQL?.designCollection.items[0];

  const gallery: GalleryItem[] = dataGraphQL?.designGalleryCollection?.items ?? [];

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Design</div>
          <h1 style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", color: "hsl(var(--foreground))", marginBottom: "1rem" }}>
            {dataGraphQL?.title}
          </h1>
          {dataGraphQL?.body && (
            <p className={styles.heroSub}>{dataGraphQL.body}</p>
          )}
        </section>

        {/* GALLERY */}
        <div className={styles.sectionLabel}>Gallery</div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 mb-16">
          {gallery.map((elem, index) => (
            <div key={index} className="break-inside-avoid mb-4 group cursor-pointer overflow-hidden bg-muted border border-[var(--border-subtle)]">
              <ImageModal imageData={elem} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
