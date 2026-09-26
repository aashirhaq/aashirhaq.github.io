import { profile } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-[rgb(3_6_13/0.6)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-ink-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs">
          {profile.positioning} <span aria-hidden="true">·</span> {profile.location}
        </p>
        <a href="#top" className="inline-flex min-h-11 items-center text-ink-2 transition-colors hover:text-ink sm:min-h-0">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
