import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Aashir ul Haque - Senior Backend Engineer",
  description:
    "Senior Backend Engineer with 6+ years of experience building scalable, cloud-native systems for 20M+ users. Laravel, Node.js, and AWS expert.",
  keywords:
    "senior backend engineer, Laravel, Node.js, AWS, PHP, scalable systems, API development, Muhammad Aashir ul Haque",
  authors: [{ name: "Muhammad Aashir ul Haque" }],
  openGraph: {
    title: "Muhammad Aashir ul Haque - Senior Backend Engineer",
    description:
      "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, AWS expert specializing in high-performance backend solutions.",
    type: "website",
    url: "https://aashirhaq.github.io/",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
