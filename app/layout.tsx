import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from "@/components/site-header";
import { Analytics } from '@vercel/analytics/react';
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: 'ScrollStats',
  description: "A dashboard tracking the adoption of Scroll zkEVM",
  keywords: [
    "Scroll",
    "zkEVM",
    "rollup",
    "L2",
    "crypto data",
  ],
  authors: [
    {
      name: "0xKofi",
      url: "https://0xkofi.com",
    },
  ],
  creator: "0xKofi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.scrollstats.com",
    title: "ScrollStats",
    description: "Scroll zkEVM Data Analytics",
    siteName: "ScrollStats",
    images: [
      {
        url: "https://i.imgur.com/EALllxl.png",
        width: 1200,
        height: 630,
        alt: "ScrollStats",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ScrollStats",
    description: "Open and transparent Scroll Data",
    images: ["https://i.imgur.com/EALllxl.png"],
    creator: "@0xKofi",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#FFF8F3' }}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  )
}
