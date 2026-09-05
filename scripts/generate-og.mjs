/**
 * Renders the social card to public/og.png at build time.
 *
 * This runs as a prebuild step rather than through Next's opengraph-image
 * route convention, because that convention emits an extensionless file that
 * GitHub Pages serves without an image MIME type — which link scrapers reject.
 * A real .png in public/ is served correctly and cached like any other asset.
 */
import { createElement as h } from "react"
import { ImageResponse } from "next/og.js"
import { mkdir, writeFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/* The content module is TypeScript, so the card's copy is mirrored here. Kept
   deliberately short: name, headline and the four headline numbers. */
const NAME = "Aashir ul Haque"
const KICKER = "Junior AI Engineer · Stats AI"
const HEADLINE = "I build backend systems that stay up when the traffic doesn't stop."
const METRICS = [
  ["24M+", "users served"],
  ["60K+", "peak concurrency"],
  ["35K+", "daily transactions"],
  ["99.95%", "uptime"],
]

const INK = "#08090A"
const IVORY = "#EDEDEA"
const MUTED = "#9A9EA3"
const WIRE = "#2A2F36"
const WIRE_BRIGHT = "#3D444D"
const SIGNAL = "#E9B872"

function topology() {
  return h(
    "svg",
    { width: 1200, height: 630, viewBox: "0 0 1200 630", style: { position: "absolute", top: 0, left: 0 } },
    h("g", { stroke: WIRE, strokeWidth: 1.5, fill: "none" }, [
      h("path", { key: "a", d: "M760 470 L880 400 L1010 440 L1130 360" }),
      h("path", { key: "b", d: "M700 300 L880 400" }),
      h("path", { key: "c", d: "M880 400 L900 250 L1050 190 L1130 360" }),
      h("path", { key: "d", d: "M700 300 L820 180 L900 250" }),
    ]),
    h(
      "g",
      { fill: WIRE_BRIGHT },
      [
        [760, 470],
        [880, 400],
        [1010, 440],
        [1130, 360],
        [700, 300],
        [900, 250],
        [1050, 190],
        [820, 180],
      ].map(([cx, cy]) => h("circle", { key: `${cx}-${cy}`, cx, cy, r: 6 })),
    ),
    h(
      "g",
      { fill: SIGNAL },
      [
        [820, 435],
        [945, 420],
        [890, 325],
      ].map(([cx, cy]) => h("circle", { key: `p${cx}`, cx, cy, r: 5 })),
    ),
  )
}

const card = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: INK,
      padding: "72px 80px",
      fontFamily: "sans-serif",
      position: "relative",
    },
  },
  topology(),
  h(
    "div",
    { style: { display: "flex", flexDirection: "column" } },
    h(
      "div",
      { style: { display: "flex", fontSize: 20, letterSpacing: 4, color: SIGNAL, textTransform: "uppercase" } },
      KICKER,
    ),
    h(
      "div",
      { style: { display: "flex", marginTop: 28, fontSize: 78, fontWeight: 700, color: IVORY, letterSpacing: -2.5 } },
      NAME,
    ),
    h(
      "div",
      { style: { display: "flex", marginTop: 20, fontSize: 31, color: MUTED, maxWidth: 660, lineHeight: 1.3 } },
      HEADLINE,
    ),
  ),
  h(
    "div",
    { style: { display: "flex", gap: 56, borderTop: `1px solid ${WIRE}`, paddingTop: 32 } },
    ...METRICS.map(([value, label]) =>
      h(
        "div",
        { key: label, style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { display: "flex", fontSize: 40, color: SIGNAL } }, value),
        h("div", { style: { display: "flex", marginTop: 8, fontSize: 19, color: MUTED } }, label),
      ),
    ),
  ),
)

const response = new ImageResponse(card, { width: 1200, height: 630 })
const buffer = Buffer.from(await response.arrayBuffer())

const target = join(root, "public", "og.png")
await mkdir(dirname(target), { recursive: true })
await writeFile(target, buffer)

console.log(`generated public/og.png (${(buffer.length / 1024).toFixed(1)} kB)`)
