"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useId, useState } from "react"
import type { Experience } from "@/content/types"
import { MetricRow } from "@/components/primitives/metric"
import { Reveal } from "@/components/primitives/reveal"
import { TagList } from "@/components/primitives/tag"
import { ArchitectureDiagram } from "@/components/system/architecture-diagram"

/** The five stages, in the order an engineer would actually tell the story. */
const STAGES = [
  { key: "problem", label: "Problem" },
  { key: "scale", label: "Scale" },
  { key: "system", label: "System" },
  { key: "contribution", label: "My contribution" },
  { key: "result", label: "Result" },
] as const

export function ExperienceStory({ experience }: { experience: Experience }) {
  const [open, setOpen] = useState(true)
  const reduced = useReducedMotion()
  const panelId = `${useId().replace(/:/g, "")}-architecture`

  return (
    <Reveal as="article">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,17rem)_1fr] lg:gap-16">
        {/* Role identity. Sticks alongside the story on wide screens. */}
        <header className="lg:sticky lg:top-24 lg:self-start">
          <div className="font-mono text-[0.6875rem] text-signal">{experience.period}</div>
          <h3 className="mt-3 text-[1.625rem] font-display font-semibold leading-tight">{experience.company}</h3>
          {experience.entity && <div className="mt-1 text-[0.8125rem] text-ivory-faint">{experience.entity}</div>}
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">{experience.context}</p>

          <ul className="mt-6 space-y-2.5 border-t border-wire pt-5">
            {experience.roles.map((role) => (
              <li key={role.title} className="text-[0.875rem]">
                <span className="text-ivory">{role.title}</span>
                <span className="mt-0.5 block font-mono text-[0.6875rem] text-ivory-faint">{role.period}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 font-mono text-[0.6875rem] text-ivory-faint">{experience.location}</div>
        </header>

        <div className="min-w-0">
          {/*
            The stage rail. Each stage is a node on a vertical line — the story
            reads as a pipeline, which is what it is.
          */}
          <ol className="relative space-y-8 border-l border-wire pl-7 sm:pl-8">
            {STAGES.map((stage) => (
              <li key={stage.key} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[calc(1.75rem+3.5px)] top-[0.4rem] h-[7px] w-[7px] rounded-full border border-signal-dim bg-ink sm:-left-[calc(2rem+3.5px)]"
                />
                <h4 className="eyebrow text-signal-dim">{stage.label}</h4>
                <p className="mt-2.5 max-w-prose text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                  {experience.story[stage.key]}
                </p>
              </li>
            ))}
          </ol>

          {experience.metrics.length > 0 && (
            <MetricRow metrics={experience.metrics} className="mt-10 border-t border-wire pt-8" />
          )}

          <TagList items={experience.technologies} className="mt-8" label={`Technologies at ${experience.company}`} />

          {experience.diagram && (
            <div className="mt-10 overflow-hidden rounded-panel border border-wire bg-ink-raised">
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ink-panel"
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-[0.875rem] font-medium">Architecture</span>
                  <span className="font-mono text-[0.6875rem] text-ivory-faint">
                    {experience.diagram.nodes.length} components · {experience.diagram.edges.length} paths
                  </span>
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-ivory-faint transition-transform duration-300 ease-system ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={panelId}
                    key="panel"
                    initial={reduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduced ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-wire px-5 py-7">
                      <ArchitectureDiagram diagram={experience.diagram} compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  )
}
