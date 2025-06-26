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
