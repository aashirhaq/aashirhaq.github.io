"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { navigation, profile } from "@/content/profile"
import { trackOutboundClick } from "@/lib/analytics"

/**
 * The footer repeats the professional links deliberately. A recruiter who
 * scrolls past Contact should still be one click from LinkedIn, GitHub or
 * email without hunting back up the page.
 */
const CONTACT_LINKS = [
  { label: "LinkedIn", href: profile.social.linkedin, external: true },
  { label: "GitHub", href: profile.social.github, external: true },
  { label: "Stack Overflow", href: profile.social.stackoverflow, external: true },
  { label: "Email", href: `mailto:${profile.email}`, external: false },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="hairline">
      <div className="shell grid gap-10 py-12 sm:grid-cols-[1fr_auto] sm:gap-16">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 rounded text-sm font-medium">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 items-center justify-center rounded border border-wire-bright bg-ink-panel font-mono text-[0.625rem] text-signal"
            >
              {profile.initials}
            </span>
            {profile.name}
          </Link>
          <p className="mt-4 max-w-sm text-[0.875rem] leading-relaxed text-ivory-muted">
            {profile.role} · {profile.experienceLabel}
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] text-ivory-faint">
            © {year} · Built with Next.js and Three.js · Deployed on GitHub Pages
          </p>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4">Sections</h2>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded text-[0.8125rem] text-ivory-muted transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className="eyebrow mb-4">Elsewhere</h2>
            <ul className="space-y-2">
              {CONTACT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => trackOutboundClick(link.label, "footer")}
                    className="group inline-flex items-center gap-1.5 rounded text-[0.8125rem] text-ivory-muted transition-colors hover:text-signal"
                  >
                    {link.label}
                    {link.external && (
                      <>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
