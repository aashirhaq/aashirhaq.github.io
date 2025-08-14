"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Database, Server, Cloud } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { PERSONAL_INFO } from "@/lib/constants"

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
        event_label: PERSONAL_INFO.resume.filename,
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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-8 pb-0">
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
                {PERSONAL_INFO.name}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 lg:mb-8 leading-relaxed">
              {PERSONAL_INFO.description}
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
                className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white text-sm sm:text-base bg-transparent"
                asChild
              >
                <a
                  href={PERSONAL_INFO.resume.path}
                  download={PERSONAL_INFO.resume.filename}
                  onClick={trackResumeDownload}
                >
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-4 lg:space-x-6">
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href={PERSONAL_INFO.social.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href={PERSONAL_INFO.social.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 lg:h-6 lg:w-6" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-purple-600" asChild>
                <a href={PERSONAL_INFO.social.email}>
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
                    src={PERSONAL_INFO.images.profile || "/placeholder.svg"}
                    alt={PERSONAL_INFO.name}
                    width={320}
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Custom CSS for slower pulse animation */}
              <style jsx>{`
                .slow-pulse {
                  animation: slow-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                
                @keyframes slow-pulse {
                  0%, 100% {
                    opacity: 1;
                  }
                  50% {
                    opacity: 0.7;
                  }
                }
              `}</style>

              {/* Tech stack floating icons with logos and hover tooltips */}
              {/* 1. Laravel - Top Right */}
              <div
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                title="Laravel"
              >
                {/* Laravel Logo SVG */}
                <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974c0-.033.005-.066.014-.098.003-.012.01-.02.014-.032a.369.369 0 01.023-.058c.004-.013.015-.022.023-.033l.033-.045c.012-.01.025-.018.037-.027.014-.012.027-.024.041-.034H.53L5.043.05a.375.375 0 01.375 0L9.93 2.647h.002c.015.01.027.021.04.033.012.009.025.018.037.027.013.014.02.03.033.045.008.011.02.021.025.033.01.02.017.038.024.058.003.011.01.021.013.032.01.031.014.064.014.098v9.652l3.76-2.164V5.527c0-.033.004-.066.013-.098.003-.01.01-.02.013-.032a.487.487 0 01.024-.059c.007-.012.018-.02.025-.033.012-.015.021-.030.033-.043.012-.012.025-.02.037-.027.014-.013.026-.023.041-.032h.001l4.513-2.598a.375.375 0 01.375 0l4.513 2.598c.016.01.027.021.042.031.012.01.025.018.036.028.013.014.022.03.034.044.008.012.018.021.024.033.011.02.018.04.024.06.006.01.012.021.015.032zm-.74 5.032V6.179l-1.578.908-2.182 1.256v4.283zm-4.51 7.75v-4.287l-2.147 1.225-6.126 3.498v4.325zM1.093 3.624v14.588l8.273 4.761v-4.325l-4.322-2.445-.002-.003H5.04c-.014-.01-.025-.021-.04-.031-.011-.01-.024-.018-.035-.027l-.001-.002c-.013-.012-.021-.025-.031-.04-.01-.011-.021-.02-.028-.032v-.002c-.008-.014-.013-.031-.02-.047-.006-.016-.014-.027-.018-.043a.49.49 0 01-.008-.057c-.002-.014-.006-.027-.006-.041V5.789l-2.18-1.257zM5.23.81L1.47 2.974l3.76 2.164 3.758-2.164zm1.956 13.505l2.182-1.256V3.624l-1.58.91-2.182 1.255v9.435zm11.581-10.95l-3.76 2.163 3.76 2.163 3.759-2.164zm-.376 4.978L16.21 7.087 14.63 6.18v4.283l2.182 1.256 1.58.908zm-8.65 9.654l5.514-3.148 2.756-1.572-3.757-2.163-4.323 2.489-3.941 2.27z" />
                </svg>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  Laravel
                </div>
              </div>

              {/* 2. FastAPI - Top Left */}
              <div
                className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                style={{ animationDelay: "1s" }}
                title="FastAPI"
              >
                <span className="font-mono">⚡</span>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  FastAPI
                </div>
              </div>

              {/* 3. MySQL - Middle Left */}
              <div
                className="absolute top-1/2 -left-4 sm:-left-6 lg:-left-8 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                style={{ animationDelay: "2s" }}
                title="MySQL"
              >
                <Database className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  MySQL
                </div>
              </div>

              {/* 4. MongoDB - Middle Right */}
              <div
                className="absolute bottom-1/3 -right-3 sm:-right-4 lg:-right-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                style={{ animationDelay: "3s" }}
                title="MongoDB"
              >
                {/* MongoDB Logo SVG */}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
                </svg>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  MongoDB
                </div>
              </div>

              {/* 5. Node.js - Bottom Left */}
              <div
                className="absolute -bottom-2 left-1/4 sm:-bottom-4 sm:left-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-lime-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                style={{ animationDelay: "4s" }}
                title="Node.js"
              >
                <Server className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  Node.js
                </div>
              </div>

              {/* 6. AWS - Bottom Right */}
              <div
                className="absolute -bottom-4 right-1/3 sm:-bottom-6 sm:right-1/3 lg:-bottom-8 lg:right-1/3 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer group slow-pulse"
                style={{ animationDelay: "5s" }}
                title="AWS"
              >
                <Cloud className="h-4 w-4 sm:h-5 sm:w-5" />
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                  AWS
                </div>
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
