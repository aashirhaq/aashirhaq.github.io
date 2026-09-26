import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { flagshipProjects, getFlagship } from "@/content/projects";
import { ProjectViewTracker } from "@/components/projects/ProjectViewTracker";
import { ArrowIcon, Eyebrow, ExternalLink, MetricList, Panel, TagList, buttonStyles } from "@/components/ui/primitives";

export const dynamicParams = false;

export function generateStaticParams() {
  return flagshipProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getFlagship(slug);
  if (!project) return {};
  const path = `/projects/${project.slug}/`;
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: path },
    openGraph: { title: project.name, description: project.summary, url: path, type: "article", images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: project.name, description: project.summary, images: ["/og.png"] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getFlagship(slug);
  if (!project) notFound();

  const index = flagshipProjects.findIndex((p) => p.slug === project.slug);
  const next = flagshipProjects[(index + 1) % flagshipProjects.length]!;

  return (
    <article id="top" className="relative pt-28 pb-24 md:pt-36">
      <ProjectViewTracker slug={project.slug} />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <nav aria-label="Breadcrumb" data-reveal>
          <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 transition-colors hover:text-ink">
            <ArrowIcon direction="left" />
            All projects
          </Link>
        </nav>

        <header className="mt-8" data-reveal style={{ "--reveal-step": 1 } as React.CSSProperties}>
          <Eyebrow>
            SYS-0{index + 1} <span className="text-ink-3">·</span> {project.context}{" "}
            <span className="text-ink-3">·</span> {project.period}
          </Eyebrow>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-balance text-ink text-glow sm:text-5xl md:text-6xl">
            {project.name}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-pretty text-ink-2">{project.summary}</p>
          <p className="mt-5 font-mono text-xs tracking-wide text-ink-3">
            <span className="text-cyan/80">ROLE</span> — {project.role}
          </p>
          {project.links && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <ExternalLink key={link.href} href={link.href} className={buttonStyles.secondary}>
                  {link.label}
                  <ArrowIcon direction="up-right" />
                </ExternalLink>
              ))}
            </div>
          )}
        </header>

        <Panel className="hud-corners mt-12 p-6 sm:p-8" data-reveal style={{ "--reveal-step": 2 } as React.CSSProperties}>
          <MetricList metrics={project.metrics} size="lg" className="grid-cols-2 md:grid-cols-4" />
        </Panel>

        {project.modules && (
          <section aria-labelledby="modules-title" className="mt-16">
            <h2 id="modules-title" className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase">
              Sub-systems
            </h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.modules.map((m, i) => (
                <li key={m.name} className="panel module-card p-6">
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-3">
                    <span>MOD-0{i + 1}</span>
                    {m.metric && <span className="text-cyan/90">{m.metric}</span>}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{m.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{m.description}</p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="mt-16 space-y-5">
          {project.sections.map((section) => (
            <section key={section.heading} className="panel grid gap-4 p-6 sm:p-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
              <h2 className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase md:pt-1.5">{section.heading}</h2>
              <div>
                {section.body && <p className="leading-relaxed text-pretty text-ink">{section.body}</p>}
                {section.points && (
                  <ul className="space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3 leading-relaxed text-ink-2">
                        <span aria-hidden="true" className="mt-[0.75em] h-px w-3 flex-none bg-cyan/50" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}

          <section className="panel grid gap-4 p-6 sm:p-8 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-10">
            <h2 className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase md:pt-1.5">Technology</h2>
            <TagList items={project.stack} label={`${project.name} technologies`} />
          </section>
        </div>

        <nav aria-label="Next project" className="mt-16 border-t border-line pt-8">
          <Link
            href={`/projects/${next.slug}/`}
            className="group flex flex-col gap-2 rounded-lg py-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="font-mono text-[11px] tracking-[0.24em] text-ink-3 uppercase">Next system</span>
            <span className="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-ink transition-colors group-hover:text-cyan sm:text-2xl">
              {next.name}
              <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
