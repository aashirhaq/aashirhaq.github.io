import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { ArrowIcon, Eyebrow, Panel, SectionHeading } from "@/components/ui/primitives";
import { ContactForm } from "./ContactForm";
import { ContactLinks } from "./ContactLinks";

export function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" tone="lit" className="pb-16 md:pb-24">
      <SectionHeading
        index="06"
        label="Contact"
        title={<span id="contact-title">Let&apos;s build something reliable.</span>}
        intro="Backend platforms, payments, search or production AI. If it needs to scale and stay up, I'd like to hear about it."
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Panel className="hud-corners flex flex-col p-6 sm:p-8 lg:col-span-5">
          <Eyebrow>Direct channels</Eyebrow>
          <ContactLinks />
          <p className="mt-auto flex items-center gap-2 pt-10 font-mono text-xs text-ink-3">
            <span aria-hidden="true" className="status-dot h-1.5 w-1.5 rounded-full bg-cyan" />
            Based in {profile.location}
          </p>
        </Panel>

        <Panel className="p-6 sm:p-8 lg:col-span-7">
          <div className="mb-6 flex items-center justify-between">
            <Eyebrow>Send a message</Eyebrow>
            <ArrowIcon className="text-ink-3" direction="down" />
          </div>
          <ContactForm />
        </Panel>
      </div>
    </Section>
  );
}
