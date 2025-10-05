import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import "styles/globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light" className={dmSans.variable}>
      <body className={dmSans.className}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>
        <main id="main-content" className="relative">
          {props.children}
        </main>
      </body>
    </html>
  )
}
