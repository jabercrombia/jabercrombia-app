import Link from "next/link";
import { draftMode } from "next/headers";
import { Button } from "@/components/ui/button"
import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
import VisitButton from "../components/visitButton";
import Image from 'next/image';
import { getHomepageSections } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";
import { MoveDown } from "lucide-react";

function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: {
  title: string;
  coverImage: any;
  date: string;
  excerpt: string;
  author: any;
  slug: string;
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
      </div>
    </section>
  );
}

export default async function Page() {
  let homepageSections = await getHomepageSections();
  homepageSections = homepageSections?.pageHeaderCollection?.items;

  return (
    <div>
      <div className="bg-[url(/homepage/sf-banner.jpg)] bg-cover bg-center w-full h-[500px] flex items-center h-screen relative">
          <div className="container mx-auto px-[15px]">
          <h1 className="lg:text-9xl text-[30px] text-center font-thin uppercase text-white opacity-50">Justin Abercrombia</h1>
          <div className="flex items-center justify-center">
            <Button className="font-small" aria-label="Explore My Work" variant="outline">
              <Link href="#work" >Explore My Work</Link>
            </Button>
          </div>
        </div>
        <MoveDown className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-10 text-white animate-bounce" />

      </div>
      <section id="work"></section>

      {homepageSections.map(
        (elem: { title: string; body: string; heroImage: { url: string, title: string } }, index: number) => (
          <div className={`py-20 ${index % 2 == 0 ? `bg-gray-200` : `bg-transparent`}`}  key={index}>
            <div className="container mx-auto">
              <div className="flex flex-wrap px-[15px]">
                <div className={index % 2 !== 0 ? "lg:order-2 lg:basis-1/2 basis-full m-auto lg:text-right" : "lg:order-1 lg:basis-1/2 basis-full m-auto"}>
                  <h2 className="capitalize text-4xl">{elem.title}</h2>
                  <p className="text-xl mb-[10px] lg:mb-0">{elem.body}</p>
                  <VisitButton classes="mb-[10px] hidden lg:block" bg={"black"} btnText={"Visit"} textColor={"white"} linkDestination={elem.title} linkDestinationExternal={false} buttonLocation={index % 2 !== 0}/>
                </div>
                <div className={index % 2 !== 0 ? "lg:order-1 lg:basis-1/2 basis-full" : "lg:order-2 lg:basis-1/2 basis-full"}>
                  <img src={elem.heroImage.url} className={index % 2 == 0 ? "h-auto lg:pl-10" : "h-auto lg:pr-10"} alt={elem.heroImage.title}/>
                  <VisitButton classes="mb-[10px] lg:hidden block" bg={"black"} btnText={"Visit"} textColor={"white"} linkDestination={elem.title} linkDestinationExternal={false} buttonLocation={index % 2 !== 0}/>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
