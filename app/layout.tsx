import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { PERSONAL_INFO } from "@/lib/constants"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: PERSONAL_INFO.website.title,
  description: PERSONAL_INFO.website.description,
  keywords: PERSONAL_INFO.website.keywords,
  authors: [{ name: PERSONAL_INFO.name }],
  openGraph: {
    type: "website",
    url: PERSONAL_INFO.website.url,
    title: PERSONAL_INFO.website.title,
    description: PERSONAL_INFO.website.description,
    images: [
      {
        url: `${PERSONAL_INFO.website.url}${PERSONAL_INFO.images.socialPreview}`,
        width: 1200,
        height: 630,
        alt: `${PERSONAL_INFO.name} - ${PERSONAL_INFO.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: PERSONAL_INFO.website.title,
    description: PERSONAL_INFO.website.description,
    images: [`${PERSONAL_INFO.website.url}${PERSONAL_INFO.images.socialPreview}`],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='15' y='25' width='20' height='50' rx='2' fill='%234f46e5'/><rect x='40' y='15' width='20' height='60' rx='2' fill='%234f46e5'/><rect x='65' y='30' width='20' height='45' rx='2' fill='%234f46e5'/><circle cx='25' cy='20' r='3' fill='%23fff'/><circle cx='50' cy='10' r='3' fill='%23fff'/><circle cx='75' cy='25' r='3' fill='%23fff'/></svg>",
  },
  metadataBase: new URL(PERSONAL_INFO.website.url),
  alternates: {
    canonical: PERSONAL_INFO.website.url,
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${PERSONAL_INFO.analytics.googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${PERSONAL_INFO.analytics.googleAnalyticsId}');
          `}
        </Script>

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="author" content={PERSONAL_INFO.name} />

        {/* Schema.org JSON-LD */}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: PERSONAL_INFO.name,
              jobTitle: PERSONAL_INFO.title,
              url: PERSONAL_INFO.website.url,
              sameAs: [PERSONAL_INFO.social.linkedin, PERSONAL_INFO.social.github, PERSONAL_INFO.social.stackoverflow],
              description: PERSONAL_INFO.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Glen Ellyn",
                addressRegion: "IL",
                addressCountry: "USA",
              },
              email: `mailto:${PERSONAL_INFO.email}`,
              telephone: PERSONAL_INFO.phone,
              image: `${PERSONAL_INFO.website.url}${PERSONAL_INFO.images.cover}`,
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
