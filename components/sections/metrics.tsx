import { impactMetrics } from "@/content/profile"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"

export function Metrics() {
  return (
    <Section
      id="metrics"
      eyebrow="01 / Engineering impact"
      title="Measured outcomes, not activity"
      intro="Numbers that trace back to a résumé or LinkedIn bullet — not rounded-up feelings. Each one is the result of a specific architectural decision described later on this page."
      blueprint
    >
      <dl className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
        {impactMetrics.map((m, i) => (
          <Reveal key={m.label} index={i} as="div">
            <div>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <div className="font-mono text-[clamp(2rem,4.5vw,3rem)] font-medium tabular-nums leading-none text-signal">
                  {m.value}
                </div>
                <div className="mt-3 text-[0.9375rem] leading-snug text-ivory">{m.label}</div>
                <div className="mt-1 text-[0.8125rem] text-ivory-faint">{m.note}</div>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
