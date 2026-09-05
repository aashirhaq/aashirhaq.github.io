import { earlierExperiences, featuredExperiences } from "@/content/experience"
import { education } from "@/content/profile"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { TagList } from "@/components/primitives/tag"
import { ExperienceStory } from "@/components/experience-story"

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="02 / Experience"
      title="Two systems, six years apart"
      intro="Rather than a list of responsibilities: the problem each system faced, the scale it ran at, how it was built, what I owned, and what it produced."
    >
      <div className="space-y-24">
        {featuredExperiences.map((experience) => (
          <ExperienceStory key={experience.id} experience={experience} />
        ))}
      </div>

      <div className="mt-24 grid gap-14 border-t border-wire pt-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
        <div>
          <h3 className="text-display-sm font-display font-semibold">Earlier</h3>
          <ul className="mt-8 divide-y divide-wire border-y border-wire">
            {earlierExperiences.map((exp, i) => (
              <Reveal key={exp.id} index={i} as="li">
                <div className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-medium">
                      {exp.roles[0].title}
                      <span className="text-ivory-muted"> · {exp.company}</span>
                    </h4>
                    <span className="font-mono text-[0.6875rem] text-ivory-faint">{exp.period}</span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                    {exp.story.contribution}
                  </p>
                  <TagList items={exp.technologies} className="mt-4" />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-display-sm font-display font-semibold">Education</h3>
          <ul className="mt-8 space-y-6">
            {education.map((degree, i) => (
              <Reveal key={degree.degree} index={i} as="li">
                <div className="rounded-panel border border-wire bg-ink-raised p-5">
                  <div className="font-mono text-[0.6875rem] text-signal">{degree.period}</div>
                  <div className="mt-2.5 font-medium">{degree.degree}</div>
                  <div className="mt-1 text-[0.875rem] text-ivory-muted">{degree.school}</div>
                  <div className="mt-0.5 text-xs text-ivory-faint">{degree.location}</div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
