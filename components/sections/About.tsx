import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Eyebrow, MetricList, Panel, SectionHeading } from "@/components/ui/primitives";

export function About() {
  const { about } = profile;
  return (
    <Section id="about" labelledBy="about-title" tone="deep">
      <SectionHeading
        index="01"
        label="About"
        title={<span id="about-title">Production engineering first. AI built on the same foundations.</span>}
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Panel className="p-6 sm:p-8 lg:col-span-7">
          <Eyebrow>Profile</Eyebrow>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-ink md:text-xl">{about.profile}</p>

          <div className="hairline my-8" aria-hidden="true" />

          <Eyebrow>Current focus</Eyebrow>
          <p className="mt-4 leading-relaxed text-pretty text-ink-2">{about.current}</p>
        </Panel>

        <Panel className="p-6 sm:p-8 lg:col-span-5">
          <Eyebrow>Engineering focus</Eyebrow>
          <ul className="mt-5 space-y-4">
            {about.focus.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="pt-0.5 font-mono text-xs text-cyan/70 tabular-nums">0{i + 1}</span>
                <span className="leading-relaxed text-ink">{item}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="hud-corners p-6 sm:p-8 lg:col-span-12">
          <div className="mb-7 flex flex-wrap items-baseline justify-between gap-2">
            <Eyebrow>System scale</Eyebrow>
            <span className="font-mono text-[11px] text-ink-3">Figures from production systems</span>
          </div>
          <MetricList
            metrics={about.scale}
            size="lg"
            className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          />
        </Panel>
      </div>
    </Section>
  );
}
