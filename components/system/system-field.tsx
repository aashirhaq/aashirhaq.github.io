"use client"

import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { usePageVisible, useSceneEnabled } from "@/lib/environment"

/*
 * The 3D scene is code-split and only requested once we know the device can
 * use it, so three.js never lands in the initial bundle for a phone, a
 * reduced-motion visitor, or a browser without WebGL.
 */
const SystemFieldScene = dynamic(() => import("./system-field-scene"), {
  ssr: false,
  loading: () => null,
})

/**
 * Static fallback: the same idea as the 3D field, drawn once in SVG. Shown on
 * mobile, under reduced motion, and when WebGL is unavailable. It is not a
 * blank space — the hero looks composed either way.
 */
function StaticField() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#59626E" strokeWidth="1" opacity="0.45" fill="none">
        <path d="M120 480 L300 380 L520 430 L740 320 L960 400 L1120 300" />
        <path d="M180 220 L360 300 L520 430 L700 470 L900 380 L1080 460" />
        <path d="M300 380 L360 300 M520 430 L560 200 M740 320 L700 470 M960 400 L900 380" />
        <path d="M560 200 L780 160 L1000 230 L1120 300" />
      </g>
      <g fill="#59626E" opacity="0.8">
        {[
          [120, 480],
          [300, 380],
          [360, 300],
          [520, 430],
          [560, 200],
          [700, 470],
          [740, 320],
          [780, 160],
          [900, 380],
          [960, 400],
          [1000, 230],
          [1080, 460],
          [1120, 300],
          [180, 220],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" />
        ))}
      </g>
      <g fill="#E9B872" opacity="0.9">
        {[
          [430, 405],
          [640, 375],
          [860, 390],
          [455, 260],
        ].map(([cx, cy]) => (
          <circle key={`p-${cx}`} cx={cx} cy={cy} r="2.5" />
        ))}
      </g>
    </svg>
  )
}

export function SystemField() {
  const enabled = useSceneEnabled()
  const pageVisible = usePageVisible()
  const [inView, setInView] = useState(true)
  const hostRef = useRef<HTMLDivElement>(null)

  // Stop rendering entirely once the hero scrolls away. There is no reason to
  // burn a GPU on a scene nobody can see.
  useEffect(() => {
    const host = hostRef.current
    if (!host || !enabled) return

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0,
    })
    observer.observe(host)
    return () => observer.disconnect()
  }, [enabled])

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0">
        {enabled ? <SystemFieldScene paused={!inView || !pageVisible} /> : <StaticField />}
      </div>

      {/*
        Legibility scrim. The hero copy must clear WCAG contrast over whatever
        the scene happens to be doing behind it.
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/10" />
      {/* Narrow viewports have no room for the gradient to fall off, so flatten it. */}
      <div className="absolute inset-0 bg-ink/60 md:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
