import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { PointerParallax } from "@/components/cinematic/PointerParallax";
import { ArrowIcon, buttonStyles } from "@/components/ui/primitives";
import { ResumeLink } from "@/components/ui/ResumeLink";

const step = (n: number) => ({ "--reveal-step": n }) as CSSProperties;

const activeModules = [
  { name: "Payments", detail: "10+ gateways" },
  { name: "Search", detail: "<500ms @ 60K+" },
  { name: "Event-driven", detail: "SQS / SNS" },
  { name: "AI / LLM", detail: "RAG · DistilBERT" },
];

export function Hero({ resumeHref }: { resumeHref: string | null }) {
  return (
    <section
      id="top"
      aria-labelledby="hero-name"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-20 md:pt-28"
    >
      {/* Local readability field + faint system grid. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          data-reveal
          style={step(0)}
          className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_48%,rgb(3_6_13/0.78)_0%,rgb(3_6_13/0.35)_55%,transparent_80%)]"
        />
        {/* data-reveal animates opacity to 1, so the grid's own low opacity lives on the child. */}
        <div data-reveal style={step(0)} className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgb(140_210_255)_1px,transparent_1px),linear-gradient(90deg,rgb(140_210_255)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(60%_60%_at_35%_50%,black,transparent)]" />
        </div>
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end lg:gap-10 lg:px-10">
        <div>
          <p
            data-reveal
            style={step(1)}
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-black/30 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.22em] text-ink-2 uppercase backdrop-blur-md"
          >
            <span aria-hidden="true" className="status-dot h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_var(--holo-cyan)]" />
            Interface online <span className="text-ink-3">·</span> {profile.location}
          </p>

          <h1
            id="hero-name"
            data-reveal
            style={step(2)}
            className="text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.035em] text-ink text-glow sm:text-6xl md:text-7xl xl:text-[5.5rem]"
          >
            {profile.name}
          </h1>

          <p data-reveal style={step(3)} className="mt-5 text-xl font-medium tracking-tight sm:text-2xl md:text-[1.75rem]">
            <span className="gradient-text">{profile.positioning}</span>
            <span className="text-ink-3"> — </span>
            <span className="text-ink-2">{profile.positioningDetail}</span>
          </p>

          <p
            data-reveal
            style={step(4)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-pretty text-ink-2 sm:text-lg"
          >
            {profile.heroStatement}
          </p>

          <div data-reveal style={step(5)} className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#projects" className={buttonStyles.primary}>
              View projects
              <ArrowIcon direction="down" />
            </a>
            <a href="#contact" className={buttonStyles.secondary}>
              Get in touch
            </a>
            {resumeHref && <ResumeLink href={resumeHref} className={buttonStyles.ghost} />}
          </div>

          <dl data-reveal style={step(6)} className="mt-14 flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
            {profile.heroIndicators.map((m) => (
              <div key={m.label} className="flex flex-col-reverse gap-1">
                <dt className="font-mono text-[11px] tracking-[0.18em] text-ink-3 uppercase">{m.label}</dt>
                <dd className="font-mono text-2xl font-medium tracking-tight text-ink tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Desktop HUD readout — factual system areas, gently pointer-reactive. */}
        <PointerParallax strength={5} className="hidden lg:block">
          <div data-reveal style={step(5)} className="panel hud-corners p-5">
            <div className="mb-4 flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ink-3 uppercase">
              <span>Core domains</span>
              <span className="text-cyan/80">{String(activeModules.length).padStart(2, "0")}</span>
            </div>
            <ul className="space-y-2.5">
              {activeModules.map((m) => (
                <li
                  key={m.name}
                  className="flex items-center justify-between gap-4 rounded-lg border border-line/70 bg-white/[0.02] px-3.5 py-2.5"
                >
                  <span className="flex items-center gap-2.5 text-sm text-ink">
                    <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan/80" />
                    {m.name}
                  </span>
                  <span className="font-mono text-[11px] text-ink-3">{m.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </PointerParallax>
      </div>

      <a
        href="#about"
        data-reveal
        style={step(6)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-ink-3 uppercase transition-colors hover:text-ink md:flex"
      >
        Scroll
        <span aria-hidden="true" className="relative block h-10 w-px overflow-hidden bg-line">
          <span className="flow-pulse absolute inset-x-0 top-0 h-3 bg-cyan" />
        </span>
      </a>
    </section>
  );
}
