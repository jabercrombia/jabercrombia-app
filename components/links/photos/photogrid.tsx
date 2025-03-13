"use client"

import Link from "next/link";

import { event } from "../../../lib/gtag";

interface PhotoLinkProps {
  elem: { title: string; slug: string; photosCollection: { items: { url: string; title: string }[] } };
}

const PhotoLink: React.FC<PhotoLinkProps> = ({ elem }) => {

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
      <Link onClick={handleClick} href={`photos/${elem.slug}`}>
        <img className="cursor-pointer" src={elem?.photosCollection?.items[0]?.url} alt={elem?.photosCollection?.items[0]?.title} />
        <h2 className="text-black text-center tracking-[2px] uppercase lg:text-2xl mt-[10px]">{elem?.title}</h2>
      </Link>
    );
}

export default PhotoLink;