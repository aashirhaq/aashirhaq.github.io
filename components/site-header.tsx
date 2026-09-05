"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { navigation, profile } from "@/content/profile"
import { ButtonLink } from "@/components/primitives/button"
import { trackDownload } from "@/lib/analytics"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock the page behind the mobile sheet so the background does not scroll.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-system",
        scrolled || open ? "border-b border-wire bg-ink/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded text-sm font-medium"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded border border-wire-bright bg-ink-panel font-mono text-[0.625rem] text-signal transition-colors duration-200 group-hover:border-signal-dim"
          >
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.shortName}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-3 py-2 text-[0.8125rem] text-ivory-muted transition-colors duration-200 hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href={profile.resume.path}
            external
            variant="secondary"
            size="sm"
            download={profile.resume.filename}
            onClick={() => trackDownload(profile.resume.filename, "header")}
            className="hidden sm:inline-flex"
          >
            Résumé
          </ButtonLink>

          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded text-ivory-muted transition-colors hover:text-ivory md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet. Plain list, large targets, no animation theatre. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-wire bg-ink md:hidden"
      >
        <nav aria-label="Primary mobile" className="shell flex flex-col py-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-wire/60 py-4 text-base text-ivory-muted transition-colors hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
          <ButtonLink
            href={profile.resume.path}
            external
            variant="secondary"
            download={profile.resume.filename}
            onClick={() => {
              trackDownload(profile.resume.filename, "mobile-nav")
              setOpen(false)
            }}
            className="mt-5"
          >
            Download résumé
          </ButtonLink>
        </nav>
      </div>
    </header>
  )
}
