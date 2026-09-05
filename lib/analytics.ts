/**
 * Thin GA4 wrapper. Every call is a no-op when gtag is absent (ad blockers,
 * local development), so callers never need to guard.
 */

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return
  window.gtag("event", name, params)
}

export function trackDownload(fileName: string, location = "unknown") {
  trackEvent("download", {
    event_category: "File Download",
    event_label: fileName,
    location,
  })
}

export function trackOutboundClick(label: string, location = "unknown") {
  trackEvent("outbound_click", {
    event_category: "Outbound",
    event_label: label,
    location,
  })
}

export function trackFormSubmission(formName: string, success = true) {
  trackEvent("form_submit", {
    event_category: "Form Interaction",
    event_label: formName,
    status: success ? "success" : "error",
  })
}

export function trackCaseStudyView(slug: string) {
  trackEvent("case_study_view", {
    event_category: "Content",
    event_label: slug,
  })
}
