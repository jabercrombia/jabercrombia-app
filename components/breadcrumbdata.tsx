// components/DynamicBreadcrumbJsonLd.tsx

'use client';

import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { locales, breadcrumbTranslations, getLocaleFromPath } from '@/lib/translations';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

const DynamicBreadcrumbJsonLd = () => {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = breadcrumbTranslations[locale];
  const rawSegments = pathname.split('/').filter(Boolean);
  const segments = rawSegments.filter(s => !(locales as readonly string[]).includes(s));

  const breadcrumbs = segments.map((segment, index) => {
    const decoded = decodeURIComponent(segment.replace(/-/g, ' '));
    const path = '/' + segments.slice(0, index + 1).join('/');
    return {
      name: t[segment] ?? decoded,
      url: `${SITE_URL}${path}`,
    };
  });

  const breadcrumbList = [
    { name: t.home, url: SITE_URL },
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