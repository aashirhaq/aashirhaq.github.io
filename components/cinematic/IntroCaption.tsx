import type { CSSProperties } from "react";
import { profile } from "@/content/profile";

/**
 * Two-beat caption typed over the robot intro. `step` is driven by the intro
 * video's own clock (see IntroSequence), so it stays in sync if playback buffers.
 *   0 hidden · 1 first line · 2 second line · 3 fading out
 *
 * Decorative: the same facts are in the hero, so it is hidden from assistive tech.
 */
export function IntroCaption({ step }: { step: 0 | 1 | 2 | 3 }) {
  const [setup, payoff] = profile.introCaption;
  const chars = (text: string) => ({ "--chars": text.length }) as CSSProperties;

  return (
    <div
      className="intro-caption"
      aria-hidden="true"
      data-shown={step === 1 || step === 2 ? "" : undefined}
    >
      {/* Each row reserves the line's full width (centered), so typing never shifts it sideways. */}
      <span className="caption-row caption-setup" style={chars(setup)}>
        <span className="caption-line" data-on={step >= 1 ? "" : undefined} data-active={step === 1 ? "" : undefined}>
          {setup}
        </span>
      </span>
      <span className="caption-row caption-payoff" style={chars(payoff)}>
        <span className="caption-line" data-on={step >= 2 ? "" : undefined} data-active={step >= 2 ? "" : undefined}>
          {payoff}
        </span>
      </span>
    </div>
  );
}
