import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from "@/components/site-header";

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
      <body>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  )
}
