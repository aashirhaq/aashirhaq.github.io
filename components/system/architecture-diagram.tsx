"use client"

import { motion, useReducedMotion } from "framer-motion"
import { useId } from "react"
import type { Diagram, DiagramEdge, DiagramNode, NodeKind } from "@/content/types"
import { cn } from "@/lib/utils"

/* Grid geometry. All values are SVG user units; the viewBox scales to fit. */
const COL = 208
const ROW = 104
const W = 172
const H = 58
const PAD = 14

/**
 * Three visual registers, deliberately no more: structure (neutral), things
 * that move data (accent), and things outside the boundary (faint).
 */
const REGISTER: Record<NodeKind, "structure" | "moving" | "outside"> = {
  client: "outside",
  edge: "moving",
  service: "structure",
  store: "structure",
  cache: "moving",
  queue: "moving",
  external: "outside",
  observability: "outside",
}

const KIND_LABEL: Record<NodeKind, string> = {
  client: "client",
  edge: "edge",
  service: "service",
  store: "store",
  cache: "cache",
  queue: "queue",
  external: "external",
  observability: "observability",
}

function x(node: DiagramNode) {
  return PAD + node.col * COL
}

function y(node: DiagramNode) {
  return PAD + node.row * ROW
}

/** Anchor points chosen from the relative position of the two nodes. */
function edgePath(from: DiagramNode, to: DiagramNode) {
  const fx = x(from)
  const fy = y(from) + H / 2
  const tx = x(to)
  const ty = y(to) + H / 2

  if (to.col > from.col) {
    const sx = fx + W
    const ex = tx
    const c = Math.max(28, (ex - sx) * 0.5)
    return `M ${sx} ${fy} C ${sx + c} ${fy}, ${ex - c} ${ty}, ${ex} ${ty}`
  }

  if (to.col < from.col) {
    const sx = fx
    const ex = tx + W
    const c = Math.max(28, (sx - ex) * 0.5)
    return `M ${sx} ${fy} C ${sx - c} ${fy}, ${ex + c} ${ty}, ${ex} ${ty}`
  }

  // Same column: a straight vertical between the plate edges. Routing around
  // the outside would leave the viewBox for a node in the last column.
  const cx = fx + W / 2
  const down = to.row > from.row
  const sy = down ? y(from) + H : y(from)
  const ey = down ? y(to) : y(to) + H
  return `M ${cx} ${sy} L ${cx} ${ey}`
}

interface Props {
  diagram: Diagram
  className?: string
  /** Compact rendering for inline use inside a card. */
  compact?: boolean
}

export function ArchitectureDiagram({ diagram, className, compact }: Props) {
  const reduced = useReducedMotion()
  const uid = useId().replace(/:/g, "")
  const captionId = `${uid}-caption`
  const arrowId = `${uid}-arrow`
  const arrowFlowId = `${uid}-arrow-flow`

  const byId = new Map(diagram.nodes.map((n) => [n.id, n]))
  const width = PAD * 2 + (diagram.cols - 1) * COL + W
  const height = PAD * 2 + (diagram.rows - 1) * ROW + H

  const resolved = diagram.edges
    .map((e) => ({ edge: e, from: byId.get(e.from), to: byId.get(e.to) }))
    .filter((e): e is { edge: DiagramEdge; from: DiagramNode; to: DiagramNode } => Boolean(e.from && e.to))

  return (
    <figure className={cn("not-prose", className)}>
      {/*
        The diagram scrolls horizontally on narrow screens rather than shrinking
        text below legibility. The page itself never scrolls sideways.
      */}
      <div className="-mx-[var(--shell-gutter)] overflow-x-auto px-[var(--shell-gutter)] sm:mx-0 sm:px-0">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby={captionId}
          className={cn("h-auto w-full", compact ? "min-w-[560px]" : "min-w-[680px]")}
          style={{ maxWidth: width }}
        >
          <defs>
            {/* Direction matters in a system diagram; every edge gets a head. */}
            <marker id={arrowId} viewBox="0 0 8 8" refX={7} refY={4} markerWidth={5} markerHeight={5} orient="auto-start-reverse">
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#4A525C" />
            </marker>
            <marker
              id={arrowFlowId}
              viewBox="0 0 8 8"
              refX={7}
              refY={4}
              markerWidth={5}
              markerHeight={5}
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="#8A6D3C" />
            </marker>
          </defs>

          {/* Edges sit beneath the node plates. */}
          <g fill="none">
            {resolved.map(({ edge, from, to }, i) => {
              const d = edgePath(from, to)
              const key = `${edge.from}-${edge.to}`
              return (
                <g key={key}>
                  <motion.path
                    d={d}
                    stroke={edge.async ? "#2A2F36" : "#3D444D"}
                    strokeWidth={1.25}
                    strokeDasharray={edge.async ? "4 5" : undefined}
                    markerEnd={`url(#${edge.flow ? arrowFlowId : arrowId})`}
                    initial={reduced ? undefined : { pathLength: 0, opacity: 0 }}
                    whileInView={reduced ? undefined : { pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-48px" }}
                    transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Data in motion is the only warm element in the diagram. */}
                  {edge.flow && (
                    <path
                      d={d}
                      stroke="#E9B872"
                      strokeWidth={2}
                      strokeLinecap="round"
                      className="flow-dash"
                      style={{ animationDelay: `${(i % 5) * 0.4}s` }}
                      opacity={0.85}
                    />
                  )}
                  {edge.label && (
                    <text
                      x={(x(from) + W + x(to)) / 2}
                      y={(y(from) + y(to)) / 2 + H / 2 - 8}
                      textAnchor="middle"
                      className="fill-[#80858D] font-mono"
                      fontSize={9}
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              )
            })}
          </g>

          {/* Node plates. */}
          <g>
            {diagram.nodes.map((node, i) => {
              const register = REGISTER[node.kind]
              const accent =
                register === "moving" ? "#E9B872" : register === "outside" ? "#3D444D" : "#6B7480"
              return (
                <motion.g
                  key={node.id}
                  initial={reduced ? undefined : { opacity: 0, y: 6 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-48px" }}
                  transition={{ duration: 0.45, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                >
                  <rect
                    x={x(node)}
                    y={y(node)}
                    width={W}
                    height={H}
                    rx={5}
                    fill="#111316"
                    stroke={register === "outside" ? "#2A2F36" : "#343A42"}
                    strokeWidth={1}
                    strokeDasharray={node.kind === "external" ? "4 4" : undefined}
                  />
                  {/* Left accent bar encodes the register. */}
                  <rect x={x(node)} y={y(node) + 1} width={2.5} height={H - 2} rx={1.25} fill={accent} />
                  <text
                    x={x(node) + 14}
                    y={y(node) + (node.note ? 22 : 27)}
                    className="fill-[#EDEDEA]"
                    fontSize={12.5}
                    fontWeight={500}
                  >
                    {node.label}
                  </text>
                  {node.note && (
                    <text x={x(node) + 14} y={y(node) + 37} className="fill-[#9A9EA3] font-mono" fontSize={9.5}>
                      {node.note}
                    </text>
                  )}
                  <text
                    x={x(node) + W - 10}
                    y={y(node) + H - 8}
                    textAnchor="end"
                    className="fill-[#6A7079] font-mono"
                    fontSize={7.5}
                    letterSpacing="0.1em"
                  >
                    {KIND_LABEL[node.kind]}
                  </text>
                </motion.g>
              )
            })}
          </g>
        </svg>
      </div>

      <figcaption id={captionId} className="mt-5 max-w-prose text-[0.8125rem] leading-relaxed text-ivory-faint">
        {diagram.caption}
      </figcaption>
    </figure>
  )
}
