"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  enforceMuted,
  playBackground,
  primeBackground,
  setIntroState,
  useIntroState,
  useMediaQuery,
} from "@/lib/intro-store";
import { media, MOBILE_QUERY } from "@/lib/media";
import { IntroCaption } from "./IntroCaption";

/**
 * Cinematic entry. The intro file was rendered so that the robot's push into
 * the chip dissolves into the holographic corridor and ends on the exact frame
 * the background loop starts from (see scripts/process-media.mjs). The
 * background loop is mounted and buffered underneath while this plays, so the
 * handoff is a swap between two identical images.
 *
 * Timeline (natural path):
 *   playing ─▶ +1.2s prime background download
 *           ─▶ duration − REVEAL_LEAD: portfolio materializes over the corridor
 *           ─▶ ended: background starts on the matching frame, intro fades out
 */
type Stage = "playing" | "reveal" | "handoff" | "skipping" | "gone";

const DIM_LEAD_S = 2.4; // ease the readability scrim in while the camera enters the chip
const REVEAL_LEAD_S = 0.9; // start materializing while the corridor is still on screen
const REVEAL_DURATION_MS = 1300; // longest staggered reveal animation
const BOOT_TIMEOUT_MS = 3500; // intro must start within this or we fall back
const STALL_TIMEOUT_MS = 2500; // mid-play buffering longer than this → skip
const PRIME_DELAY_MS = 1200;
const FADE_MS = 750;
// Caption beats, in intro-video seconds. It clears before the push into the chip.
const CAPTION_SETUP_AT_S = 1.5;
const CAPTION_PAYOFF_AT_S = 5;
const CAPTION_OUT_AT_S = 8.4;

export function IntroSequence() {
  const intro = useIntroState();
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [stage, setStage] = useState<Stage>("playing");
  const [sweep, setSweep] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [captionStep, setCaptionStep] = useState<0 | 1 | 2 | 3>(0);
  // Actual clip length once playback starts; drives the mobile camera pan.
  const [playingFor, setPlayingFor] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealed = useRef(false);
  const exiting = useRef(false);
  const timers = useRef<number[]>([]);

  const later = useCallback((fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);

  const releasePage = useCallback(() => {
    document.documentElement.style.removeProperty("overflow");
    document.getElementById("site-root")?.removeAttribute("inert");
  }, []);

  const beginReveal = useCallback(() => {
    if (revealed.current) return;
    revealed.current = true;
    primeBackground();
    releasePage();
    setIntroState("reveal");
    setStage((s) => (s === "playing" ? "reveal" : s));
    later(() => setIntroState("done"), REVEAL_DURATION_MS);
  }, [later, releasePage]);

  const finish = useCallback(() => {
    later(() => {
      setStage("gone");
      videoRef.current?.pause();
    }, FADE_MS);
  }, [later]);

  const exit = useCallback(
    (reason: "skip" | "fallback") => {
      if (exiting.current) return;
      exiting.current = true;
      track(reason === "skip" ? "intro_skipped" : "intro_fallback", {
        at: Math.round((videoRef.current?.currentTime ?? 0) * 10) / 10,
      });
      if (reason === "skip") {
        setSweep(true);
        later(() => setSweep(false), 700);
      }
      primeBackground();
      void playBackground(0);
      setStage("skipping");
      beginReveal();
      finish();
    },
    [beginReveal, finish, later],
  );

  const handoff = useCallback(async () => {
    if (exiting.current) return;
    exiting.current = true;
    beginReveal();
    await playBackground();
    setStage("handoff");
    track("intro_completed");
    finish();
  }, [beginReveal, finish]);

  // Drive the sequence. `armed` flips true once (play) and stays true through
  // reveal/done, so state transitions never tear down the listeners mid-intro.
  const armed = intro === "play" || intro === "reveal" || intro === "done";
  useEffect(() => {
    if (!armed || revealed.current || exiting.current) return;
    const video = videoRef.current;
    if (!video) return;

    window.__cinematicAlive = true;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    document.getElementById("site-root")?.setAttribute("inert", "");
    enforceMuted(video);

    let started = false;
    let stallTimer = 0;

    const onPlaying = () => {
      window.clearTimeout(stallTimer);
      if (started) return;
      started = true;
      setPlayingFor(Math.max(0, (video.duration || 0) - video.currentTime));
      track("intro_started");
      later(primeBackground, PRIME_DELAY_MS);
    };
    const onWaiting = () => {
      window.clearTimeout(stallTimer);
      if (started) stallTimer = window.setTimeout(() => exit("fallback"), STALL_TIMEOUT_MS);
    };
    const onTime = () => {
      if (!video.duration) return;
      const t = video.currentTime;
      setCaptionStep(t >= CAPTION_OUT_AT_S ? 3 : t >= CAPTION_PAYOFF_AT_S ? 2 : t >= CAPTION_SETUP_AT_S ? 1 : 0);
      if (video.currentTime >= video.duration - DIM_LEAD_S) setDimmed(true);
      if (video.currentTime >= video.duration - REVEAL_LEAD_S) beginReveal();
    };
    const onEnded = () => void handoff();
    const onError = () => exit("fallback");

    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    later(() => {
      if (!started) exit("fallback");
    }, BOOT_TIMEOUT_MS);
    video.play().catch(() => exit("fallback"));

    const pending = timers.current;
    return () => {
      window.clearTimeout(stallTimer);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      pending.forEach(window.clearTimeout);
      releasePage();
    };
  }, [armed, beginReveal, exit, handoff, later, releasePage]);

  // Escape skips the intro.
  useEffect(() => {
    if (intro !== "play") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") exit("skip");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [intro, exit]);

  // Server render (and first client render) emits the poster shell so the
  // first paint is already cinematic. CSS only shows it when data-intro="play".
  if (intro !== "ssr" && (!armed || stage === "gone")) return null;

  return (
    <div className="intro-layer" data-live={armed ? "" : undefined}>
      <div
        className="intro-stage"
        data-state={stage}
        data-dim={dimmed ? "" : undefined}
        data-playing={playingFor !== null ? "" : undefined}
        style={playingFor ? ({ "--intro-remaining": `${playingFor}s` } as React.CSSProperties) : undefined}
      >
        {intro !== "ssr" && (
          <video
            ref={videoRef}
            src={isMobile ? media.intro.mobile : media.intro.desktop}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            disablePictureInPicture
            disableRemotePlayback
          />
        )}
      </div>

      {/* Skipping or revealing clears the caption immediately. */}
      <IntroCaption step={stage === "playing" ? captionStep : 3} />

      {sweep && <div className="holo-sweep" aria-hidden="true" />}

      <button
        type="button"
        onClick={() => exit("skip")}
        className="intro-skip group fixed right-5 bottom-5 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/15 bg-black/35 px-5 py-2.5 font-mono text-[11px] tracking-[0.22em] text-ink/85 uppercase backdrop-blur-md transition-[opacity,border-color,color] duration-300 hover:border-cyan/50 hover:text-white sm:right-8 sm:bottom-8"
        data-hidden={stage !== "playing" ? "" : undefined}
      >
        Skip intro
        <span aria-hidden="true" className="text-cyan transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </div>
  );
}
