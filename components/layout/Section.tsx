import type { ReactNode } from "react";
import { cx } from "@/components/ui/primitives";

/**
 * Every section sits inside the same holographic environment; sections vary
 * only their local lighting (`tone`) so the world stays continuous.
 */
export function Section({
  id,
  labelledBy,
  tone = "default",
  children,
  className,
}: {
  id: string;
  labelledBy: string;
  tone?: "default" | "deep" | "lit";
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cx("relative py-24 md:py-32", className)}>
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute inset-0",
          tone === "deep" && "bg-[linear-gradient(180deg,transparent,rgb(3_6_13/0.55)_18%,rgb(3_6_13/0.55)_82%,transparent)]",
          tone === "lit" &&
            "bg-[radial-gradient(60%_50%_at_50%_0%,rgb(59_130_255/0.10),transparent_70%)]",
        )}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">{children}</div>
    </section>
  );
}
