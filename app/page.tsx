import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { Experience } from "@/components/sections/experience"
import { Stack } from "@/components/sections/stack"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
