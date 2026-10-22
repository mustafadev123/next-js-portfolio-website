import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Geist, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { SiteFooter } from "@/components/site-footer"
import { INTRO_HEAD_SCRIPT } from "@/components/intro/intro-script"
import { Analytics } from "@vercel/analytics/next"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "wdth"],
  display: "swap",
})

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0E0F0C" },
    { media: "(prefers-color-scheme: light)", color: "#F2EFE8" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadmustafa-portfolio.vercel.app"),
  title: {
    default: "Muhammad Mustufa - Software Engineer",
    template: "%s | Muhammad Mustufa",
  },
  description:
    "Muhammad Mustufa builds the systems that make AI useful: backend systems, LLM infrastructure, and applied AI, from multi-agent analytics to real-time computer vision.",
  keywords: [
    "Muhammad Mustufa",
    "Software Engineer",
    "Machine Learning",
    "Backend Development",
    "Applied ML",
    "Web Development",
    "Mobile Development",
    "Georgia State University",
  ],
  authors: [{ name: "Muhammad Mustufa", url: "https://github.com/mustafadev123" }],
  creator: "Muhammad Mustufa",
  publisher: "Muhammad Mustufa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Muhammad Mustufa - Software Engineer",
    description: "I build the systems that make AI useful. Backend systems, LLM infrastructure, and applied AI.",
    siteName: "Muhammad Mustufa Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Mustufa - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mustufa - Software Engineer",
    description: "I build the systems that make AI useful. Backend systems, LLM infrastructure, and applied AI.",
    images: ["/og-image.png"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Decides before first paint whether the first-visit intro shows (no flash of the page) */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_HEAD_SCRIPT }} />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-background"
        >
          Skip to content
        </a>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navigation />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <SiteFooter />
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
