import React from "react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "./socialIcons";
import { MEDIUM_PROFILE_URL } from "@/lib/medium";

const socialLinks = [
  { href: "https://github.com/jabercrombia", label: "GitHub", Icon: GitHubIcon },
  { href: "https://www.linkedin.com/in/justinabercrombia", label: "LinkedIn", Icon: LinkedInIcon },
  { href: MEDIUM_PROFILE_URL, label: "Medium", Icon: MediumIcon },
];

function Footer() {
  return (
    <footer className="border-t border-[var(--divider)] bg-[var(--bg)]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4 py-8 text-[11px] tracking-[0.06em] text-[var(--text-dim)] md:flex-row md:items-center md:justify-between">
          <span>&copy; {new Date().getFullYear()} Justin Abercrombia</span>
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map(({ href, label, Icon }) => (
              <Link key={label} href={href} target="_blank" rel="noopener noreferrer" title={label} className="footer-link inline-flex items-center gap-1.5">
                <Icon size={13} />
                {label}
              </Link>
            ))}
            <Link href="mailto:justinabercrombia@gmail.com" className="footer-link">
              justinabercrombia@gmail.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
