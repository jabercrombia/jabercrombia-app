import Link from "next/link";
import React from "react"

import Logo from "../components/logo";

const navigationArray = ['web','photos','design','projects'];

function Header() {

  return (

    <header className="bg-black text-white p-[15px] text-center w-full">
        <div className="container mx-auto flex items-center">
          <Logo/>
          <div className="uppercase text-xs">
          {navigationArray.map(
            (elem, index, array) => (
              <div className={index + 1 === array.length ? 'mr-4 pr-4 inline-block tracking-[3px]' : 'mr-4 border-r pr-4 inline-block tracking-[3px]'} key={index}>
                <Link href={`/`+elem} className="hover:text-cloudGray">
                  <p>{elem}</p>
                </Link>
              </div>
            )
          )}
          </div>
        </div>
    </header>
  )
}


export default Header
