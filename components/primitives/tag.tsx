import { cn } from "@/lib/utils"

interface TagProps {
  children: string
  className?: string
  /** Emphasised tags read as the primary technology in a group. */
  accent?: boolean
}

export function Tag({ children, className, accent }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-2 py-1 font-mono text-[0.6875rem] leading-none",
        accent
          ? "border-signal-dim/50 bg-signal/[0.07] text-signal"
          : "border-wire bg-ink-panel text-ivory-muted",
        className,
      )}
    >
      {children}
    </span>
  )
}

interface TagListProps {
  items: readonly string[]
  className?: string
  /** Cap the visible tags and summarise the rest. */
  limit?: number
  label?: string
}

export function TagList({ items, className, limit, label }: TagListProps) {
  const shown = limit ? items.slice(0, limit) : items
  const hidden = limit ? items.length - shown.length : 0

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label={label ?? "Technologies"}>
      {shown.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
      {hidden > 0 && (
        <li>
          <Tag className="border-dashed">{`+${hidden}`}</Tag>
        </li>
      )}
    </ul>
  )
}
