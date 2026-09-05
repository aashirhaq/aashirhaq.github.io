import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id: string
  /** Mono eyebrow label, e.g. "02 / Experience". */
  eyebrow?: string
  title?: string
  /** Short standfirst under the title. Keep to one or two lines. */
  intro?: string
  children: ReactNode
  className?: string
  /** Draw the faint blueprint grid behind this band. */
  blueprint?: boolean
  /** Draw a hairline rule at the top of the band. */
  divided?: boolean
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
  blueprint,
  divided = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn("relative py-section", divided && "hairline", blueprint && "blueprint", className)}
    >
      <div className="shell">
        {(eyebrow || title || intro) && (
          <header className="mb-14 max-w-prose sm:mb-16">
            {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
            {title && (
              <h2 id={`${id}-heading`} className="text-display-md font-display font-semibold text-balance">
                {title}
              </h2>
            )}
            {intro && <p className="mt-5 text-[1.0625rem] leading-relaxed text-ivory-muted text-pretty">{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
