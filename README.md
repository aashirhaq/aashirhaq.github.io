# Aashir ul Haque — Portfolio

Cinematic portfolio: a robot operates a holographic computer, the camera enters it, and the real HTML portfolio materializes inside the holographic world.

Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4. No other runtime dependencies.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out  (runs scripts/flatten-rsc.mjs afterwards)
npm run start      # serve ./out on http://localhost:4173
npm run lint
npm run typecheck
npm run media      # regenerate web videos/posters from ./media (needs ffmpeg + ffprobe)
```

## Structure

```
app/                     routes, metadata, sitemap, robots, /og.png
  projects/[slug]/       flagship case-study pages (statically generated)
components/
  cinematic/             IntroSequence, HolographicBackground, RouteSweep, PointerParallax
  navigation/            SiteHeader (desktop HUD nav + mobile menu)
  sections/              Hero, About, Experience, Projects, Skills, Credentials, Contact
  layout/ ui/ seo/ projects/
content/                 ALL professional content (profile, experience, projects, skills, credentials)
lib/                     intro gate + state store, media paths, analytics, resume check
scripts/                 process-media.mjs (video pipeline), flatten-rsc.mjs (export fix-up)
public/media/            silent web videos + posters (generated)
assets/                  og-background.jpg (generated, used by /og.png)
```

Edit the files in `content/` to change what the site says. Presentation components never hard-code professional facts.

## Cinematic pipeline

`scripts/process-media.mjs` reads the originals in `media/` and never modifies them. Every output is encoded with `-an` (no audio stream), then checked with ffprobe.

- **World loop:** the stable corridor section (source 3–10s), with a 1s crossfade baked in so it loops seamlessly.
- **Intro:** the robot shot pushes toward the chip and dissolves into the corridor. It ends on the exact frame the loop starts from.
- **Variants:** 1280×720 desktop and 960×540 mobile, plus WebP posters taken from each clip's first frame.

At runtime the loop is mounted underneath and held on frame 0. When the intro ends, the loop starts on the identical frame and the intro fades away.

## Before deploying

- **Resume button:** add the phone-free resume at `public/documents/aashir-ul-haque-resume.pdf`. The Download Resume button only renders when that file exists at build time.
- **Deploy:** push to `main`. `.github/workflows/deploy.yml` builds and publishes `out/` to GitHub Pages (Settings → Pages → Source: *GitHub Actions*).
