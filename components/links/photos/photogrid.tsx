"use client";

import Link from "next/link";
import Image from "next/image";

interface PhotoLinkProps {
  elem: { title: string; slug: string; photosCollection: { items: { url: string; title: string }[] } };
  priority?: boolean;
}

const PhotoLink: React.FC<PhotoLinkProps> = ({ elem, priority = false }) => {
  const handleClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "photo_click", {
        event_category: "User Interaction",
        event_label: elem?.title,
        value: 1,
      });
    }
  };

  return (
    <Link
      onClick={handleClick}
      href={`photos/${elem.slug}`}
      className="group block bg-[#0e1219] border border-[rgba(255,255,255,0.07)] overflow-hidden hover:border-[rgba(79,142,247,0.3)] transition-colors"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          src={elem?.photosCollection?.items[0]?.url}
          alt={elem?.photosCollection?.items[0]?.title}
          priority={priority}
        />
        <div className="absolute inset-0 bg-[#080b10] opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
      </div>
      <div className="px-4 py-3 border-t border-[rgba(255,255,255,0.07)]">
        <h2
          className="text-[#e8eaf0] text-sm font-semibold tracking-[0.03em]"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {elem?.title}
        </h2>
        <p className="text-[10px] tracking-[0.1em] uppercase text-[#4a5068] mt-1">View series ↗</p>
      </div>
    </Link>
  );
};

export default PhotoLink;
