"use client"

import { useState } from "react"
import { stackDomains, stackRelations } from "@/content/stack"

/*
 * A service map of the engineering domains rather than a badge wall. Positions
 * are hand-placed so related domains sit near each other; edges are real
 * relationships from the systems described elsewhere on this page.
 *
 * This is progressive enhancement only — the accessible list below it carries
 * every skill, so nothing is lost when this is not rendered.
 */

const POSITIONS: Record<string, [number, number]> = {
  backend: [248, 178],
  data: [110, 108],
  search: [118, 252],
  messaging: [382, 106],
  cloud: [392, 258],
  payments: [248, 316],
  observability: [466, 182],
  ai: [248, 40],
}

const R = 6

export function StackMap({ activeId, onHover }: { activeId: string | null; onHover: (id: string | null) => void }) {
  const [focused, setFocused] = useState<string | null>(null)
  const current = activeId ?? focused

  const isLit = (id: string) =>
    !current ||
    current === id ||
    stackRelations.some(([a, b]) => (a === current && b === id) || (b === current && a === id))

  return (
    <svg
      viewBox="0 0 530 356"
      className="h-auto w-full"
      role="img"
      aria-label="Map of engineering domains and how they relate. The full list of technologies follows."
    >
      <g>
        {stackRelations.map(([a, b]) => {
          const pa = POSITIONS[a]
          const pb = POSITIONS[b]
          if (!pa || !pb) return null
          const lit = current !== null && (current === a || current === b)
          return (
            <line
              key={`${a}-${b}`}
              x1={pa[0]}
              y1={pa[1]}
              x2={pb[0]}
              y2={pb[1]}
              stroke={lit ? "#E9B872" : "#2A2F36"}
              strokeWidth={lit ? 1.4 : 1}
              opacity={current && !lit ? 0.3 : 1}
              className="transition-all duration-300 ease-system"
            />
          )
        })}
      </g>

      <g>
        {stackDomains.map((domain) => {
          const pos = POSITIONS[domain.id]
          if (!pos) return null
          const [cx, cy] = pos
          const active = current === domain.id
          const lit = isLit(domain.id)

          return (
            <g
              key={domain.id}
              className="cursor-default transition-opacity duration-300 ease-system focus:outline-none"
              opacity={lit ? 1 : 0.32}
              tabIndex={0}
              role="button"
              aria-label={`${domain.name}. ${domain.summary}`}
              onMouseEnter={() => onHover(domain.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => {
                setFocused(domain.id)
                onHover(domain.id)
              }}
              onBlur={() => {
                setFocused(null)
                onHover(null)
              }}
            >
              {active && <circle cx={cx} cy={cy} r={R + 8} fill="#E9B872" opacity={0.12} />}
              <circle
                cx={cx}
                cy={cy}
                r={R}
                fill={active ? "#E9B872" : "#111316"}
                stroke={active ? "#E9B872" : "#3D444D"}
                strokeWidth={1.5}
                className="transition-all duration-300 ease-system"
              />
              <text
                x={cx}
                y={cy - 15}
                textAnchor="middle"
                fontSize={13.5}
                fontWeight={500}
                className={active ? "fill-[#F5CE97]" : "fill-[#EDEDEA]"}
              >
                {domain.short ?? domain.name}
              </text>
              <text x={cx} y={cy + 23} textAnchor="middle" fontSize={10.5} className="fill-[#80858D] font-mono">
                {domain.items.length} technologies
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
