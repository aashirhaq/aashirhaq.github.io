"use client"

import { useEffect } from "react"
import { trackCaseStudyView } from "@/lib/analytics"

/** Records a case-study view once per mount. Renders nothing. */
export function CaseStudyTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackCaseStudyView(slug)
  }, [slug])

  return null
}
