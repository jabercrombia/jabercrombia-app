"use client"

import Link from "next/link";

import { event } from "../lib/gtag";

interface WebLinkProps {
  elem: { title: string; body: string; heroImage: { url: string }; slug: string };
  index: number;
}

const WebLink: React.FC<WebLinkProps> = ({ elem, index }) => {

  const handleClick = () => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "button_click", {
          event_category: "User Interaction",
          event_label: "Web",
          value: 1,
        });
      }
    }; 

    return (
      <Link onClick={handleClick} href={{ pathname: '/web/' + elem.slug,}} key={index}>
        <div className="p-6 mb-3 hover:brightness-50 hover:text-black-100 text-cloudGray">
            <img className="cursor-pointer" src={elem.heroImage.url} alt={elem.title}/>
            <h3 className="uppercase text-xl mt-2">{elem.title}</h3>
        </div>
      </Link>
    );
}

export default WebLink;