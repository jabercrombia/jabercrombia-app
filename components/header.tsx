import Link from "next/link";
import React from "react";
import SearchBar from "../components/search";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navigationArray = ['portfolio', 'design', 'photos', 'blog'];

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
              {navigationArray.map((elem, index) => (
                <li key={index} className="list-none">
                  <Link href={`/` + elem} className="nav-link" title={elem}>
                    {elem}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative">
              <SearchBar />
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-4">
            <SearchBar />
            <Sheet>
              <SheetTrigger asChild>
                <button aria-label="Open navigation menu" className="text-[#7a8099] hover:text-[#e8eaf0] transition-colors">
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
                    {navigationArray.map((elem, index) => (
                      <Link
                        key={index}
                        href={`/` + elem}
                        title={elem}
                        className="text-[12px] tracking-[0.1em] uppercase text-[#7a8099] hover:text-[#e8eaf0] transition-colors py-3 border-b border-[rgba(255,255,255,0.07)]"
                      >
                        {elem}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pt-8 flex flex-col gap-3">
                    <Link href="https://github.com/jabercrombia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-[#4a5068] hover:text-[#e8eaf0] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                      GitHub
                    </Link>
                    <Link href="https://www.linkedin.com/in/justinabercrombia" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[11px] tracking-[0.08em] uppercase text-[#4a5068] hover:text-[#e8eaf0] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      LinkedIn
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
