"use client"

import { useState } from "react"
import { AlertCircle, ArrowUpRight, CheckCircle2, Download, Loader2 } from "lucide-react"
import { profile } from "@/content/profile"
import { Section } from "@/components/primitives/section"
import { Button, ButtonLink } from "@/components/primitives/button"
import { trackDownload, trackFormSubmission, trackOutboundClick } from "@/lib/analytics"

type Status = "idle" | "sending" | "sent" | "error"

const LINKS = [
  { label: "LinkedIn", href: profile.social.linkedin, handle: "in/aashirhaq" },
  { label: "GitHub", href: profile.social.github, handle: "aashirhaq" },
  { label: "Stack Overflow", href: profile.social.stackoverflow, handle: "Aashir Haque" },
]

const fieldClass =
  "w-full rounded-md border border-wire bg-ink-panel px-3.5 py-2.5 text-[0.9375rem] text-ivory " +
  "placeholder:text-ivory-faint transition-colors duration-200 hover:border-wire-bright focus:border-signal-dim"

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus("sending")

    try {
      const response = await fetch(profile.contactFormEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })

      if (response.ok) {
        setStatus("sent")
        form.reset()
        trackFormSubmission("Contact", true)
      } else {
        setStatus("error")
        trackFormSubmission("Contact", false)
      }
    } catch {
      setStatus("error")
      trackFormSubmission("Contact", false)
    }
  }

  return (
    <Section id="contact" eyebrow="05 / Contact" title="Let's talk">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p className="max-w-prose text-[1.0625rem] leading-relaxed text-ivory-muted text-pretty">
            I am looking for backend, platform and full-stack engineering roles in the US. If you are hiring, or you
            just want to compare notes on payment systems, send a message — I answer everything.
          </p>

          <div className="mt-10 space-y-1">
            <a
              href={`mailto:${profile.email}`}
              onClick={() => trackOutboundClick("email", "contact")}
              className="group inline-flex items-baseline gap-2 rounded font-mono text-[clamp(1rem,2.2vw,1.375rem)] text-ivory transition-colors hover:text-signal"
            >
              {profile.email}
              <ArrowUpRight
                className="h-4 w-4 shrink-0 self-center text-ivory-faint transition-transform duration-300 ease-system group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                aria-hidden="true"
              />
            </a>
            <p className="font-mono text-[0.8125rem] text-ivory-faint">{profile.location}</p>
          </div>

          <ul className="mt-10 divide-y divide-wire border-y border-wire">
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackOutboundClick(link.label, "contact")}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-signal"
                >
                  <span className="text-[0.9375rem]">{link.label}</span>
                  <span className="flex items-center gap-2 font-mono text-[0.75rem] text-ivory-faint transition-colors group-hover:text-signal">
                    {link.handle}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>

          <ButtonLink
            href={profile.resume.path}
            external
            variant="secondary"
            download={profile.resume.filename}
            onClick={() => trackDownload(profile.resume.filename, "contact")}
            className="mt-10"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download résumé (PDF)
          </ButtonLink>
        </div>

        <div className="rounded-panel border border-wire bg-ink-raised p-6 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <input type="hidden" name="_subject" value="Portfolio contact form" />
            {/* Honeypot — hidden from people, tempting to bots. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="_gotcha">Leave this field empty</label>
              <input type="text" name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-[0.8125rem] text-ivory-muted">
                  Name
                </label>
                <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-[0.8125rem] text-ivory-muted">
                  Email
                </label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="mb-2 block text-[0.8125rem] text-ivory-muted">
                Company <span className="text-ivory-faint">(optional)</span>
              </label>
              <input id="company" name="company" type="text" autoComplete="organization" className={fieldClass} />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-[0.8125rem] text-ivory-muted">
                Message
              </label>
              <textarea id="message" name="message" rows={5} required className={`${fieldClass} resize-y`} />
            </div>

            <Button type="submit" disabled={status === "sending"} className="w-full sm:w-auto">
              {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {status === "sending" ? "Sending" : "Send message"}
            </Button>

            {/* Status is announced, not just coloured. */}
            <p aria-live="polite" className="min-h-[1.25rem]">
              {status === "sent" && (
                <span className="flex items-center gap-2 text-[0.875rem] text-signal">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Message sent. I will get back to you.
                </span>
              )}
              {status === "error" && (
                <span className="flex items-center gap-2 text-[0.875rem] text-red-400">
                  <AlertCircle className="h-4 w-4" aria-hidden="true" />
                  Something went wrong. Email me directly at {profile.email}.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </Section>
  )
}
