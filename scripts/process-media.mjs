// Builds web-optimized, SILENT derivatives of the cinematic source videos.
//
//   node scripts/process-media.mjs
//
// Originals in /media are only ever read. Every output is written with `-an`
// (no audio stream) and then verified with ffprobe.
//
// Findings from inspecting the sources (ffprobe + frame sheets):
//   robot-intro.mp4        10.24s, 1248x704, 24fps, H.264 + stereo AAC
//   holographic-world.mp4  10.00s, 1280x720, 24fps, H.264 + mono AAC, ~14.4 Mbps
//   - The intro ends pushing into a glowing chip inside a neural mesh.
//   - The world clip opens with a ~3s tilted camera swoop, then settles into a
//     stable corridor. Its first and last frames do not match, so it cannot
//     loop as-is.
//
// Strategy:
//   1. world-loop: take the stable corridor (source 3s-10s) and bake a 1s
//      crossfade from its tail into its head, giving a seamless 6s loop whose
//      first frame is source t = WORLD_LOOP_FIRST_FRAME.
//   2. intro: the robot sequence crossfades into the world swoop, ending on the
//      exact source frame the loop starts from. The browser then hands off from
//      the intro to the already-buffered loop on identical imagery.

import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC_INTRO = join(ROOT, "media", "robot-intro.mp4");
const SRC_WORLD = join(ROOT, "media", "holographic-world.mp4");
const OUT = join(ROOT, "public", "media");
const TMP = join(ROOT, ".tmp", "media");

const FPS = 24;
const LOOP_SEGMENT_START = 3; // source second where the corridor becomes stable
const LOOP_SEGMENT_LENGTH = 7; // 3s -> 10s
const LOOP_CROSSFADE = 1; // seconds blended to hide the loop seam
const WORLD_LOOP_FIRST_FRAME = LOOP_SEGMENT_START + LOOP_CROSSFADE; // 4s
const INTRO_WORLD_TAIL_START = 2; // world swoop settling, 2s -> 4s
const INTRO_CROSSFADE = 1.1; // robot -> world blend duration
const ROBOT_USABLE = 10.2; // last whole frames of the robot clip
const CHIP_X = 0.47; // where the chip sits in the robot clip's final second (fraction of frame)
const CHIP_Y = 0.42;

// Zoom factor expressions evaluated per frame by ffmpeg's scale filter (`t` = seconds).
// (Commas are safe here because the expressions are single-quoted in the filtergraph.)
const pushZoom = (start) => `(1+0.45*pow(max(0,(t-${start})/${INTRO_CROSSFADE}),2))`;
const settleZoom = () => `(1+0.22*pow(max(0,1-t/${INTRO_CROSSFADE}),2))`;

const VARIANTS = [
  { suffix: "", width: 1280, height: 720, crf: 23, maxrate: "4M", bufsize: "8M" },
  { suffix: ".mobile", width: 960, height: 540, crf: 26, maxrate: "2M", bufsize: "4M" },
];

function ffmpeg(args) {
  execFileSync("ffmpeg", ["-v", "error", "-y", ...args], { stdio: "inherit" });
}

function probeStreams(file) {
  const out = execFileSync("ffprobe", [
    "-v", "error", "-show_entries", "stream=codec_type", "-of", "csv=p=0", file,
  ]).toString();
  return out.split(/\r?\n/).filter(Boolean);
}

function x264(v) {
  return [
    "-an",
    "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p",
    "-crf", String(v.crf), "-maxrate", v.maxrate, "-bufsize", v.bufsize,
    "-g", String(FPS * 2), "-movflags", "+faststart",
  ];
}

mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

// Normalized, silent mezzanine files (lossless-ish) so every variant starts from identical frames.
const norm = `scale=1280:720:flags=lanczos,setsar=1,fps=${FPS},format=yuv420p`;
const loopMaster = join(TMP, "world-loop.master.mkv");
const introMaster = join(TMP, "robot-intro.master.mkv");

// 1. Seamless world loop.
{
  const L = LOOP_SEGMENT_LENGTH;
  const F = LOOP_CROSSFADE;
  ffmpeg([
    "-ss", String(LOOP_SEGMENT_START), "-t", String(L), "-i", SRC_WORLD,
    "-filter_complex",
    [
      `[0:v]${norm},split=3[a][b][c]`,
      `[a]trim=${F}:${L - F},setpts=PTS-STARTPTS[body]`,
      `[b]trim=${L - F}:${L},setpts=PTS-STARTPTS[tail]`,
      `[c]trim=0:${F},setpts=PTS-STARTPTS[head]`,
      `[tail][head]xfade=transition=fade:duration=${F}:offset=0[seam]`,
      `[body][seam]concat=n=2:v=1:a=0[out]`,
    ].join(";"),
    "-map", "[out]", "-an", "-c:v", "libx264", "-crf", "10", "-preset", "medium", loopMaster,
  ]);
}

// 2. Robot intro that dissolves into the world and lands on the loop's first frame.
{
  const tail = WORLD_LOOP_FIRST_FRAME - INTRO_WORLD_TAIL_START;
  const offset = ROBOT_USABLE - INTRO_CROSSFADE;
  ffmpeg([
    "-i", SRC_INTRO,
    "-ss", String(INTRO_WORLD_TAIL_START), "-t", String(tail), "-i", SRC_WORLD,
    "-filter_complex",
    [
      // Camera push toward the chip during the final beat (eased, no hard cut).
      `[0:v]${norm},trim=0:${ROBOT_USABLE},setpts=PTS-STARTPTS,` +
        `scale=w='trunc(1280*${pushZoom(offset)}/2)*2':h='trunc(720*${pushZoom(offset)}/2)*2':eval=frame:flags=bicubic,` +
        `crop=1280:720:x='(iw-1280)*${CHIP_X}':y='(ih-720)*${CHIP_Y}'[robot]`,
      // World arrives slightly magnified and settles to 1.0x, landing on the loop's first frame.
      `[1:v]${norm},setpts=PTS-STARTPTS,` +
        `scale=w='trunc(1280*${settleZoom()}/2)*2':h='trunc(720*${settleZoom()}/2)*2':eval=frame:flags=bicubic,` +
        `crop=1280:720:x='(iw-1280)/2':y='(ih-720)/2'[world]`,
      // Plain dissolve: the built-in zoom transitions blow the chip glow out to a flat cyan frame.
      `[robot][world]xfade=transition=fade:duration=${INTRO_CROSSFADE}:offset=${offset}[out]`,
    ].join(";"),
    "-map", "[out]", "-an", "-c:v", "libx264", "-crf", "10", "-preset", "medium", introMaster,
  ]);
}

// 3. Delivery encodes.
const outputs = [];
for (const v of VARIANTS) {
  const scale = `scale=${v.width}:${v.height}:flags=lanczos`;
  for (const [name, master] of [["robot-intro", introMaster], ["holographic-world", loopMaster]]) {
    const file = join(OUT, `${name}${v.suffix}.web.mp4`);
    ffmpeg(["-i", master, "-vf", scale, ...x264(v), file]);
    outputs.push(file);
  }
}

// 4. Poster frames (first frame of each delivered clip -> no flash on poster -> video).
const posters = [
  [introMaster, "robot-intro.poster.webp", 1280],
  [loopMaster, "holographic-world.poster.webp", 1280],
  [loopMaster, "holographic-world.poster.mobile.webp", 960],
];
for (const [master, name, width] of posters) {
  const file = join(OUT, name);
  ffmpeg(["-i", master, "-frames:v", "1", "-vf", `scale=${width}:-2:flags=lanczos`, "-c:v", "libwebp", "-quality", "82", file]);
}

// Social preview background (1200x630 crop of the loop's first frame), consumed by app/opengraph-image.tsx.
mkdirSync(join(ROOT, "assets"), { recursive: true });
ffmpeg([
  "-i", loopMaster, "-frames:v", "1",
  // Soft blur: it sits behind a dark gradient, and keeps the final PNG small.
  "-vf", "scale=1200:-2:flags=lanczos,crop=1200:630,gblur=sigma=3", "-q:v", "4",
  join(ROOT, "assets", "og-background.jpg"),
]);

// 5. Verify: delivered videos must contain exactly one video stream and NO audio.
let failed = false;
for (const file of outputs) {
  const streams = probeStreams(file);
  const ok = streams.length === 1 && streams[0] === "video";
  if (!ok) failed = true;
  const kb = Math.round(statSync(file).size / 1024);
  console.log(`${ok ? "OK  " : "FAIL"} ${file.replace(ROOT, ".")}  streams=[${streams.join(",")}]  ${kb} KB`);
}

rmSync(TMP, { recursive: true, force: true });
if (failed) {
  console.error("Audio or unexpected streams detected in a web derivative.");
  process.exit(1);
}
console.log("All web videos verified silent (no audio stream).");
