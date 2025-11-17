import Link from "next/link";
import { event } from "../lib/gtag";
import styles from "../components/styles/aboutme.module.scss";
import Image from "next/image";
import { getAboutCollection, getProjectCollection } from "@/lib/api";
import { Button } from "@/components/ui/button";

import { Github, Linkedin } from "lucide-react";
import Markdown from "react-markdown";

import Section from "../components/aboutme/sections";
import Skills from "../components/aboutme/skills";
import CertificationList from "../components/aboutme/certificationList";
import { formatDate } from "@jabercrombia/date-utility";
export const metadata = {
  title: "Justin Abercrombia | Home",
};
export default async function PostPage() {
  const allPosts = await getAboutCollection();
  const experience = allPosts.aboutCollection.items;

  let projects = await getProjectCollection(3);
  projects = projects?.projectsCollection?.items;

  const formatToMonthYear = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

  return (
    <div className={styles.aboutMePage}>
      <div className="container mx-auto md:flex gap-10">
        <div className="w-full md:w-1/3 pb-10 px-2 md:px-0">
          <div className="md:sticky top-20">
            <h1 className="text-3xl">Hi, I'm Justin Abercrombia</h1>
            <p className="pb-2 font-medium pt-4">
              Front-End Specialist • Full-Stack Engineer • DevOps
            </p>

            <h3 className="pt-[20px] text-lg pb-[10px]">Certifications</h3>
            <CertificationList name="Python Data Science: Data Prep & EDA with Python" company="Udemy"/>
            <CertificationList name="Graph Developer - Associate" company="Apollo GraphQL"/>
            <CertificationList name="Salesforce Certified B2C Commerce Developer" company="Salesforce"/>
            <h3 className="pt-[20px] text-lg pb-[10px]">Contact Me</h3>
            <p className="font-medium">Email:</p>
            <Link href="mailto:justinabercrombia@gmai.com" className="font-light">justinabercrombia@gmail.com</Link>
            <p className="font-medium pt-2">Connect With Me:</p>
            <div className="mt-[10px]">
            <Link
              href="https://www.github.com/jabercrombia"
              target="_blank"
              className="inline-block gap-4 pr-4"
            >
              <Github />
            </Link>
            <Link
              href="https://www.linkedin.com/in/justin-abercrombia/"
              target="_blank"
              className="inline-block gap-4 pr-4"
            >
              <Linkedin />
            </Link>
          </div>
           
          </div>
        </div>
        <div className="w-full md:w-2/3 px-2 md:px-0">
         <Section name="experience">
          <>
            {experience.map(
              (
                elem: {
                  jobTitle: string;
                  jobDescription: string;
                  summary: string;
                  startDate: string;
                  endDate: string;
                  company: string;
                  logo: { url: string };
                },
                index: number
              ) => (
                <div key={index} className="pb-[20px] py-2 md:p-8 border-b-[1px] border-slate-200 hover:bg-gray-100">
                  <div className="container md:flex">
                    <div className="w-full md:w-1/4">
                      <p className="uppercase font-medium text-xs">
                        {formatDate(elem.startDate)} - {elem.endDate ? formatDate(elem.endDate) : "Present"}
                      </p>
                    </div>
                    <div className="w-full md:w-3/4">
                      <div className="container flex justify-between">
                        <div>
                          <p className="font-medium text-xl">{elem.company}</p>
                          <p>{elem.jobTitle}</p>
                        </div>
                        <div>
                          <img src={elem.logo.url} alt={`${elem.company} - logo`} className="h-[30px]" title={`${elem.company} logo`} />
                        </div>
                      </div>
                      <span className="text-xs">
                        <Markdown>{elem.summary}</Markdown>
                      </span>
                    </div>
                  </div>
                
                </div>
              )
            )}
            
          </>
        </Section>
        <Section name="Skills">
              <Skills />
       
        </Section>
        </div>
      </div>

    
    </div>
  );
}
