"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";
import { track } from "@/lib/analytics";
import { buttonStyles, cx } from "@/components/ui/primitives";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "block w-full rounded-lg border border-line bg-black/30 px-4 py-3 text-[15px] text-ink placeholder:text-ink-3 transition-[border-color,box-shadow] duration-300 focus:border-cyan/60 focus:shadow-[0_0_0_3px_rgb(94_225_255/0.12)] focus:outline-none";

const labelClass = "mb-2 block font-mono text-[11px] tracking-[0.18em] text-ink-2 uppercase";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(profile.contactFormEndpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      form.reset();
      setStatus("sent");
      track("contact_submitted", { success: true });
    } catch {
      setStatus("error");
      track("contact_submitted", { success: false });
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <input type="hidden" name="_subject" value="Portfolio contact form" />
      {/* Honeypot: Formspree discards submissions where this is filled. */}
      <div hidden aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input id="contact-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input id="contact-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass}>
          Company <span className="tracking-normal text-ink-3 normal-case">(optional)</span>
        </label>
        <input id="contact-company" name="company" type="text" autoComplete="organization" className={fieldClass} />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea id="contact-message" name="message" required rows={5} className={cx(fieldClass, "resize-y")} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className={cx(buttonStyles.primary, "disabled:cursor-wait disabled:opacity-70")}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" role="status" className="text-sm">
          {status === "sent" && <span className="text-cyan">Message sent — thank you. I&apos;ll reply soon.</span>}
          {status === "error" && (
            <span className="text-[#ffb4b4]">
              Something went wrong. Please email me directly at{" "}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
                {profile.email}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
