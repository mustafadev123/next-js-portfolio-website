import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Loader } from "@/components/loader"
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
    default: "Muhammad Mustafa - Software Engineer & ML Enthusiast",
    template: "%s | Muhammad Mustafa",
  },
  description:
    "Portfolio of Muhammad Mustafa, a Software Engineer with expertise in backend systems, AI integration, and full-stack development. Experienced in Laravel, Spring Boot, React, and Machine Learning.",
  keywords: [
    "Muhammad Mustafa",
    "Software Engineer",
    "Machine Learning",
    "Backend Development",
    "React",
    "Laravel",
    "Spring Boot",
    "AI Integration",
    "Full Stack Developer",
    "LUMS",
    "Pakistan Developer",
  ],
  authors: [{ name: "Muhammad Mustafa", url: "https://github.com/Negatrin" }],
  creator: "Muhammad Mustafa",
  publisher: "Muhammad Mustafa",
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
    url: "https://muhammad-mustafa.dev",
    title: "Muhammad Mustafa - Software Engineer & ML Enthusiast",
    description: "Portfolio showcasing projects in web development, machine learning, and AI integration.",
    siteName: "Muhammad Mustafa Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Mustafa - Software Engineer & ML Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Mustafa - Software Engineer & ML Enthusiast",
    description: "Portfolio showcasing projects in web development, machine learning, and AI integration.",
    images: ["/og-image.jpg"],
    creator: "@muhammad_mustafa",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://muhammad-mustafa.dev",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Loader />
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Chatbot />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
