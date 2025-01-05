import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RITP",
  description: "Welcome to our college website",
  icons: {
    icon: '/fav.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js. All rights reserved © {new Date().getFullYear()}
              </p>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/privacy" className="hover:text-foreground/80">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-foreground/80">
                  Terms
                </a>
              </nav>
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}

