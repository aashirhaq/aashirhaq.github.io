import { cn } from "@/lib/utils"

interface MetricProps {
  value: string
  label: string
  note?: string
  size?: "md" | "lg"
  className?: string
}

/**
 * A single measured result. Value in mono so digits align across a row;
 * label in the body face so it never competes with the number.
 */
export function Metric({ value, label, note, size = "md", className }: MetricProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "font-mono font-medium tabular-nums text-signal",
          size === "lg" ? "text-[clamp(1.5rem,3vw,2rem)]" : "text-[1.375rem]",
        )}
      >
        {value}
      </div>
      <div className="mt-1.5 text-[0.8125rem] leading-snug text-ivory-muted">{label}</div>
      {note && <div className="mt-0.5 text-xs text-ivory-faint">{note}</div>}
    </div>
  )
}

interface MetricRowProps {
  metrics: ReadonlyArray<{ value: string; label: string; note?: string }>
  size?: "md" | "lg"
  className?: string
}

export function MetricRow({ metrics, size = "md", className }: MetricRowProps) {
  if (metrics.length === 0) return null

  return (
    <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4", className)}>
      {metrics.map((m) => (
        <div key={m.label} className="min-w-0">
          <dt className="sr-only">{m.label}</dt>
          <dd>
            <Metric value={m.value} label={m.label} note={m.note} size={size} />
          </dd>
        </div>
      ))}
    </dl>
  )
}
