import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Sora, JetBrains_Mono } from "next/font/google"
import { profile } from "@/content/profile"
import "./globals.css"

/*
 * Three faces, each with a job: Sora for display, Inter for reading,
 * JetBrains Mono for anything measured or system-labelled. All self-hosted by
 * next/font, so there is no render-blocking request to a font CDN.
 */
const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
})

const display = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.site.url),
  title: {
    default: profile.site.title,
    template: `%s — ${profile.shortName}`,
  },
  description: profile.site.description,
  keywords: [...profile.site.keywords],
  authors: [{ name: profile.name, url: profile.site.url }],
  creator: profile.name,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: profile.site.url,
    siteName: `${profile.name} — Portfolio`,
    title: profile.site.title,
    description: profile.site.description,
    images: [
      {
        url: profile.site.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${profile.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: profile.site.title,
    description: profile.site.description,
    images: [profile.site.ogImage],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#08090A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

/** Structured data. Person + the site itself, so search engines can link them. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${profile.site.url}/#person`,
      name: profile.name,
      alternateName: profile.shortName,
      jobTitle: profile.currentRole,
      description: profile.site.description,
      url: profile.site.url,
      email: `mailto:${profile.email}`,
      image: `${profile.site.url}${profile.site.ogImage}`,
      // jobTitle stays the employer-assigned title. hasOccupation carries the
      // broader specialisation, which is what the site positions on.
      worksFor: { "@type": "Organization", name: profile.currentCompany },
      hasOccupation: {
        "@type": "Occupation",
        name: profile.role,
        occupationalCategory: "15-1252.00 Software Developers",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Glen Ellyn",
        addressRegion: "IL",
        addressCountry: "US",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "NED University of Engineering and Technology" },
        { "@type": "CollegeOrUniversity", name: "University of Karachi" },
      ],
      knowsAbout: [
        "Backend engineering",
        "Distributed systems",
        "Payment systems",
        "Elasticsearch",
        "Event-driven architecture",
        "AWS",
        "Natural language processing",
      ],
      sameAs: [profile.social.linkedin, profile.social.github, profile.social.stackoverflow],
    },
    {
      "@type": "WebSite",
      "@id": `${profile.site.url}/#website`,
      url: profile.site.url,
      name: profile.site.title,
      description: profile.site.description,
      publisher: { "@id": `${profile.site.url}/#person` },
      inLanguage: "en-US",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`}>
      <body className="font-sans">
        {/* Keyboard users reach the content without tabbing the whole header. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-signal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Skip to content
        </a>

        {children}

        {/*
          A plain script tag, not next/script: this must be present in the
          static HTML for crawlers that do not execute JavaScript. next/script
          would only inject it at hydration time.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/*
          gtag.js is ~170kB — larger than this entire site's JavaScript. It is
          loaded during browser idle time so it never competes with content or
          interactivity. Pageviews are still recorded.
        */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${profile.analytics.googleAnalyticsId}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${profile.analytics.googleAnalyticsId}');`}
        </Script>
      </body>
    </html>
  )
}
