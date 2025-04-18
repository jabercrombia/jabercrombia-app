//import { Link } from "gatsby"
import React from "react"
import { Github } from "lucide-react"
import Link from "next/link"


function Footer() {
  return (
    <footer className="bg-black text-white py-4 text-center w-full">
        <div className="container mx-auto">
          <div className="grid grid-cols-2">
            <div>
              <Link href="https://www.github.com/jabercrombia" target="_blank"><Github className="text-gray-400 hover:text-white" /></Link>
            </div>
            <div>
            <p className="text-xs text-right">Copyright &copy; {new Date().getFullYear()} | <a href="/" className="text-white hover:text-gray-500">jabercrombia</a></p>  
            </div>
          </div>
        </div>
    </footer>
  )
}


export default Footer
