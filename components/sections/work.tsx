import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { featuredProjects, otherProjects } from "@/content/projects"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { TagList } from "@/components/primitives/tag"
import { ProjectCard } from "@/components/project-card"

export function Work() {
  return (
    <Section
      id="work"
      eyebrow="03 / Selected work"
      title="Four systems worth explaining"
      intro="Each of these has a case study behind it: the problem, the constraints that shaped it, the architecture, and what actually changed as a result."
      blueprint
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} index={i} as="article">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20">
        <h3 className="text-display-sm font-display font-semibold">Also shipped</h3>
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-ivory-muted">
          Client and freelance work — smaller in scope, same concerns.
        </p>

        <ul className="mt-8 divide-y divide-wire border-y border-wire">
          {otherProjects.map((project, i) => (
            <Reveal key={project.slug} index={i} as="li">
              <div className="group grid gap-4 py-6 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-8">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h4 className="text-base font-medium">{project.title}</h4>
                    <span className="font-mono text-[0.6875rem] text-ivory-faint">
                      {project.org ? `${project.org} · ` : ""}
                      {project.period}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                    {project.tagline}
                  </p>
                  <TagList items={project.technologies} className="mt-4" limit={5} />
                </div>

                <div className="flex items-center gap-5 sm:justify-end sm:pt-1">
                  {project.metrics[0] && (
                    <div className="text-right">
                      <div className="font-mono text-lg tabular-nums text-signal">{project.metrics[0].value}</div>
                      <div className="text-xs text-ivory-faint">{project.metrics[0].label}</div>
                    </div>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded border border-wire-bright px-3 py-2 font-mono text-[0.6875rem] text-ivory-muted transition-colors hover:border-signal-dim hover:text-signal"
                    >
                      Visit
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">{project.title} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
