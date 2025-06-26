"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void
  }
}

export function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", "G-PWEQ5RJ569", {
        page_path: pathname,
      })
    }
  }, [pathname])

  return null
}

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters: any = {}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters)
  }
}

export const trackDownload = (fileName: string, location = "unknown") => {
  trackEvent("download", {
    event_category: "File Download",
    event_label: fileName,
    custom_parameter_1: location,
    value: 1,
  })
}

export const trackSocialClick = (platform: string, location = "unknown") => {
  trackEvent("social_click", {
    event_category: "Social Media",
    event_label: platform,
    custom_parameter_1: location,
  })
}

export const trackFormSubmission = (formName: string, success = true) => {
  trackEvent("form_submit", {
    event_category: "Form Interaction",
    event_label: formName,
    custom_parameter_1: success ? "success" : "error",
    value: success ? 1 : 0,
  })
}
