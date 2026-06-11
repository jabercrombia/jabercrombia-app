"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  navTranslations,
  languageNames,
  getLocaleFromPath,
  getPathWithLocale,
  type Locale,
} from "@/lib/translations";

const navItems = ["portfolio", "design", "photos"] as const;

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = navTranslations[locale];

  const linkClass = mobile
    ? "text-[12px] tracking-[0.1em] uppercase text-[var(--primary-color)] hover:text-[#e8eaf0] transition-colors py-3 border-b border-[rgba(255,255,255,0.07)]"
    : "nav-link";

  return (
    <>
      {navItems.map((item) => {
        const href = locale === "en" ? `/${item}` : `/${locale}/${item}`;
        return (
          <Link key={item} href={href} title={t[item]} className={linkClass}>
            {t[item]}
          </Link>
        );
      })}
      <a
        href="https://blog.jabercrombia.com/"
        title={t.blog}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {t.blog}
      </a>
    </>
  );
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPath(pathname);
  const all: Locale[] = ["en", "es", "fr", "it"];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 text-[10px] tracking-[0.1em] uppercase text-[var(--text3)] hover:text-[var(--primary-color)] transition-colors"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-[var(--accent)]">{languageNames[currentLocale]}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-20 bg-[var(--bg2)] border border-[var(--divider)] py-1 z-50"
        >
          {all.map((locale) => (
            <Link
              key={locale}
              href={getPathWithLocale(pathname, locale)}
              role="option"
              aria-selected={currentLocale === locale}
              onClick={() => setOpen(false)}
              className={`block px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase transition-colors ${
                currentLocale === locale
                  ? "text-[var(--accent)]"
                  : "text-[var(--text3)] hover:text-[var(--primary-color)]"
              }`}
            >
              {languageNames[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
