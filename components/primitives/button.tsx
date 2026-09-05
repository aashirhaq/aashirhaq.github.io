import Link from "next/link"
import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost"
type Size = "md" | "sm"

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-colors duration-200 ease-system disabled:pointer-events-none disabled:opacity-50"

const variants: Record<Variant, string> = {
  primary: "bg-signal text-ink hover:bg-signal-bright",
  secondary: "border border-wire-bright bg-ink-panel text-ivory hover:border-signal-dim hover:text-signal-bright",
  ghost: "text-ivory-muted hover:text-ivory",
}

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-3.5 text-[0.8125rem]",
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}

interface ButtonLinkProps extends CommonProps, Omit<ComponentPropsWithoutRef<"a">, "children" | "className"> {
  href: string
  /** Set for downloads and external destinations; internal routes use next/link. */
  external?: boolean
}

export function ButtonLink({
  href,
  external,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(props.target === "_blank" ? { rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  )
}
