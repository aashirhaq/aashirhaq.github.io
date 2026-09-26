import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { HolographicBackground } from "@/components/cinematic/HolographicBackground";
import { IntroSequence } from "@/components/cinematic/IntroSequence";
import { RouteSweep } from "@/components/cinematic/RouteSweep";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import { introGateScript } from "@/lib/intro-gate";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${profile.name}` },
  description: site.description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: site.url }],
  creator: profile.name,
  keywords: [
    "Backend Engineer",
    "AI Engineer",
    "Distributed Systems",
    "Payments",
    "Elasticsearch",
    "Laravel",
    "Node.js",
    "NestJS",
    "Python",
    "RAG",
    "LLM",
    "AWS",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: profile.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.positioning}` }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#03060d",
  colorScheme: "dark",
};

const isProduction = process.env.NODE_ENV === "production";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      // Lets Next.js turn off smooth scrolling during route changes (jump to top instantly).
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Decides intro vs. portfolio before first paint — see lib/intro-gate.ts. */}
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      {/* Extensions (Grammarly, ColorZilla, …) inject attributes on <body> before hydration. */}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-[100] rounded-md bg-ink px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>

        <HolographicBackground />
        <IntroSequence />

        <div id="site-root" className="relative z-10">
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>

        <RouteSweep />

        {isProduction && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${site.gaMeasurementId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
