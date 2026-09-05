"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, ArrowUpRight, Download } from "lucide-react"
import { profile } from "@/content/profile"
import { ButtonLink } from "@/components/primitives/button"
import { SystemField } from "@/components/system/system-field"
import { trackDownload } from "@/lib/analytics"

/** Supporting facts, secondary to the specialisation stated above the name. */
const IDENTITY = [
  "Payments · Search · Distributed systems",
  "Glen Ellyn, IL — US work authorised",
]

export function Hero() {
  const reduced = useReducedMotion()

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  return (
    <section id="home" className="relative isolate flex min-h-[92svh] items-center overflow-hidden pb-20 pt-28">
      <SystemField />

      <div className="shell relative">
        <div className="max-w-3xl">
          {/*
            The specialisation and years of experience lead, because that is the
            professional level. The current job title is stated below, near the
            other status facts, where it reads as "what I am doing now" rather
            than as the headline.
          */}
          <motion.p {...rise(0)} className="eyebrow mb-7 leading-[1.6] text-ivory-muted">
            {profile.role}
            <span aria-hidden="true" className="mx-2 text-wire-bright">
              ·
            </span>
            <span className="text-signal">{profile.experienceLabel}</span>
          </motion.p>

          <motion.h1
            {...rise(0.06)}
            className="text-display-xl font-display font-semibold text-balance"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-2xl text-[clamp(1.125rem,2.2vw,1.5rem)] leading-[1.35] text-ivory text-balance"
          >
            {profile.headline}
          </motion.p>

          <motion.p {...rise(0.18)} className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ivory-muted text-pretty">
            {profile.summary}
          </motion.p>

          {/*
            Stacked on narrow screens; a single slash-separated line from sm up.
            The separators are decorative, so they never wrap onto a line alone.
          */}
          <motion.ul
            {...rise(0.24)}
            className="mt-8 flex flex-col gap-y-1.5 font-mono text-[0.75rem] text-ivory-faint sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2"
          >
            {IDENTITY.map((item, i) => (
              <li key={item} className="flex items-center gap-3">
                {item}
                {/* Trailing separator, so a wrap ends a line rather than starting one. */}
                {i < IDENTITY.length - 1 && (
                  <span aria-hidden="true" className="hidden text-wire-bright sm:inline">
                    /
                  </span>
                )}
              </li>
            ))}
          </motion.ul>

          <motion.p
            {...rise(0.27)}
            className="mt-3 flex items-center gap-2.5 font-mono text-[0.75rem] text-ivory-faint"
          >
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="absolute inline-flex h-full w-full rounded-full bg-signal opacity-70 motion-safe:animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Currently {profile.currentRole} at {profile.currentCompany}
          </motion.p>

          <motion.div {...rise(0.32)} className="mt-11 flex flex-wrap items-center gap-3">
            <ButtonLink href="/#experience">
              View experience
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href={profile.resume.path}
              external
              variant="secondary"
              download={profile.resume.filename}
              onClick={() => trackDownload(profile.resume.filename, "hero")}
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Download resume
            </ButtonLink>
            <ButtonLink href="/#contact" variant="ghost">
              Contact
            </ButtonLink>
          </motion.div>
        </div>
      </div>

      <a
        href="#metrics"
        className="absolute bottom-7 right-[var(--shell-gutter)] hidden items-center gap-2 rounded font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors hover:text-ivory lg:flex"
      >
        Scroll
        <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </section>
  )
}
