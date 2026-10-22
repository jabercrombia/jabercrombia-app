import Link from "next/link";
import React from "react";
import SearchBar from "../components/search";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { NavLinks, LanguageSwitcher } from "./NavLinks";
import { GitHubIcon, LinkedInIcon, MediumIcon } from "./socialIcons";
import { MEDIUM_PROFILE_URL } from "@/lib/medium";

function Header() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: 'rgba(5,7,12,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-5">

          {/* Logo */}
          <Link href="/" title="home" className="font-[family-name:var(--font-inter)] text-[15px] font-bold tracking-[0.03em] text-[#e8eaf0] no-underline">
            Justin <span className="text-[#4f8ef7]">Abercrombia</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-8 list-none m-0 p-0">
              <NavLinks />
            </ul>
            <LanguageSwitcher />
            <div className="relative">
              <SearchBar />
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-4">
            <SearchBar />
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open navigation menu" className="text-[var(--primary-color)] hover:text-[#e8eaf0] transition-colors">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-[#0d1117] border-l border-[rgba(255,255,255,0.07)] w-[260px] p-0"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="flex flex-col h-full px-6 py-8">
                  <Link href="/" title="home" className="font-[family-name:var(--font-inter)] text-[15px] font-bold tracking-[0.03em] text-[#e8eaf0] no-underline mb-10">
                    Justin <span className="text-[#4f8ef7]">Abercrombia</span>
                  </Link>
                  <nav className="flex flex-col gap-1">
                    <NavLinks mobile />
                  </nav>
                  <div className="mt-4">
                    <LanguageSwitcher />
                  </div>
                  <div className="mt-auto pt-8 flex flex-col gap-3">
                    <Link href="https://github.com/jabercrombia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-[var(--text-dim)] hover:text-[var(--text-bright)] transition-colors">
                      <GitHubIcon size={14} />
                      GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/justinabercrombia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-[var(--text-dim)] hover:text-[var(--text-bright)] transition-colors">
                      <LinkedInIcon size={14} />
                      LinkedIn
                    </Link>
                    <Link href={MEDIUM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-[var(--text-dim)] hover:text-[var(--text-bright)] transition-colors">
                      <MediumIcon size={14} />
                      Medium
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Header;
