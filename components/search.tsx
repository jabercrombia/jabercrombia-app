"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length > 1) {
        const res = await fetch(`/api/search?q=${query}`);
        const data = await res.json();
        setResults(data.results);
      } else {
        setResults([]);
      }
    };
    fetchResults();
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim().length > 0) {
      setResults([]);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setQuery("");
      setResults([]);
    }, 150);
  };

  return (
    <div className="relative">
      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-[var(--border-subtle)] rounded focus-within:border-ring/40 transition-colors">
        <Search size={12} className="text-muted-foreground shrink-0" />
        <input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="bg-transparent text-[12px] text-foreground placeholder-muted-foreground outline-none w-[120px] tracking-[0.03em]"
        />
      </div>

      {/* Dropdown */}
      {results.length > 0 && (
        <ul className="absolute top-full right-0 mt-2 w-[280px] bg-muted border border-[var(--border-subtle)] rounded overflow-hidden z-50 shadow-xl">
          {results.map((item, index) => (
            <li key={item.sys.id}>
              <a
                href={`${window.location.origin}/${item.url}`}
                target="_parent"
                rel="noopener noreferrer"
                className="flex gap-3 items-center px-3 py-2.5 hover:bg-card transition-colors group"
              >
                {item.images?.items?.[0]?.url && (
                  <img
                    src={item.images.items[0].url}
                    alt={item.title}
                    className="w-10 h-10 object-cover shrink-0 border border-[var(--border-subtle)]"
                  />
                )}
                <div className="min-w-0">
                  <p className="text-[12px] text-foreground font-medium truncate group-hover:text-[var(--accent-color)] transition-colors">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {item.description?.slice(0, 60)}{item.description?.length > 60 ? "…" : ""}
                  </p>
                </div>
              </a>
              {index < results.length - 1 && (
                <div className="border-t border-[rgba(255,255,255,0.05)]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
