"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * A single ~560ms holographic scan line on route changes. Purely decorative:
 * it never delays navigation, and it is hidden under prefers-reduced-motion.
 */
export function RouteSweep() {
  const pathname = usePathname();
  const [previous, setPrevious] = useState(pathname);
  const [count, setCount] = useState(0);

  if (pathname !== previous) {
    setPrevious(pathname);
    setCount((c) => c + 1);
  }

  return count > 0 ? <div key={count} className="holo-sweep" aria-hidden="true" /> : null;
}
