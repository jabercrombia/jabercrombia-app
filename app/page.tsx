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
          <div className="flex items-center gap-4 flex-wrap">
      
            <Link
              href="https://github.com/jabercrombia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-[#7a8099] hover:text-[#e8eaf0] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/justinabercrombia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-[#7a8099] hover:text-[#e8eaf0] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </Link>
          </div>
        </section>

        {/* EXPERIENCE */}
        <h2 className={`${styles.sectionLabel} text-lg`}>Experience</h2>
        {experience.map(
          (
            elem: {
              jobTitle: string;
              summary: string;
              jobDescription: string;
              startDate: string;
              endDate: string;
              company: string;
              logo: { url: string; title: string } | null;
            },
            index: number
          ) => (
            <div className={`${styles.expItem} ${index === 0 ? "border-t-0" : ""}`} key={index}>
              <div>
                <div className="bg-white/70 w-auto max-w-[70px]">
                {elem.logo?.url && (
                  <img
                    src={elem.logo.url}
                    alt={elem.logo.title}
                    className="mt-2 mb-2 w-auto invert"
                  />
                )}
                </div>
                {!elem.endDate && (
                  <div className={styles.liveTag}>
                    <span className={styles.liveDot} />
                    Current
                  </div>
                )}
              </div>
              <div>
                <div className="text-2xl">{elem.company}</div>
                <div className={styles.expRole}>{elem.jobTitle}</div>
                <div className={`${styles.expDates} mb-3`}>
                  {formatDate(elem.startDate)} – {elem.endDate ? formatDate(elem.endDate) : "Present"}
                </div>
                <div className={styles.expDesc}>
                  <Markdown>{elem.jobDescription || elem.summary}</Markdown>
                </div>
              </div>
            </div>
          )
        )}

        {/* SKILLS */}
        <h2 className={`${styles.sectionLabel} text-lg`}>Skills</h2>
        <Skills />

        {/* CERTIFICATIONS */}
        <div className={styles.sectionLabel}>Certifications</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
          {certifications.map((cert) => (
            <div key={cert.title} className="bg-[#0e1219] border border-[rgba(255,255,255,0.07)] px-4 py-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] shrink-0" />
                <span className="text-[12.5px] text-[#e8eaf0] font-medium">{cert.title}</span>
              </div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-[#4a5068] pl-3.5">{cert.org}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
