// components/DynamicBreadcrumbJsonLd.tsx

'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL; 

const DynamicBreadcrumbJsonLd = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    return {
      name: decodeURIComponent(segment.replace(/-/g, ' ')),
      url: `${SITE_URL}${path}`,
    };
  });

  const breadcrumbList = [
    { name: 'Home', url: SITE_URL },
    ...breadcrumbs,
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
};

export default DynamicBreadcrumbJsonLd;