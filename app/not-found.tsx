import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { caseStudies } from "@/content/projects"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ButtonLink } from "@/components/primitives/button"

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="blueprint flex min-h-[80svh] items-center py-section">
        <div className="shell">
          <p className="eyebrow mb-6">404 · No route matched</p>
          <h1 className="max-w-2xl text-display-lg font-display font-semibold text-balance">
            This path does not resolve.
          </h1>
          <p className="mt-5 max-w-prose text-[1.0625rem] leading-relaxed text-ivory-muted">
            The page you asked for is not here. Everything that does exist is one link away.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to the homepage
            </ButtonLink>
            <ButtonLink href="/#contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>

          <div className="mt-16 border-t border-wire pt-8">
            <h2 className="eyebrow mb-5">Case studies</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {caseStudies.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="rounded text-[0.9375rem] text-ivory-muted transition-colors hover:text-signal"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
