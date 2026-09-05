"use client"

import { useEffect, useState } from "react"

/** One-off WebGL capability probe. Cached — creating contexts is not free. */
let webglSupport: boolean | null = null

export function detectWebGL(): boolean {
  if (webglSupport !== null) return webglSupport
  if (typeof window === "undefined") return false

  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")
    webglSupport = Boolean(gl)
    // Release the probe context immediately rather than waiting for GC.
    const lose = (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")
    lose?.loseContext()
  } catch {
    webglSupport = false
  }

  return webglSupport
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

/**
 * True when the browser can and should render the hero scene: WebGL present,
 * motion not suppressed, a pointer-capable viewport wide enough to warrant it,
 * and hardware that will not choke on it.
 */
export function useSceneEnabled(): boolean {
  const [enabled, setEnabled] = useState(false)
  const wideEnough = useMediaQuery("(min-width: 768px)")
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")

  useEffect(() => {
    if (!wideEnough || reducedMotion) {
      setEnabled(false)
      return
    }

    const cores = navigator.hardwareConcurrency ?? 4
    const lowPower = cores > 0 && cores <= 2
    setEnabled(detectWebGL() && !lowPower)
  }, [wideEnough, reducedMotion])

  return enabled
}

/** Pauses animation work while the page is hidden in a background tab. */
export function usePageVisible(): boolean {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onChange = () => setVisible(!document.hidden)
    document.addEventListener("visibilitychange", onChange)
    return () => document.removeEventListener("visibilitychange", onChange)
  }, [])

  return visible
}
