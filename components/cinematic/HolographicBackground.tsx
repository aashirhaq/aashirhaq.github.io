"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { media, MOBILE_QUERY, prefersLightweightMedia } from "@/lib/media";
import {
  enforceMuted,
  firstFrame,
  registerBackgroundPlayer,
  useBackgroundPrimed,
  useIntroState,
  useMediaQuery,
} from "@/lib/intro-store";

/**
 * Persistent holographic environment (layer 0). Lives in the root layout, so it
 * keeps running across client-side navigation and never remounts.
 *
 * The poster (loop frame 0) is a CSS background, so the environment exists
 * before JS, for reduced-motion visitors, and when video is unavailable.
 */
export function HolographicBackground() {
  const intro = useIntroState();
  const primed = useBackgroundPrimed();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)", true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);

  // Hold the loop on frame 0 until the intro hands off (it calls playBackground).
  const introRunning = intro === "play" || intro === "reveal";
  const lightweight = intro === "ssr" || reducedMotion || prefersLightweightMedia();
  // While the intro plays, the loop is only fetched once the intro is primed.
  const shouldMount = !lightweight && (!introRunning || primed);
  const src = isMobile ? media.world.mobile : media.world.desktop;

  const setVideo = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    enforceMuted(el);
  }, []);

  // Autoplay whenever the intro isn't holding the loop on its first frame.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || introRunning) return;
    video.play().catch(() => {
      /* Autoplay refused: the matching poster remains. */
    });
  }, [introRunning, src, shouldMount]);

  // Handoff channel used by the intro.
  useEffect(() => {
    registerBackgroundPlayer(async () => {
      const video = videoRef.current;
      if (!video) return;
      try {
        await video.play();
        await firstFrame(video);
      } catch {
        /* Poster is the same frame; nothing visible changes. */
      }
    });
    return () => registerBackgroundPlayer(null);
  }, []);

  // Don't burn battery decoding video in a hidden tab.
  useEffect(() => {
    const onVisibility = () => {
      const video = videoRef.current;
      if (!video || introRunning) return;
      if (document.hidden) video.pause();
      else video.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [introRunning]);

  return (
    <div className="environment" aria-hidden="true">
      {shouldMount && (
        <video
          key={src}
          ref={setVideo}
          src={src}
          muted
          playsInline
          loop
          preload="auto"
          tabIndex={-1}
          disablePictureInPicture
          disableRemotePlayback
          onPlaying={() => setVisible(true)}
          style={{ opacity: visible ? 1 : 0, transition: "opacity 500ms var(--ease-out)" }}
        />
      )}
      <div className="environment-scrim" />
      <div className="environment-grain" />
    </div>
  );
}
