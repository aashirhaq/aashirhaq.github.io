import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { caseStudies, getProject } from "@/content/projects"
import { profile } from "@/content/profile"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MetricRow } from "@/components/primitives/metric"
import { Reveal } from "@/components/primitives/reveal"
import { TagList } from "@/components/primitives/tag"
import { ArchitectureDiagram } from "@/components/system/architecture-diagram"
import { CaseStudyTracker } from "@/components/case-study-tracker"

interface Params {
  params: { slug: string }
}

export function generateStaticParams() {
  return caseStudies.map((project) => ({ slug: project.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug)
  if (!project) return {}

  const description = `${project.tagline} ${project.org ? `Built at ${project.org}.` : ""}`.trim()

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${profile.shortName}`,
      description,
      url: `${profile.site.url}/work/${project.slug}/`,
      images: [{ url: profile.site.ogImage, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — ${profile.shortName}`,
      description,
      images: [profile.site.ogImage],
    },
  }
}

export default function CaseStudyPage({ params }: Params) {
  const project = getProject(params.slug)
  if (!project?.caseStudy) notFound()

  const { caseStudy } = project
  const index = caseStudies.findIndex((p) => p.slug === project.slug)
  const next = caseStudies[(index + 1) % caseStudies.length]

  return (
    <>
      <SiteHeader />
      <CaseStudyTracker slug={project.slug} />

      <main id="main">
        <article>
          {/* Title block */}
          <header className="blueprint border-b border-wire pb-16 pt-32 sm:pb-20 sm:pt-36">
            <div className="shell">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 rounded font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ivory-faint transition-colors hover:text-ivory"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                Selected work
              </Link>

              <div className="mt-8 max-w-4xl">
                <p className="eyebrow mb-6">
                  {project.org ? `${project.org} · ` : ""}
                  {project.period} · {project.role}
                </p>
                <h1 className="text-display-lg font-display font-semibold text-balance">{project.title}</h1>
                <p className="mt-6 max-w-2xl text-[1.125rem] leading-relaxed text-ivory-muted text-pretty">
                  {project.tagline}
                </p>
              </div>

              {project.metrics.length > 0 && (
                <MetricRow
                  metrics={project.metrics}
                  size="lg"
                  className="mt-14 max-w-4xl border-t border-wire pt-8"
                />
              )}
            </div>
          </header>

          <div className="shell grid gap-14 py-section lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-16">
            {/* Fact rail */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-8">
                <div>
                  <h2 className="eyebrow mb-4">Technologies</h2>
                  <TagList items={project.technologies} />
                </div>
                {project.liveUrl && (
                  <div>
                    <h2 className="eyebrow mb-4">Live</h2>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded font-mono text-[0.8125rem] text-signal transition-colors hover:text-signal-bright"
                    >
                      Visit the product
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                )}
              </div>
            </aside>

            <div className="min-w-0 max-w-3xl">
              <Reveal>
                <section aria-labelledby="problem-heading">
                  <h2 id="problem-heading" className="eyebrow text-signal-dim">
                    The problem
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-ivory text-pretty">{caseStudy.problem}</p>
                </section>
              </Reveal>

              <Reveal>
                <section aria-labelledby="constraints-heading" className="mt-14">
                  <h2 id="constraints-heading" className="eyebrow text-signal-dim">
                    Constraints
                  </h2>
                  <ul className="mt-5 space-y-3.5 border-l border-wire pl-6">
                    {caseStudy.constraints.map((constraint) => (
                      <li key={constraint} className="text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                        {constraint}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>

              {caseStudy.diagram && (
                <Reveal>
                  <section aria-labelledby="architecture-heading" className="mt-16">
                    <h2 id="architecture-heading" className="eyebrow mb-6 text-signal-dim">
                      Architecture
                    </h2>
                    <div className="rounded-panel border border-wire bg-ink-raised p-5 sm:p-7">
                      <ArchitectureDiagram diagram={caseStudy.diagram} />
                    </div>
                  </section>
                </Reveal>
              )}

              {caseStudy.sections.map((section) => (
                <Reveal key={section.heading}>
                  <section className="mt-16">
                    <h2 className="text-display-sm font-display font-semibold text-balance">{section.heading}</h2>
                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-ivory-muted text-pretty">{section.body}</p>
                    {section.points && (
                      <ul className="mt-6 space-y-3 border-l border-wire pl-6">
                        {section.points.map((point) => (
                          <li key={point} className="text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </Reveal>
              ))}

              <Reveal>
                <section aria-labelledby="results-heading" className="mt-16 rounded-panel border border-wire bg-ink-raised p-6 sm:p-8">
                  <h2 id="results-heading" className="eyebrow text-signal-dim">
                    Results
                  </h2>
                  <ul className="mt-5 space-y-4">
                    {caseStudy.results.map((result) => (
                      <li key={result} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-ivory text-pretty">
                        <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-signal" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            </div>
          </div>

          {/* Next case study */}
          <nav aria-label="More work" className="hairline">
            <div className="shell py-14">
              <p className="eyebrow mb-5">Next case study</p>
              <Link href={`/work/${next.slug}`} className="group inline-flex items-center gap-4">
                <span className="text-display-sm font-display font-semibold transition-colors group-hover:text-signal">
                  {next.title}
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-ivory-faint transition-all duration-300 ease-system group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </nav>
        </article>
      </main>

      <SiteFooter />
    </>
  )
}
