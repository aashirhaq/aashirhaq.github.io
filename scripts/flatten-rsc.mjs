// Post-export fix-up for static hosting.
//
// On Windows, `next build` (output: "export") writes segment-prefetch payloads
// for dynamic routes as nested folders, e.g.
//   out/projects/x/__next.projects/$d$slug/__PAGE__.txt
// while the client requests the dot-joined file name
//   out/projects/x/__next.projects.$d$slug.__PAGE__.txt
// which 404s on GitHub Pages. This copies each nested payload to the flat name
// the router expects. It is a no-op when the flat files already exist
// (e.g. builds on Linux CI).

import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = join(process.cwd(), "out");
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, full);
    else walk(full);
  }
}

function flatten(parent, root) {
  const stack = [root];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        stack.push(full);
        continue;
      }
      const flatName = relative(parent, full).split(sep).join(".");
      const target = join(parent, flatName);
      if (!existsSync(target)) {
        copyFileSync(full, target);
        copied++;
      }
    }
  }
}

if (existsSync(OUT)) walk(OUT);
console.log(`flatten-rsc: ${copied} segment payload(s) flattened`);
