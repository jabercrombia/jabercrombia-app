"use client"

import { usePathname } from 'next/navigation';
import React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function BreadCrumb() {

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
    const pathname = usePathname();
    const segments = pathname.split('/').filter(Boolean);

    const breadcrumbs = segments.map((segment, index) => {
        const path = '/' + segments.slice(0, index + 1).join('/');
        return {
        name: decodeURIComponent(segment.replace(/-/g, ' ')),
        url: `${SITE_URL}${path}`,
        };
    });
    return (
        <div className="container mx-auto px-[15px] pt-[20px]">
          {breadcrumbs.length > 0 && (
            <Breadcrumb className="container mx-auto uppercase">
              <BreadcrumbList className="mt-[20px] mb-[20px]">
                  <BreadcrumbItem>
                      <BreadcrumbLink href="/" className="text-grey-600">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {breadcrumbs.map((elem, index: number) => (
                      <React.Fragment key={index}>
                          
                        {index !== breadcrumbs.length - 1 ?
                        <BreadcrumbItem>
                          <BreadcrumbLink href={elem.url} className="text-grey-600">{elem.name}</BreadcrumbLink>
                        </BreadcrumbItem> : 
                        <BreadcrumbItem>
                          <BreadcrumbPage className={index == breadcrumbs.length - 1 ? 'font-bold' : ''}>{elem.name}</BreadcrumbPage>
                        </BreadcrumbItem>}
                             
                        {/* Do not add a separator after the last breadcrumb */}
                        {index < breadcrumbs.length - 1 &&  <BreadcrumbSeparator />}
                      </React.Fragment>
                  ))}      
              </BreadcrumbList>
            </Breadcrumb>
          )} 
        </div>
    )
}


