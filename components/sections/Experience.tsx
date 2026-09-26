import { experience } from "@/content/experience";
import { Section } from "@/components/layout/Section";
import { ArrowIcon, ExternalLink, MetricList, Panel, SectionHeading, TagList } from "@/components/ui/primitives";

export function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title" tone="lit">
      <SectionHeading
        index="02"
        label="Experience"
        title={<span id="experience-title">System history</span>}
        intro="From PHP web platforms to a 24M-user fintech backend, and now production AI."
      />

      <div className="relative">
        {/* Illuminated spine with a travelling data pulse. */}
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px overflow-hidden bg-gradient-to-b from-cyan/50 via-blue/30 to-transparent lg:left-[calc(16rem+7px)]"
        >
          <div className="flow-pulse h-24 w-px bg-gradient-to-b from-transparent via-cyan to-transparent" />
        </div>

        <ol className="relative">
        {experience.map((entry, index) => (
          <li key={entry.id} className="relative grid gap-4 pb-12 pl-9 last:pb-0 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-0 lg:pl-0">
            {/* Node */}
            <span
              aria-hidden="true"
              className="absolute top-2 left-0 grid h-[15px] w-[15px] place-items-center rounded-full border border-cyan/60 bg-bg lg:left-[16rem]"
            >
              <span className={index === 0 ? "status-dot h-1.5 w-1.5 rounded-full bg-cyan" : "h-1.5 w-1.5 rounded-full bg-cyan/60"} />
            </span>

            {/* Meta column */}
            <div className="lg:pr-10 lg:text-right">
              <p className="font-mono text-xs tracking-wide text-cyan/90 tabular-nums">{entry.period}</p>
              <p className="mt-1.5 text-sm text-ink-3">{entry.location}</p>
              <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">{entry.domain}</p>
            </div>

            {/* Detail panel */}
            <Panel className="p-6 sm:p-7 lg:ml-10">
              <h3 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {entry.organizationUrl ? (
                  <ExternalLink
                    href={entry.organizationUrl}
                    className="group/org inline-flex items-center gap-2 rounded-sm underline-offset-[6px] decoration-cyan/50 transition-colors hover:text-cyan hover:underline"
                  >
                    {entry.organization}
                    <ArrowIcon
                      direction="up-right"
                      className="h-4 w-4 text-ink-3 transition-colors group-hover/org:text-cyan"
                    />
                  </ExternalLink>
                ) : (
                  entry.organization
                )}
              </h3>

              <div className="mt-5 space-y-7">
                {entry.roles.map((role) => (
                  <div key={role.title}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-base font-medium text-ink">{role.title}</h4>
                      {entry.roles.length > 1 && (
                        <span className="font-mono text-xs text-ink-3 tabular-nums">{role.period}</span>
                      )}
                    </div>
                    <ul className="mt-3 space-y-2.5">
                      {role.highlights.map((point) => (
                        <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-3 flex-none bg-cyan/50" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {entry.metrics && (
                <MetricList
                  metrics={entry.metrics}
                  size="sm"
                  className="mt-7 grid-cols-2 border-t border-line pt-5 sm:grid-cols-3"
                />
              )}

              <TagList items={entry.stack} label={`${entry.organization} technologies`} className="mt-6" />
            </Panel>
          </li>
        ))}
        </ol>
      </div>
    </Section>
  );
}
