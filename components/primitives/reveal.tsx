"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Stagger index — multiplies the base delay. Keep small; long chains feel slow. */
  index?: number
  as?: "div" | "li" | "article" | "section"
}

/**
 * The site's single scroll-reveal. One direction, one distance, one curve —
 * deliberately restrained so it reads as material settling rather than as
 * decoration. Disabled entirely under prefers-reduced-motion.
 */
export function Reveal({ children, className, index = 0, as = "div" }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index, 5) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  )
}
