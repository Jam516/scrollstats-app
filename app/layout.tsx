import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from "@/components/site-header";
import { Analytics } from '@vercel/analytics/react';
import { TimeSelect } from "@/components/time-select";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: 'ScrollStats',
  description: 'A dashboard tracking the adoption of Scroll zkEVM',
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
