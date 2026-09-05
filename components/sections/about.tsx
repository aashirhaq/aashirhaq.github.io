import { certifications, profile } from "@/content/profile"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

/** Concise by design. Trajectory and approach, not autobiography. */
const PARAGRAPHS = [
  "I spent six years on one platform while it went from 8 million users to more than 24 million. That is a specific kind of education: you watch every shortcut you took come back, and you learn which decisions were structural and which were just style.",
  "The work I am best at is finding the seam — the place a system should be cut so that the next change is cheap. Splitting read traffic off the write database. Putting ten payment gateways behind one interface. Moving scoring off the request path and behind a queue. None of those are clever; they are just the boundary being drawn where the problem actually is.",
  "I care about the parts that are unglamorous and decide whether a system survives: consistency between two stores, what happens on the retry, whether you can reconstruct a transaction six months later, and whether the on-call engineer can see what the system is doing at 3am.",
  "I am now working in applied NLP, building production pipelines with the same discipline — configurable stages, measured outputs, drift monitored rather than assumed. The domain changed; the engineering did not.",
]

export function About() {
  return (
    <Section id="about" eyebrow="04 / About" title="How I think about systems">
      <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal className="max-w-prose space-y-6">
          {PARAGRAPHS.map((paragraph) => (
            <p key={paragraph} className="text-[1.0625rem] leading-relaxed text-ivory-muted text-pretty">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal>
          <div className="space-y-8">
            <div className="rounded-panel border border-wire bg-ink-raised p-6">
              <h3 className="eyebrow mb-5">Currently</h3>
              <p className="text-[0.9375rem] leading-relaxed text-ivory">
                {profile.currentRole} at {profile.currentCompany}
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ivory-muted">
                Based in {profile.location}. {profile.workAuthorization}.
              </p>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-ivory-muted">
                Open to backend, platform and full-stack engineering roles.
              </p>
            </div>

            <div>
              <h3 className="eyebrow mb-5">Recent learning</h3>
              <ul className="space-y-4 border-t border-wire pt-5">
                {certifications.map((cert) => (
                  <li key={cert.name}>
                    <div className="text-[0.875rem] leading-snug">{cert.name}</div>
                    {(cert.issuer || cert.year) && (
                      <div className="mt-1 font-mono text-[0.6875rem] text-ivory-faint">
                        {[cert.issuer, cert.year].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
