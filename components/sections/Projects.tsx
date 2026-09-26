import Link from "next/link";
import { compactProjects, flagshipProjects } from "@/content/projects";
import { Section } from "@/components/layout/Section";
import { ArrowIcon, ExternalLink, MetricList, SectionHeading, TagList, cx } from "@/components/ui/primitives";

export function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" tone="deep">
      <SectionHeading
        index="03"
        label="Projects"
        title={<span id="projects-title">Systems in production</span>}
        intro="Flagship systems with full case studies, followed by the supporting modules around them."
      />

      <ol className="grid gap-5 lg:grid-cols-2">
        {flagshipProjects.map((project, i) => {
          // First card is full width; the rest pair up in halves. If they can't
          // pair evenly, the last one goes full width so the grid never leaves a hole.
          const halves = flagshipProjects.length - 1;
          const wide = i === 0 || (halves % 2 === 1 && i === flagshipProjects.length - 1);
          return (
          <li key={project.slug} className={cx("panel module-card group flex flex-col p-6 sm:p-8", wide && "lg:col-span-2")}>
            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase">
              <span>
                <span className="text-cyan/80">SYS-0{i + 1}</span> <span aria-hidden="true">·</span> {project.context}
              </span>
              <span className="tabular-nums">{project.period}</span>
            </div>

            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-balance text-ink sm:text-[1.7rem]">
              <Link
                href={`/projects/${project.slug}/`}
                className="rounded-sm after:absolute after:inset-0 after:rounded-[14px] after:content-['']"
              >
                {project.name}
              </Link>
            </h3>

            <p className={cx("mt-4 leading-relaxed text-pretty text-ink-2", wide && "max-w-3xl")}>{project.summary}</p>

            <MetricList
              metrics={project.metrics}
              className={cx(
                "mt-7 grid-cols-2 border-t border-line pt-6",
                wide ? "sm:grid-cols-4" : "sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4",
              )}
            />

            <TagList items={project.stack.slice(0, wide ? 11 : 6)} label={`${project.name} technologies`} className="mt-7" />

            <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors group-hover:text-cyan">
                Read case study
                <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              {project.links?.map((link) => (
                <ExternalLink
                  key={link.href}
                  href={link.href}
                  className="relative z-[1] inline-flex min-h-11 items-center gap-2 text-sm text-ink-2 underline-offset-4 hover:text-ink hover:underline"
                >
                  {link.label}
                  <ArrowIcon direction="up-right" />
                </ExternalLink>
              ))}
            </div>
          </li>
          );
        })}
      </ol>

      <div className="mt-20 mb-8 flex items-center gap-4">
        <h3 className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase">Supporting modules</h3>
        <span className="hairline h-px flex-1" aria-hidden="true" />
      </div>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {compactProjects.map((project) => (
          <li key={project.slug} className="panel module-card flex flex-col p-6">
            <p className="font-mono text-[11px] tracking-[0.16em] text-ink-3 uppercase">
              {project.context} <span aria-hidden="true">·</span> <span className="tabular-nums">{project.period}</span>
            </p>
            <h4 className="mt-3 text-lg font-semibold tracking-tight text-ink">{project.name}</h4>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{project.summary}</p>
            <ul className="mt-4 space-y-2">
              {project.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                  <span aria-hidden="true" className="mt-[0.65em] h-px w-2.5 flex-none bg-cyan/50" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            {project.metrics && (
              <MetricList metrics={project.metrics} size="sm" className="mt-5 grid-cols-2 border-t border-line pt-4" />
            )}
            <TagList items={project.stack} label={`${project.name} technologies`} className="mt-5" />
            {project.links && (
              <div className="mt-auto pt-5">
                {project.links.map((link) => (
                  <ExternalLink
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-11 items-center gap-2 text-sm text-ink underline-offset-4 hover:text-cyan hover:underline"
                  >
                    {link.label}
                    <ArrowIcon direction="up-right" />
                  </ExternalLink>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}
