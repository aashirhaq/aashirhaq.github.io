"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Google Analytics tracking function
  const trackResumeDownload = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "download", {
        event_category: "Resume",
        event_label: "Aashir_Haque_Resume.pdf",
        value: 1,
      })

      // Also track as a custom event
      window.gtag("event", "resume_download", {
        event_category: "Engagement",
        event_label: "Hero Section",
        custom_parameter_1: "resume_pdf",
      })
    }
  }

  if (!mounted) return null

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 pb-8">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Floating elements - Hidden on mobile for cleaner look */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 dark:bg-purple-800 rounded-full opacity-20 animate-pulse hidden md:block"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 dark:bg-pink-800 rounded-full opacity-20 animate-pulse delay-1000 hidden md:block"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200 dark:bg-yellow-800 rounded-full opacity-20 animate-pulse delay-2000 hidden md:block"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6">
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent leading-tight">
                Muhammad Aashir ul Haque
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              Senior Backend Engineer building scalable, cloud-native systems for 20M+ users. Laravel, Node.js, and AWS
              expert specializing in high-performance solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center lg:justify-start mb-6 lg:mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-sm sm:text-base"
                asChild
              >
                <a href="#projects">View My Work</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-sm sm:text-base"
                asChild
              >
                <a
                  href="/downloads/Aashir_Haque_Resume.pdf"
                  download="Aashir_Haque_Resume.pdf"
                  onClick={trackResumeDownload}
                >
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 lg:space-x-6">
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href="https://github.com/aashirhaq" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href="https://www.linkedin.com/in/aashirhaq" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href="mailto:aashirulhaque@gmail.com">
                  <Mail className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-2">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/images/profile.jpg"
                    alt="Muhammad Aashir ul Haque"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Tech stack floating icons - Responsive sizing */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm lg:text-lg animate-pulse shadow-lg">
                PHP
              </div>

              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm animate-pulse delay-500 shadow-lg">
                Laravel
              </div>

              <div className="absolute top-1/2 -left-4 sm:-left-6 lg:-left-8 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse delay-1000 shadow-lg">
                AWS
              </div>

              <div className="absolute -bottom-2 left-1/4 sm:-bottom-4 sm:left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse delay-2000 shadow-lg">
                API
              </div>

              <div className="absolute bottom-1/3 -right-3 sm:-right-4 lg:-right-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse delay-1500 shadow-lg">
                Node.js
              </div>

              <div className="absolute -bottom-4 right-1/3 sm:-bottom-6 sm:right-1/3 lg:-bottom-8 lg:right-1/3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs animate-pulse delay-2500 shadow-lg">
                MySQL
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground" />
      </div>
    </section>
  )
}
