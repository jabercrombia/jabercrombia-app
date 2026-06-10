import "./globals.css";
import { headers } from "next/headers";
import { Inter, Syne } from 'next/font/google'
import { CMS_NAME } from "@/lib/constants";
import { GoogleAnalytics } from '@next/third-parties/google'
import BreadCrumbData from "../components/breadcrumbdata";
import BreadCrumb from "../components/breadcrumb";
import { Analytics } from "@vercel/analytics/react"
import Footer from "../components/footer";
import Header from "../components/header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { generateHreflang, type Locale } from "@/lib/translations";

const ogLocaleMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  it: 'it_IT',
};

export async function generateMetadata() {
  const headersList = await headers();
  const locale = (headersList.get("x-locale") ?? "en") as Locale;
  return {
    title: ``,
    description: `I design and build modern, high-performance web applications that solve real business problems. With over a decade of experience in front-end development specializing in React, Next.js, and TypeScript I help companies launch scalable digital experiences that are fast, accessible, and conversion-focused.`,
    keywords: ['Next.js', 'React', 'JavaScript'],
    authors: [{ name: 'Justin Abercrombia', url: 'http://www.github.com/jabercrombia' }],
    creator: 'Justin Abercrombia',
    openGraph: {
      images: '/homepage/homepage_thumb.png',
      locale: ogLocaleMap[locale],
    },
    alternates: {
      canonical: process.env.SITE_URL,
      languages: generateHreflang('/'),
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
})



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const locale = headersList.get("x-locale") ?? "en";
  return (
    <>
      <html lang={locale} className={`${inter.variable} ${syne.variable}`}>
      <GoogleAnalytics gaId={process.env.GOOGLE_TRACKIND_ID || ''} />
      <SpeedInsights/>
      <meta name="google-site-verification" content="m8chR7z2H5-93nOawLfs2FW30foI--k4eiLnjiPmxhY" />
        <body>
            <div className="flex flex-col min-h-screen">
              <Header/>
              <BreadCrumbData/>
                <main className="flex-grow">
                  <BreadCrumb/>
                  {children}
                </main>
              <Footer />
            </div>
            <Analytics />
        </body>
      </html>
    </>
  );
}
