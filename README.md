# aashirhaq.github.io

Personal portfolio for **Aashir ul Haque** — backend and distributed systems engineer.

Live at **https://aashirhaq.github.io**

## Design concept — *Systems in Motion*

The visual language comes from the systems described in the content: service
topologies, request paths, queues and data flow. One rule holds the design
together — **structure renders cool and static, data in motion renders warm**.
Every amber element on the site is something moving through a system.

There is one WebGL experience (the hero node field). Everything else that looks
like a diagram *is* a diagram: hand-authored SVG driven by typed content, so it
stays readable with JavaScript throttled, motion disabled or WebGL unavailable.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), static export |
| Language | TypeScript, strict |
| Styling | Tailwind CSS 3, dark-only palette |
| Motion | Framer Motion |
| 3D | Three.js + React Three Fiber (hero only, lazily loaded) |
| Type | Sora (display) · Inter (body) · JetBrains Mono (metrics, system labels) |
| Hosting | GitHub Pages via GitHub Actions |
| Forms | Formspree |
| Analytics | GA4 |

## Layout

```
content/          Typed source of truth — profile, experience, projects, stack
  types.ts        Diagram, case-study and experience shapes
components/
  primitives/     Button, Section, Reveal, Metric, Tag
  system/         SystemField (R3F hero), ArchitectureDiagram (SVG), StackMap
  sections/       Hero, Work, Experience, Stack, About, Contact
app/
  page.tsx        Composed homepage
  work/[slug]/    Case studies, statically generated
  robots.ts       /robots.txt
  sitemap.ts      /sitemap.xml
scripts/
  generate-og.mjs Renders public/og.png at build time (prebuild)
```

Content never lives inside a component. To change a metric, a role or a
diagram, edit `content/` — the presentation layer reads from it.

## Commands

```bash
npm run dev        # development server
npm run build      # generate OG card, then static export to ./out
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
npm run check      # lint + typecheck
```

The build fails on lint or type errors by design.

## Performance and resilience

- Three.js is code-split and requested only after a runtime check for WebGL,
  a viewport ≥768px, `prefers-reduced-motion: no-preference`, and >2 CPU cores.
  It is absent from the initial bundle otherwise.
- The hero scene stops rendering when scrolled out of view or the tab is hidden.
- `devicePixelRatio` is capped at 1.75.
- A static SVG topology stands in wherever the scene is not rendered, so the
  hero is never an empty space.
- Fonts are self-hosted by `next/font` with metric overrides, so there is no
  layout shift and no font-CDN request.
- All motion is removed under `prefers-reduced-motion`; nothing on the site
  depends on animation to be understood.

## Adding a case study

Add an entry to `content/projects.ts` with `featured: true` and a `caseStudy`
block. `generateStaticParams` and the sitemap pick it up automatically. If it
has a `diagram`, place nodes on the `col`/`row` grid — the renderer handles
routing, arrowheads and the animated flow.
