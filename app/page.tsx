import Link from "next/link";
import styles from "../components/styles/aboutme.module.scss";
import { getAboutCollection } from "@/lib/api";
import Markdown from "react-markdown";
import Skills from "../components/aboutme/skills";
import { formatDate } from "@jabercrombia/date-utility";

export const metadata = {
  title: "Justin Abercrombia | Home",
};

const certifications = [
  { title: "Python Data Science: EDA", org: "Udemy" },
  { title: "Graph Developer – Associate", org: "Apollo GraphQL" },
  { title: "B2C Commerce Developer", org: "Salesforce" },
];

export default async function PostPage() {
  const allPosts = await getAboutCollection();
  const experience = allPosts.aboutCollection.items;

  return (
    <div className={styles.page}>
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>Available for work</div>
          <h1>
            Front-End <span className={styles.dim}>Specialist</span> <br/>&amp;
            <span className={styles.hi}> Full-Stack</span>
            <span className={styles.dim}>Engineer</span>
          </h1>
          <p className={styles.heroSub}>
            Building high-performance eCommerce and web applications. Specializing in React, Salesforce Commerce, and DevOps infrastructure.
          </p>
          <Link href="mailto:justinabercrombia@gmail.com" className={styles.heroCta}>
            Get in touch ↗
          </Link>
        </section>

        {/* EXPERIENCE */}
        <h2 className={`${styles.sectionLabel} text-lg`}>Experience</h2>
        {experience.map(
          (
            elem: {
              jobTitle: string;
              summary: string;
              startDate: string;
              endDate: string;
              company: string;
            },
            index: number
          ) => (
            <div className={`${styles.expItem} ${index === 0 ? "border-t-0" : ""}`} key={index}>
              <div>
                <h3 className="text-md uppercase">{elem.company}</h3>
                <div className={styles.expDates}>
                  {formatDate(elem.startDate)} – {elem.endDate ? formatDate(elem.endDate) : "Present"}
                </div>
                {!elem.endDate && (
                  <div className={styles.liveTag}>
                    <span className={styles.liveDot} />
                    Current
                  </div>
                )}
              </div>
              <div>
                <h4 className="text-lg">{elem.jobTitle}</h4>
                <div className={styles.expDesc}>
                  <Markdown>{elem.summary}</Markdown>
                </div>
              </div>
            </div>
          )
        )}

        {/* SKILLS */}
        <h2 className={`${styles.sectionLabel} text-lg`}>Skills</h2>
        <Skills />

        {/* CERTIFICATIONS */}
        <div className="flex flex-col md:flex-row">
          {certifications.map((cert) => (
            <div className="basis-1/3" key={cert.title}>
              <div className={styles.badgeTitle}>
                <span className={styles.badgeDot} />
                {cert.title}
              </div>
              <div className={styles.badgeOrg}>{cert.org}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
