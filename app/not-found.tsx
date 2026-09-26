import Link from "next/link";
import { buttonStyles } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <section id="top" className="flex min-h-[80svh] items-center">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <p className="font-mono text-[11px] tracking-[0.24em] text-cyan/80 uppercase">Error 404 · Route not found</p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="mt-5 text-ink-2">The link may be outdated. Everything else is one step away.</p>
        <Link href="/" className={`${buttonStyles.primary} mt-10`}>
          Back to the portfolio
        </Link>
      </div>
    </section>
  );
}
