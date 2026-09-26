"use client";

import { track } from "@/lib/analytics";

export function ResumeLink({ href, className }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      download
      className={className}
      onClick={() => track("resume_clicked")}
    >
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-4 w-4">
        <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download resume
    </a>
  );
}
