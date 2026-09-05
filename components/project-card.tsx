"use client"

import Link from "next/link"
import { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/content/types"
import { TagList } from "@/components/primitives/tag"
import { useMediaQuery } from "@/lib/environment"

/**
 * Faint circuitry behind the card content. Drawn from the project's own
 * diagram shape where it has one, so no two cards look identical.
 */
function CardCircuitry({ project }: { project: Project }) {
  const nodes = project.caseStudy?.diagram?.nodes ?? []
  const edges = project.caseStudy?.diagram?.edges ?? []
  const byId = new Map(nodes.map((n) => [n.id, n]))

  if (nodes.length === 0) {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 200" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M40 150 L120 110 L210 130 L300 80 L370 110" />
          <path d="M120 110 L140 50 L240 40 L300 80" />
        </g>
        <g fill="currentColor">
          {[
            [40, 150],
            [120, 110],
            [140, 50],
            [210, 130],
            [240, 40],
            [300, 80],
            [370, 110],
          ].map(([cx, cy]) => (
            <circle key={cx} cx={cx} cy={cy} r="2.5" />
          ))}
        </g>
      </svg>
    )
  }

  const px = (col: number) => 34 + col * 84
  const py = (row: number) => 40 + row * 62

  return (
    <svg className="h-full w-full" viewBox="0 0 400 200" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {edges.map((e) => {
          const from = byId.get(e.from)
          const to = byId.get(e.to)
          if (!from || !to) return null
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={px(from.col)}
              y1={py(from.row)}
              x2={px(to.col)}
              y2={py(to.row)}
              strokeDasharray={e.async ? "3 4" : undefined}
            />
          )
        })}
      </g>
      <g fill="currentColor">
        {nodes.map((n) => (
          <circle key={n.id} cx={px(n.col)} cy={py(n.row)} r="2.5" />
        ))}
      </g>
    </svg>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)")
  const interactive = finePointer && !reduced

  // Tilt is kept to a few degrees — enough to register as depth, not enough to
  // turn a card of text into a moving target.
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(233,184,114,0.07), transparent 65%)`

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!interactive || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 6)
    rotateX.set((0.5 - py) * 5)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  function reset() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={{ perspective: interactive ? 1200 : undefined }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
        style={interactive ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="group relative h-full overflow-hidden rounded-panel border border-wire bg-ink-raised transition-colors duration-300 ease-system hover:border-wire-bright"
      >
        {/* Circuitry backdrop, lifted slightly on hover. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-44 text-wire opacity-70 transition-opacity duration-500 ease-system group-hover:opacity-100"
        >
          <CardCircuitry project={project} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-raised/70 to-ink-raised" />
        </div>

        {/* Cursor-tracked lighting. */}
        {interactive && (
          <motion.div
            aria-hidden="true"
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        <div className="relative flex h-full flex-col p-6 sm:p-7">
          <div className="flex items-center justify-between gap-4 font-mono text-[0.6875rem] text-ivory-faint">
            <span>
              {project.org ? `${project.org} · ` : ""}
              {project.period}
            </span>
            <span className="text-ivory-faint">{project.role}</span>
          </div>

          <h3 className="mt-5 text-[1.375rem] font-display font-semibold leading-tight">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          </h3>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">{project.tagline}</p>

          {project.metrics.length > 0 && (
            <dl className="mt-7 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-wire pt-6">
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <div className="font-mono text-[1.0625rem] tabular-nums text-signal">{m.value}</div>
                    <div className="mt-1 text-xs leading-snug text-ivory-faint">{m.label}</div>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <TagList items={project.technologies} className="mt-7" limit={6} />

          <div className="mt-7 flex items-center gap-2 pt-1 text-[0.8125rem] font-medium text-signal">
            Read the case study
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-system group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
