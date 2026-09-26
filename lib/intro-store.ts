"use client";

import { useSyncExternalStore } from "react";

/**
 * The cinematic state lives on <html data-intro>, set before paint by the
 * inline gate script (lib/intro-gate.ts). Components subscribe to it here,
 * which keeps server and first client render identical ("ssr") and avoids any
 * hydration mismatch.
 *
 *   play → reveal → done      (full cinematic)
 *   enter                     (returning visitor / fallback)
 *   none                      (reduced motion / attribute absent)
 */
export type IntroState = "ssr" | "play" | "reveal" | "enter" | "done" | "none";

declare global {
  interface Window {
    __cinematicAlive?: boolean;
  }
}

function readIntro(): IntroState {
  const value = document.documentElement.getAttribute("data-intro");
  return value === "play" || value === "reveal" || value === "enter" || value === "done" ? value : "none";
}

function subscribeIntro(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-intro"] });
  return () => observer.disconnect();
}

export function setIntroState(state: Exclude<IntroState, "ssr" | "none">): void {
  document.documentElement.setAttribute("data-intro", state);
}

export function useIntroState(): IntroState {
  return useSyncExternalStore(subscribeIntro, readIntro, () => "ssr");
}

/* ------------------------------------------------------------------
   Background handoff channel.
   The intro asks the (already mounted) background to start at the exact
   moment the intro's final frame matches the loop's first frame.
------------------------------------------------------------------- */
type BackgroundPlayer = () => Promise<void>;

let backgroundPlayer: BackgroundPlayer | null = null;
let primed = false;
const primeListeners = new Set<() => void>();

export function registerBackgroundPlayer(player: BackgroundPlayer | null): void {
  backgroundPlayer = player;
}

/** Start the background loop; resolves once a frame is presented (or after `capMs`). */
export function playBackground(capMs = 700): Promise<void> {
  const play = backgroundPlayer?.() ?? Promise.resolve();
  return Promise.race([play, new Promise<void>((resolve) => setTimeout(resolve, capMs))]);
}

/** Allow the background video to start downloading (deferred while the intro buffers). */
export function primeBackground(): void {
  if (primed) return;
  primed = true;
  primeListeners.forEach((listener) => listener());
}

export function useBackgroundPrimed(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      primeListeners.add(onChange);
      return () => primeListeners.delete(onChange);
    },
    () => primed,
    () => false,
  );
}

/* ------------------------------------------------------------------
   Media-query subscription (hydration-safe).
------------------------------------------------------------------- */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** Resolve when the video has actually presented a frame. */
export function firstFrame(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    if ("requestVideoFrameCallback" in video) {
      video.requestVideoFrameCallback(() => resolve());
    } else {
      const el = video as HTMLVideoElement;
      el.addEventListener("playing", () => resolve(), { once: true });
    }
  });
}

/** Belt-and-braces muting: the web files have no audio stream, but mark intent anyway. */
export function enforceMuted(video: HTMLVideoElement | null): void {
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.setAttribute("muted", "");
}
