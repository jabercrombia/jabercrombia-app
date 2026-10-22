import "./globals.css";
import { headers } from "next/headers";
import { Inter, Syne, JetBrains_Mono } from 'next/font/google'
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
    description: `DevOps & platform engineer building cloud infrastructure with Terraform, CI/CD pipelines, and observability for fast, reliable web platforms.`,
    keywords: ['DevOps', 'Platform Engineering', 'Terraform', 'Cloudflare', 'AWS', 'CI/CD', 'Observability', 'Next.js'],
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

const mono = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
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
      <html lang={locale} className={`${inter.variable} ${syne.variable} ${mono.variable}`}>
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
