// Web derivatives produced by scripts/process-media.mjs (silent, verified).
export const media = {
  intro: {
    desktop: "/media/robot-intro.web.mp4",
    mobile: "/media/robot-intro.mobile.web.mp4",
    poster: "/media/robot-intro.poster.webp",
  },
  world: {
    desktop: "/media/holographic-world.web.mp4",
    mobile: "/media/holographic-world.mobile.web.mp4",
    poster: "/media/holographic-world.poster.webp",
    posterMobile: "/media/holographic-world.poster.mobile.webp",
  },
} as const;

export const MOBILE_QUERY = "(max-width: 767px)";

/** Client-only: true when the visitor asked for less motion or less data. */
export function prefersLightweightMedia(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  return Boolean(connection && (connection.saveData || /(^|-)2g$/.test(connection.effectiveType ?? "")));
}

export function pickSource(variant: { desktop: string; mobile: string }): string {
  return window.matchMedia(MOBILE_QUERY).matches ? variant.mobile : variant.desktop;
}
