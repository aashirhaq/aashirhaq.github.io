import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { JsonLd } from "@/components/seo/JsonLd";
import { resumeHref } from "@/lib/resume";

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero resumeHref={resumeHref()} />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
