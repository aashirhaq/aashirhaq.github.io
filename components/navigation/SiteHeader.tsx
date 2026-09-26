"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { navSections, type SectionId } from "@/content/site";
import { profile } from "@/content/profile";
import { cx } from "@/components/ui/primitives";

function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(enabled: boolean): SectionId | null {
  const [active, setActive] = useState<SectionId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        let best: SectionId | null = null;
        let bestRatio = 0;
        for (const { id } of navSections) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.25, 0.5, 1] },
    );
    for (const { id } of navSections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const scrolled = useScrolled();
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.removeProperty("overflow");
    };
  }, [open]);

  const href = (id: SectionId) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header
      data-reveal
      style={{ "--reveal-step": 6 } as React.CSSProperties}
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-line bg-[rgb(4_8_18/0.72)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3 rounded-md"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-md border border-line-strong bg-white/[0.03] font-mono text-xs text-cyan transition-colors group-hover:border-cyan/60"
          >
            AH
          </span>
          <span className="hidden text-sm font-medium tracking-tight text-ink sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navSections.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <li key={id}>
                <a
                  href={href(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cx(
                    "relative inline-flex min-h-11 items-center rounded-md px-3.5 text-[13px] tracking-wide transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      "absolute inset-x-3.5 bottom-2 h-px bg-gradient-to-r from-transparent via-cyan to-transparent transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={href("contact")}
            className="hidden min-h-10 items-center rounded-full border border-line-strong px-4 text-[13px] text-ink transition-colors hover:border-cyan/60 hover:bg-cyan/[0.06] sm:inline-flex"
          >
            Get in touch
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cx(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cx(
                  "absolute left-0 h-px w-5 bg-current transition-transform duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-[rgb(3_6_13/0.94)] px-4 pt-6 pb-10 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col">
          {navSections.map(({ id, label }, i) => (
            <li key={id} className="border-b border-line/60">
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={href(id)}
                onClick={() => setOpen(false)}
                className="flex min-h-14 items-center justify-between text-lg text-ink"
              >
                {label}
                <span className="font-mono text-xs text-ink-3">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
