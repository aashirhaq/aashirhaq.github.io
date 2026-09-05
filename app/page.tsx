import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Metrics } from "@/components/sections/metrics"
import { Experience } from "@/components/sections/experience"
import { Work } from "@/components/sections/work"
import { Stack } from "@/components/sections/stack"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Metrics />
        <Experience />
        <Work />
        <Stack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
