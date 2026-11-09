import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { Experience } from "@/components/sections/Experience";
import { PaymentWalkthrough } from "./PaymentWalkthrough";
import { profile } from "@/content/profile";
import "./showcase.css";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { JsonLd } from "@/components/seo/JsonLd";


export default function HomePage() {
  return (
    <>
      <JsonLd />
      <section id="top" className="work-hero" aria-labelledby="name">
        <div className="hero-art" aria-hidden="true" />
        <div className="work-wrap hero-inner">
          <p className="kicker">Senior software engineer</p>
          <h1 id="name">{profile.name}</h1>
          <p className="hero-specialty">Backend systems <span>&amp;</span> agentic AI.</p>
          <p className="hero-copy">I built payment and search services at Golootlo. Today I build local AI workflows that check their outputs and route them for human review.</p>
          <p className="hero-location">Chicago area · 6+ years · U.S. work authorized</p>
          <div className="hero-actions"><a href="#payment-trace">Trace a payment ↓</a><a href="#agent-demo">Watch the agent demo ▷</a></div>
          <div className="hero-links"><a href="/media/aashir-resume.pdf">Résumé ↗</a><a href="https://github.com/aashirhaq">GitHub ↗</a><a href="#contact">Contact ↗</a></div>
        </div>
      </section>
      <PaymentWalkthrough />
      <section id="agent-demo" className="work-section studio-section">
        <div className="work-wrap studio-layout">
          <div><p className="kicker">Little Ummah Studio / Personal project</p><h2>Inside the<br/>episode studio.</h2>
          <p className="work-deck">I built a local multimodal workflow that renders scenes, checks each take and queues episodes for human review.</p>
          <details><summary>How a scene is made</summary><p>The renderer produces a take. Checks inspect the scene and its dialogue. A failed check can trigger another attempt. The operator reviews finished episodes before scheduling publication.</p></details>
          <a className="studio-link" href="https://www.youtube.com/@LittleMuslimsCorner">Watch the published series ↗</a></div>
          <figure><video controls playsInline preload="none" poster="/media/studio-scene.webp" aria-label="Little Ummah Studio screen tour"><source src="/media/studio-tour.mp4" type="video/mp4"/><track kind="captions" src="/media/studio-tour.vtt" srcLang="en" label="English" default/></video><figcaption>Studio walkthrough · 19 seconds · Episode preview, run history and review queue</figcaption></figure>
        </div>
      </section>
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
