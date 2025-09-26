import React from "react"
import Link from "next/link"

function Logo() {

    return (
        <Link href="/" title="home">
            <div className="mr-[20px]">
                <svg version="1.1" viewBox="0 0 500 500" className="fill-white h-[30px] hover:fill-cloudGray">
                    <g>
                        <polygon points="373.35,396.66 257.52,74.59 192.5,254.84 	"/>
                        <path d="M434.97,410.45C472.36,367.33,495,311.02,495,249.41C495,127.4,406.23,26.18,289.9,7.08L434.97,410.45z"/>
                        <path d="M129.24,273.07l-96.63-75.78h86.5l29.2,22.9L225.94,5C101.93,17.12,5,121.91,5,249.41c0,67.21,26.94,128.1,70.57,172.44
                            L129.24,273.07z"/>
                        <path d="M173.42,307.72l-53.95,149.55C157.27,481.16,202.02,495,250,495c44.11,0,85.5-11.69,121.25-32.15L173.42,307.72z"/>
                    </g>
                </svg>
            </div>
        </Link>
      )
  }
  
export default Logo;