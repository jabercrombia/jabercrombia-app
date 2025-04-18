import Link from "next/link";
import React from "react"
import SearchBar from "../components/search";
import Logo from "../components/logo";

const navigationArray = ['web', 'projects','photos','design'];

function Header() {

  return (

    <header className="absolute top-0 left-0 w-full z-10 bg-black text-white p-[15px] text-center w-full">
        <div className="container mx-auto flex w-full items-center">
          <Logo/>
          <nav className="uppercase">
          {navigationArray.map(
            (elem, index, array) => (
              <div className={index + 1 === array.length ? 'mr-4 inline-block' : 'mr-4 border-r pr-4 inline-block'} key={index}>
                <Link href={`/`+elem} className="hover:text-cloudGray">
                  <p>{elem}</p>
                </Link>
              </div>
            )
          )}
          </nav>
          <div className="flex-1 relative">
            <SearchBar/>
          </div>
        </div>
    </header>
  )
}


export default Header
