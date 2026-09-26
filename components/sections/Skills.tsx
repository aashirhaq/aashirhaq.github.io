import { skills } from "@/content/skills";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/primitives";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title" tone="lit">
      <SectionHeading
        index="04"
        label="Skills"
        title={<span id="skills-title">Capability matrix</span>}
        intro="Grouped by engineering domain and based on production work. No self-rated percentages."
      />

      <div className="panel overflow-hidden">
        <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <div key={group.id} className="bg-[rgb(5_10_22/0.88)] p-6 sm:p-7">
              <dt className="flex items-center justify-between font-mono text-[11px] tracking-[0.22em] uppercase">
                <span className="text-cyan/85">{group.label}</span>
                <span className="text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </dt>
              <dd className="mt-4">
                <ul className="flex flex-wrap gap-x-1.5 gap-y-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1.5 text-[13px] leading-none text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
