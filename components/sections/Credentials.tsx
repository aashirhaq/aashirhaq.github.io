import { certifications, education } from "@/content/credentials";
import { Section } from "@/components/layout/Section";
import { ArrowIcon, Eyebrow, ExternalLink, Panel, SectionHeading } from "@/components/ui/primitives";

export function Credentials() {
  return (
    <Section id="credentials" labelledBy="credentials-title" tone="deep">
      <SectionHeading index="05" label="Credentials" title={<span id="credentials-title">Education &amp; certifications</span>} />

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="p-6 sm:p-8">
          <Eyebrow>Education</Eyebrow>
          <ul className="mt-6 space-y-6">
            {education.map((item) => (
              <li key={item.degree} className="grid gap-1 border-l border-cyan/40 pl-5">
                <h3 className="text-lg font-medium tracking-tight text-ink">{item.degree}</h3>
                <p className="text-ink-2">{item.institution}</p>
                <p className="font-mono text-xs text-ink-3 tabular-nums">
                  {item.period} <span aria-hidden="true">·</span> {item.location}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="p-6 sm:p-8">
          <Eyebrow>Certifications</Eyebrow>
          <ul className="mt-6 space-y-4">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-start gap-4 rounded-lg border border-line/70 bg-white/[0.02] p-4">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid h-7 w-7 flex-none place-items-center rounded-md border border-cyan/40 text-cyan"
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-medium text-ink">{cert.name}</h3>
                  {(cert.issuer || cert.date) && (
                    <p className="mt-1 text-sm text-ink-3">{[cert.issuer, cert.date].filter(Boolean).join(" · ")}</p>
                  )}
                  {cert.credentialUrl && (
                    <ExternalLink
                      href={cert.credentialUrl}
                      className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm text-ink-2 underline-offset-4 transition-colors hover:text-cyan hover:underline"
                    >
                      View credential
                      <ArrowIcon direction="up-right" className="h-3.5 w-3.5" />
                    </ExternalLink>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}
