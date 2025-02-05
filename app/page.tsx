import Link from "next/link";
import { draftMode } from "next/headers";

import Date from "./date";
import CoverImage from "./cover-image";
import Avatar from "./avatar";
import MoreStories from "./more-stories";
// import Button from "../components/Button";

import { getHomepageSections } from "@/lib/api";
import { CMS_NAME, CMS_URL } from "@/lib/constants";

function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Blog.
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A staticallys generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and{" "}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h2>
    </section>
  );
}

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
  //const allPosts = await getAllPosts();
  {
    homepageSections.map(function (elem: { title: string; body: string; heroImage: { url: string } }) {
      console.log(elem.title);
    });
  }

  return (
    <div>
      <Intro />
      {homepageSections.map(
        (elem: { title: string; body: string; heroImage: { url: string, title: string } }, index: number) => (
          <div className={`py-20 ${index % 2 == 0 ? `bg-gray-200` : `bg-transparent`}`}  key={index}>
            <div className="container mx-auto">
              <div className="flex flex-row">
                <div className={index % 2 !== 0 ? "order-2 basis-1/2 m-auto text-right" : "order-1 basis-1/2 m-auto"}>
                  <h2 className="capitalize text-4xl">{elem.title}</h2>
                  <p className="text-xl">{elem.body}</p>
                  {/* <Button bg={"blue-100"} btnText={"Follow me"} textColor={"white"}></Button> */}
                  <Link href={`/posts/${elem.title}`} className="hover:underline">
              Visit
            </Link>
                </div>
                <div className={index % 2 !== 0 ? "order-1 basis-1/2" : "order-2 basis-1/2"}>
                  <img src={elem.heroImage.url} className={index % 2 == 0 ? "h-auto pl-10" : "h-auto pr-10"} alt={elem.heroImage.title}/>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
