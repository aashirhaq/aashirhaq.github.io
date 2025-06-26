import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Muhammad Aashir ul Haque | Senior Backend Engineer",
  description:
    "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, AWS expert specializing in high-performance backend solutions.",
  keywords:
    "senior backend engineer, Laravel, Node.js, AWS, PHP, scalable systems, API development, Muhammad Aashir ul Haque",
  authors: [{ name: "Muhammad Aashir ul Haque" }],
  openGraph: {
    type: "website",
    url: "https://aashirhaq.github.io/",
    title: "Muhammad Aashir ul Haque | Senior Backend Engineer",
    description:
      "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, AWS expert specializing in high-performance backend solutions.",
    images: [
      {
        url: "https://aashirhaq.github.io/images/cover.jpg",
        width: 1200,
        height: 630,
        alt: "Muhammad Aashir ul Haque - Senior Backend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aashir ul Haque | Senior Backend Engineer",
    description:
      "6+ years experience building scalable systems for 20M+ users. Laravel, Node.js, AWS expert specializing in high-performance backend solutions.",
    images: ["https://aashirhaq.github.io/images/cover.jpg"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='15' y='25' width='20' height='50' rx='2' fill='%234f46e5'/><rect x='40' y='15' width='20' height='60' rx='2' fill='%234f46e5'/><rect x='65' y='30' width='20' height='45' rx='2' fill='%234f46e5'/><circle cx='25' cy='20' r='3' fill='%23fff'/><circle cx='50' cy='10' r='3' fill='%23fff'/><circle cx='75' cy='25' r='3' fill='%23fff'/></svg>",
  },
  metadataBase: new URL("https://aashirhaq.github.io"),
  alternates: {
    canonical: "https://aashirhaq.github.io/",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-PWEQ5RJ569" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PWEQ5RJ569');
          `}
        </Script>

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content="Muhammad Aashir ul Haque" />

        {/* Schema.org JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Aashir ul Haque",
              jobTitle: "Senior Backend Engineer",
              url: "https://aashirhaq.github.io",
              sameAs: [
                "https://www.linkedin.com/in/aashirhaq",
                "https://github.com/aashirhaq",
                "https://stackoverflow.com/users/7940641/aashir-haque",
              ],
              description:
                "Backend Engineer with 6+ years of experience in building scalable, cloud-native systems using Laravel, Node.js, and AWS.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Glen Ellyn",
                addressRegion: "IL",
                addressCountry: "USA",
              },
              email: "mailto:aashirulhaque@gmail.com",
              telephone: "+1-630-943-2845",
              image: "https://aashirhaq.github.io/images/cover.jpg",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
