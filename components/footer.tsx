//import { Link } from "gatsby"
import React from "react"




function Footer() {
  return (
    <footer className="bg-black text-white py-2 text-center w-full mt-5">
        <div className="container mx-auto">
            <p className="text-xs">Copyright &copy; {new Date().getFullYear()} | <a href="/" className="text-white hover:text-gray-500">jabercrombia</a></p>  
        </div>
    </footer>
  )
}


export default Footer
