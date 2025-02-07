'use client'
 
import { usePathname } from 'next/navigation'

import { getPageHeaderCollection } from "@/lib/api";
import Image from 'next/image'
import Link from "next/link";   



function BreadCrumb(breadcrumb: any) {

    const pathname = usePathname();
    const breadcrumb_array = pathname.split('/');
console.log(breadcrumb_array);


    return (
        <div className='breadcrumb'>
          {breadcrumb_array.map(
            (elem, index: number) => (
              <Link href={`${breadcrumb_array[index] == '' ? '/' : breadcrumb_array[index]}`} key={index}>
                {breadcrumb_array[index] == '' ? 'home' : breadcrumb_array[index]}
              </Link> 
            )
          )}
        </div>
    )
};
    
export default BreadCrumb;