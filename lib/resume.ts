// Server-only (uses node:fs); imported exclusively from Server Components.
import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/content/profile";

/**
 * The Download Resume button renders only if the phone-free resume has been
 * placed in /public. Evaluated at build time (static export).
 */
export function resumeHref(): string | null {
  return existsSync(join(process.cwd(), "public", profile.resumePath)) ? profile.resumePath : null;
}
