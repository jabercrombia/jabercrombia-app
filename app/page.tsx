import Link from "next/link";
import { event } from "../lib/gtag";
import styles from "../components/styles/aboutme.module.scss";
import Image from "next/image";
import { getAboutCollection, getProjectCollection } from "@/lib/api";
import { Button } from "@/components/ui/button";

import { Github, Linkedin } from "lucide-react"
import Markdown from "react-markdown";

import Section from "../components/aboutme/sections";
import Skills from "../components/aboutme/skills";
import CertificationList from "../components/aboutme/certificationList";
import ProjectCard from "@/components/aboutme/projectcards";
import { formatDate } from "@/lib/formatdate";
export const metadata = {
  title: 'jabercrombia | Home',
}
export default async function PostPage() {

  const allPosts = await getAboutCollection();
  const experience = allPosts.aboutCollection.items;

  let projects = await getProjectCollection(3);
  projects = projects?.projectsCollection?.items;


  const formatToMonthYear = (dateString: string) =>
  new Date(dateString).toLocaleString('en-US', { month: 'short', year: 'numeric' });
  
  return (
    <div className={styles.aboutMePage}>
    <div className="container mx-auto px-[15px]">
      <div className="grid md:grid-cols-2 place-items-center">
        <div className="w-full">
          <h1 className="text-3xl">Hi, I'm Justin Abercrombia</h1>
          <h2 className="text-xl"></h2>
          <p className="pb-2">Front-End Specialist • Full-Stack Engineer • eCommerce Consultant</p>

<p>I design and build modern, high-performance web applications that solve real business problems. With over a decade of experience in front-end development specializing in React, Next.js, and TypeScript I help companies launch scalable digital experiences that are fast, accessible, and conversion-focused.</p>

<p>From leading offshore teams to integrating with complex CMS and eCommerce platforms like Shopify and Salesforce Commerce Cloud, I bridge the gap between technical execution and strategic business goals. Whether it’s creating personalized shopping journeys, optimizing site performance, or rolling out A/B testing frameworks, I bring clarity and impact to every project I join.</p>



          <div className="flex gap-4 w-1/2 pt-4">

            <Button className="font-small w-1/2" aria-label="Contact Me">
              <Link href="#contact" className="text-white">Contact Me</Link>
            </Button>

            {/* <Button className="font-small w-1/2" aria-label="Down Load Resume">
              <Link href="/contact" className="text-white">Download Resume</Link>
            </Button> */}
          </div>

          <div className="pt-4">
            <Link href="https://www.github.com/jabercrombia" target="_blank" className="inline-block gap-4 pr-4">
              <Github/>
            </Link>
            <Link href="https://www.linkedin.com/in/justin-abercrombia/" target="_blank" className="inline-block gap-4 pr-4">
              <Linkedin />
            </Link>
            
          </div>

        </div>
        <div className="w-full">
          <img src="/images/justin-abercrombia.svg" className="transition-transform duration-300 hover:scale-105 w-full h-full object-cover" alt="image of justin abercrombia"/>
        </div>

      </div>

    </div>
    {/* Skills */}
    <Section name="skills">
        <>
        <Skills/>
        </>
    </Section>
    {/* Projects */}
    <Section name="my projects">
        <div className="grid md:grid-cols-3 gap-10">
          {projects.map(
            (elem: { description: string, slug: string, title: string, technologyNameListCollection: { items: { name: string, techStackIconName: string }[] }, photosCollection: { items: { url: string, about: string, title: string }[] } }, index: number) => (
                <div key={index} className="pb-[20px]">
                  <ProjectCard data={elem} />
                </div>
            )
          )}
        </div>
        <div className="flex justify-center">
          <Button aria-label="view all projects" className="mx-auto">
              <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
    </Section>


 

    <Section name="experience">
          <>
          {experience.map(
            (elem: { jobTitle: string; jobDescription: string, startDate: string, endDate: string, company: string; logo: { url:string } }, index: number) => (
              <div key={index} className="pb-[20px] py-8 border-b-[1px] border-slate-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-xl">{elem.company}</p>
                    <p className="text-large">{elem.jobTitle}</p>
                    <p className="uppercase font-medium">{formatDate(elem.startDate)} - {formatDate(elem.endDate)}</p>
                  </div>
                  <div className="place-items-end">
                    <img src={elem.logo.url} alt={`${elem.company} - logo`} className="h-[30px]" />
                  </div>
                </div>
                <Markdown>{elem.jobDescription}</Markdown>
  
              </div>
            )
          )}
          <h3 className="pt-[20px]">Certifications</h3>
            <CertificationList name="Python Data Science: Data Prep & EDA with Python" company="Udemy" />
            <CertificationList name="Graph Developer - Associate" company="Apollo GraphQL" />
            <CertificationList name="Salesforce Certified B2C Commerce Developer" company="Salesforce" />
          </>

    </Section>

    {/* Contact */}

    <Section name="Get In Touch" >
      <div className="text-center">
        <p className="text-center">Interested in working together or have any questions? Feel free to reach out!</p>
        <div id="contact"></div>
        <p className="font-medium">Email:</p>
        <Link href="mailto:justinabercrombia@gmai.com" className="font-light">justinabercrombia@gmail.com</Link>
        <p className="font-medium pt-2">Connect With Me:</p>
        <div className="mt-[10px]">
            <Link href="https://www.github.com/jabercrombia" target="_blank" className="inline-block gap-4 pr-4">
              <Github/>
            </Link>
            <Link href="https://www.linkedin.com/in/justin-abercrombia/" target="_blank" className="inline-block gap-4 pr-4">
              <Linkedin />
            </Link>
            
          </div>
      </div>

    </Section>
    </div>
  );
}
