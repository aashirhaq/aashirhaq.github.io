"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Nudges foreground HUD elements by at most `strength` px toward the pointer.
 * Desktop fine-pointer only; disabled for touch and reduced motion. Only
 * transforms are touched, never the video.
 */
export function PointerParallax({
  children,
  strength = 5,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const capable = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    if (!capable.matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2;
        const y = (event.clientY / window.innerHeight - 0.5) * 2;
        el.style.setProperty("--px", (x * strength).toFixed(2));
        el.style.setProperty("--py", (y * strength).toFixed(2));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`parallax ${className ?? ""}`}>
      {children}
    </div>
  );
}
