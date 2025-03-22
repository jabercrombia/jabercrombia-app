import "./globals.css";
import { Roboto } from 'next/font/google'
import { EXAMPLE_PATH, CMS_NAME } from "@/lib/constants";
import { GoogleAnalytics } from '@next/third-parties/google'
import BreadCrumb from "@/components/breadcrumb";
import { Analytics } from "@vercel/analytics/react"

import Footer from "../components/footer";
import Header from "../components/header";

export const metadata = {
  title: `jabercrombia`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'Justin Abercrombia', url: 'http://www.github.com/jabercrombia' }],
  creator: 'Justin Abercrombia',
  openGraph: {
    images: '/homepage/homepage_thumb.png',
  },
};

const roboto = Roboto({
  weight: ['100','300','400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={roboto.className}>
      <GoogleAnalytics gaId={process.env.GOOGLE_TRACKIND_ID || ''} />
        <body>
            <div className="flex flex-col min-h-screen">
              <Header/>
              <BreadCrumb/>
                <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <Analytics />
        </body>
      </html>
    </>
  );
}
