import { getPhotosCollection } from "@/lib/api";
import PhotoLink from "../../components/links/photos/photogrid";
import { getPageHeaderMetadata } from "@/components/pageheader";
import { Metadata } from "next";
import styles from "../../components/styles/aboutme.module.scss";

export async function generateMetadata(): Promise<Metadata> {
  return await getPageHeaderMetadata("photos");
}

type PhotoItem = {
  title: string;
  slug: string;
  photosCollection: { items: { url: string; title: string }[] };
};

export default async function PhotosPage() {
  let photos = await getPhotosCollection();
  photos = photos?.photosCollection?.items as PhotoItem[];

  const photosSchema = photos?.map((photo: PhotoItem) => ({
    "@context": "https://schema.org/",
    "@type": "ImageObject",
    contentUrl: photo.photosCollection.items[0].url,
    name: photo.title,
    url: `https://jabercrombia.com/photos/${photo.slug}`,
    creditText: "Justin Abercrombia",
    creator: { "@type": "Person", name: "Justin Abercrombia" },
  }));

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(photosSchema) }}
      />
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Photography</div>
          <h1>
            Photos<br />
            <span className={styles.dim}>& Series</span>
          </h1>
          <p className={styles.heroSub}>
            A collection of personal photography projects and series.
          </p>
        </section>

        {/* GRID */}
        <div className={styles.sectionLabel}>Series</div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 mb-16">
          {photos?.map((elem: PhotoItem, index: number) => (
            <div className="break-inside-avoid mb-4" key={index}>
              <PhotoLink elem={elem} priority={index < 3} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
