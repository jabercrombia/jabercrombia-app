import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAboutCollection } from "@/lib/api";
import { getMediumArticles, MEDIUM_PROFILE_URL } from "@/lib/medium";
import Markdown from "react-markdown";
import Skills from "../components/aboutme/skills";
import Pipeline from "../components/aboutme/pipeline";
import Terminal from "../components/aboutme/terminal";
import SectionLabel from "../components/aboutme/sectionLabel";
import ArticleCard from "../components/writing/articleCard";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "../components/socialIcons";
import { formatDate } from "@jabercrombia/date-utility";
import { headers } from "next/headers";
import { homeTranslations, metadataTranslations, writingTranslations, generateHreflang, generateCanonical, type Locale } from "@/lib/translations";

export async function generateMetadata() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const m = metadataTranslations[locale].home;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: generateCanonical('/', locale),
      languages: generateHreflang('/'),
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: generateCanonical('/', locale),
      images: '/homepage/homepage_thumb.png',
    },
  };
}

const certifications = [
  { title: "Python Data Science: EDA", org: "Udemy" },
  { title: "Graph Developer – Associate", org: "Apollo GraphQL" },
  { title: "B2C Commerce Developer", org: "Salesforce" },
];

const socialLinks = [
  { href: "https://github.com/jabercrombia", label: "GitHub", Icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/justinabercrombia", label: "LinkedIn", Icon: LinkedInIcon },
  { href: MEDIUM_PROFILE_URL, label: "Medium", Icon: MediumIcon },
];

type ExperienceItem = {
  jobTitle: string;
  summary: string;
  jobDescription: string;
  startDate: string;
  endDate: string;
  company: string;
  logo: { url: string; title: string } | null;
};

export default async function HomePage() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  const t = homeTranslations[locale];
  const w = writingTranslations[locale];
  const writingHref = locale === "en" ? "/writing" : `/${locale}/writing`;

  const [allPosts, articles] = await Promise.all([getAboutCollection(), getMediumArticles(3)]);
  const experience: ExperienceItem[] = allPosts.aboutCollection.items;

  return (
    <div className="min-h-screen bg-[var(--page-bg)] text-[15px] font-light leading-[1.7] text-[var(--text-bright)]">
      <div className="container mx-auto px-6">

        {/* HERO */}
        <section className="grid items-center gap-12 pt-4 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-[var(--accent)] before:block before:h-px before:w-6 before:bg-[var(--accent)]">
              {t.eyebrow}
            </div>
            <h1 className="mb-6 font-[family-name:var(--font-syne)] text-[clamp(2.8rem,6.5vw,5rem)] font-medium leading-none tracking-[-0.02em] text-[var(--text-bright)]">
              {t.heading1} <span className="text-[var(--text-dim)]">{t.heading2}</span>
              <br />
              {t.heading3}
            </h1>
            <p className="mb-10 max-w-[520px] text-[15px] leading-[1.8] text-[var(--text3)]">{t.subtitle}</p>
            <div className="flex flex-wrap items-center gap-6">
              {socialLinks.map(({ href, label, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="inline-flex items-center gap-2 text-[12px] tracking-[0.05em] text-[var(--primary-color)] transition-colors hover:text-[var(--accent)]"
                >
                  <Icon />
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <Terminal />
        </section>

        {/* PIPELINE */}
        <section aria-labelledby="pipeline-heading">
          <SectionLabel id="pipeline-heading">{t.pipelineLabel}</SectionLabel>
          <Pipeline stages={t.pipeline} />
        </section>

        {/* WRITING */}
        {articles.length > 0 && (
          <section aria-labelledby="writing-heading">
            <SectionLabel
              id="writing-heading"
              action={
                <Link
                  href={writingHref}
                  title={t.allArticles}
                  className="inline-flex shrink-0 items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-[var(--accent)] hover:text-[var(--text-bright)]"
                >
                  {t.allArticles}
                  <ArrowRight size={13} aria-hidden="true" />
                </Link>
              }
            >
              {t.writing}
            </SectionLabel>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} readLabel={w.readOn} />
              ))}
            </div>
          </section>
        )}

        {/* EXPERIENCE */}
        <section aria-labelledby="experience-heading">
          <SectionLabel id="experience-heading">{t.experience}</SectionLabel>
          {experience.map((elem, index) => (
            <article
              key={index}
              className="grid grid-cols-1 gap-2 border-b border-[var(--divider)] py-8 md:grid-cols-[100px_1fr] md:gap-8"
            >
              <div>
                {elem.logo?.url && (
                  <div className="w-auto max-w-[70px] bg-white/70">
                    <img src={elem.logo.url} alt={elem.logo.title} className="my-2 w-auto invert" />
                  </div>
                )}
                {!elem.endDate && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[var(--accent)]">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" aria-hidden="true" />
                    {t.current}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-light">{elem.company}</h3>
                <div className="mb-2 text-[1.15rem] font-semibold leading-snug text-[var(--text-bright)]">{elem.jobTitle}</div>
                <div className="mb-3 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[var(--text-muted)]">
                  {formatDate(elem.startDate)} – {elem.endDate ? formatDate(elem.endDate) : t.present}
                </div>
                <div className="text-[13.5px] leading-[1.75] text-[var(--primary-color)] [&_p]:m-0 [&_ul]:ml-4 [&_ul]:mt-1">
                  <Markdown>{elem.jobDescription || elem.summary}</Markdown>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* SKILLS */}
        <section aria-labelledby="skills-heading">
          <SectionLabel id="skills-heading">{t.skills}</SectionLabel>
          <Skills />
        </section>

        {/* CERTIFICATIONS */}
        <section aria-labelledby="certifications-heading">
          <SectionLabel id="certifications-heading" className="pt-4">{t.certifications}</SectionLabel>
          <div className="mb-16 grid grid-cols-1 gap-3 md:grid-cols-3">
            {certifications.map((cert) => (
              <div key={cert.title} className="border border-[var(--divider)] bg-[var(--bg2)] px-4 py-3">
                <div className="mb-1 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  <span className="text-[12.5px] font-medium text-[var(--text-bright)]">{cert.title}</span>
                </div>
                <div className="pl-3.5 text-[10px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{cert.org}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
