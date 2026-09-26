import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { Metric } from "@/content/types";

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export { cx };

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase", className)}>{children}</p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}) {
  return (
    <header className="mb-12 max-w-3xl md:mb-16">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase">
          {index} <span className="text-ink-3">/</span> {label}
        </span>
        <span className="hairline h-px w-24 flex-none sm:w-40" aria-hidden="true" />
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-balance text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-base leading-relaxed text-pretty text-ink-2 md:text-lg">{intro}</p>}
    </header>
  );
}

export function Panel({ className, children, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cx("panel", className)} {...rest}>
      {children}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <li className="rounded-md border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] leading-none tracking-wide text-ink-2">
      {children}
    </li>
  );
}

export function TagList({ items, label, className }: { items: readonly string[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-1.5", className)}>
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}

export function MetricList({
  metrics,
  className,
  size = "md",
}: {
  metrics: readonly Metric[];
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const valueSize = { sm: "text-lg", md: "text-2xl", lg: "text-3xl md:text-4xl" }[size];
  return (
    <dl className={cx("grid gap-x-6 gap-y-5", className)}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col-reverse justify-end gap-1">
          <dt className="text-xs leading-snug text-ink-3">{m.label}</dt>
          <dd className={cx("font-mono font-medium tracking-tight text-ink tabular-nums", valueSize)}>{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ArrowIcon({ className, direction = "right" }: { className?: string; direction?: "right" | "up-right" | "down" | "left" }) {
  const rotate = { right: "", "up-right": "-rotate-45", down: "rotate-90", left: "rotate-180" }[direction];
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cx("h-4 w-4", rotate, className)}>
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-out-expo active:translate-y-px";

export const buttonStyles = {
  primary: cx(
    buttonBase,
    "bg-ink text-bg shadow-[0_0_0_1px_rgb(255_255_255/0.2),0_8px_30px_-8px_rgb(94_225_255/0.45)] hover:bg-white hover:shadow-[0_0_0_1px_rgb(255_255_255/0.4),0_10px_40px_-6px_rgb(94_225_255/0.6)]",
  ),
  secondary: cx(
    buttonBase,
    "border border-line-strong bg-white/[0.04] text-ink backdrop-blur-md hover:border-cyan/60 hover:bg-cyan/[0.08]",
  ),
  ghost: cx(buttonBase, "px-3 text-ink-2 hover:text-ink"),
};

export function ExternalLink({ href, children, className, ...rest }: ComponentPropsWithoutRef<"a">) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
