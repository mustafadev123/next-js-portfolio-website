import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Chatbot } from "@/components/chatbot"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Muhammad Mustufa - Software Engineer",
    template: "%s | Muhammad Mustufa",
  },
  description:
    "Portfolio of Muhammad Mustufa, a software engineer building practical web and mobile applications, backend systems, and applied machine learning solutions.",
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
    description: "Portfolio showcasing practical software engineering and applied machine learning projects.",
    siteName: "Muhammad Mustufa Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Mustufa - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mustufa - Software Engineer",
    description: "Portfolio showcasing practical software engineering and applied machine learning projects.",
    images: ["/og-image.jpg"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body suppressHydrationWarning className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
