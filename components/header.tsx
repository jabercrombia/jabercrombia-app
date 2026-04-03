import Link from "next/link";
import React from "react";
import SearchBar from "../components/search";

const navigationArray = ['portfolio', 'design', 'photos', 'blog'];

function Header() {
  return (
    <div
      className="fixed top-0 left-0 w-full z-50"
      style={{ backgroundColor: 'rgba(5,7,12,0.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center" style={{ padding: '1.25rem 0' }}>
          <Link href="/" title="home" className="font-[family-name:var(--font-inter)] text-[15px] tracking-[0.03em] text-[#e8eaf0] no-underline uppercase">
            Justin <span className="text-[#4f8ef7] font-bold">Abercrombia</span>
          </Link>
          <div className="flex items-center gap-8">
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
        </div>
      </div>
    </div>
  );
}

export default Header;
