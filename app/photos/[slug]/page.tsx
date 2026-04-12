import { getPhotoCollectionEntry } from "@/lib/api";
import ImageModal from "../../../components/links/photos/imagemodal";
import styles from "../../../components/styles/aboutme.module.scss";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

type GalleryItem = { title: string; url: string; thumbnail: string };

export default async function PhotoEntryPage({ params }: PageProps) {
  const { slug } = await params;

  let dataGraphQL = await getPhotoCollectionEntry(slug);
  dataGraphQL = dataGraphQL.photosCollection.items[0];

  const photoSchema = {
    "@context": "https://schema.org/",
    "@type": "ImageGallery",
    name: dataGraphQL.title,
    description: dataGraphQL.description,
    url: `https://jabercrombia.com/photos/${dataGraphQL.slug}`,
    mainEntity: dataGraphQL?.photosCollection.items.map((photo: GalleryItem) => ({
      "@type": "ImageObject",
      contentUrl: photo.url,
      thumbnailUrl: photo.thumbnail,
      name: photo.title,
      creditText: "Justin Abercrombia",
      creator: { "@type": "Person", name: "Justin Abercrombia" },
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photoSchema) }}
      />
      <div className="container mx-auto px-6">

        {/* HEADER */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Photography</div>
          <h1
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              lineHeight: 1.1,
              textTransform: "capitalize",
              letterSpacing: "-0.02em",
              color: "hsl(var(--foreground))",
              marginBottom: "1rem",
            }}
          >
            {dataGraphQL.title}
          </h1>
          {dataGraphQL.description && (
            <p className={styles.heroSub}>{dataGraphQL.description}</p>
          )}
          <Link
            href="/photos"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-muted-foreground hover:text-[var(--accent-color)] transition-colors mt-2"
          >
            ← All photos
          </Link>
        </section>

        {/* GALLERY */}
        <div className={styles.sectionLabel}>Gallery</div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 mb-16">
          {dataGraphQL?.photosCollection.items.map((elem: GalleryItem, index: number) => (
            <div
              key={index}
              className="break-inside-avoid mb-4 overflow-hidden bg-muted border border-[var(--border-subtle)]"
            >
              <ImageModal imageData={elem} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
