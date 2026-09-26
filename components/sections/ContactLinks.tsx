"use client";

import { profile } from "@/content/profile";
import { track } from "@/lib/analytics";
import { ArrowIcon } from "@/components/ui/primitives";

export function ContactLinks() {
  return (
    <ul className="mt-6 divide-y divide-line/70 border-y border-line/70">
      {profile.contact.map((link) => {
        const external = link.kind !== "email";
        return (
          <li key={link.kind}>
            <a
              href={link.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              onClick={() => track("contact_link_clicked", { channel: link.kind })}
              className="group flex min-h-16 items-center justify-between gap-4 py-3"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[11px] tracking-[0.2em] text-ink-3 uppercase">{link.label}</span>
                <span className="mt-1 block truncate text-ink transition-colors group-hover:text-cyan">{link.display}</span>
              </span>
              <ArrowIcon
                direction={external ? "up-right" : "right"}
                className="flex-none text-ink-3 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:text-cyan"
              />
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
