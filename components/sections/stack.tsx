"use client"

import { useState } from "react"
import { stackDomains } from "@/content/stack"
import { Section } from "@/components/primitives/section"
import { Reveal } from "@/components/primitives/reveal"
import { Tag } from "@/components/primitives/tag"
import { StackMap } from "@/components/system/stack-map"
import { cn } from "@/lib/utils"

export function Stack() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <Section
      id="stack"
      eyebrow="03 / Engineering stack"
      title="Grouped by the problem it solves"
      intro="A list of logos says very little. These are the domains I have shipped production systems in, and how they connect to each other."
      blueprint
    >
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        {/*
          The map is decoration over the list, not a replacement for it. Hidden
          below the large breakpoint, where it would be cramped and unusable by
          touch.
        */}
        <Reveal className="hidden lg:block lg:sticky lg:top-24">
          <div className="rounded-panel border border-wire bg-ink-raised/60 p-4">
            <StackMap activeId={active} onHover={setActive} />
          </div>
          <p className="mt-4 text-[0.8125rem] leading-relaxed text-ivory-faint">
            Hover a domain — here or in the list — to see what it connects to.
          </p>
        </Reveal>

        <ul className="divide-y divide-wire border-y border-wire">
          {stackDomains.map((domain, i) => (
            <Reveal key={domain.id} index={i} as="li">
              <div
                onMouseEnter={() => setActive(domain.id)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "-mx-4 rounded px-4 py-7 transition-colors duration-300 ease-system",
                  active === domain.id && "bg-ink-raised",
                )}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-medium">{domain.name}</h3>
                  <span className="font-mono text-[0.6875rem] text-ivory-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 max-w-prose text-[0.9375rem] leading-relaxed text-ivory-muted text-pretty">
                  {domain.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {domain.items.map((item, index) => (
                    <li key={item}>
                      <Tag accent={index === 0}>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  )
}
