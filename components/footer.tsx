"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react"
import { PERSONAL_INFO, NAVIGATION_ITEMS } from "@/lib/constants"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: PERSONAL_INFO.social.github, label: "GitHub" },
    { icon: Linkedin, href: PERSONAL_INFO.social.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: PERSONAL_INFO.social.stackoverflow, label: "Stack Overflow" },
    { icon: Mail, href: PERSONAL_INFO.social.email, label: "Email" },
  ]

  const quickLinks = NAVIGATION_ITEMS.filter((item) => item.href !== "#home").map((item) => ({
    label: item.label,
    href: item.href,
  }))

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {PERSONAL_INFO.displayName}
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              {PERSONAL_INFO.title} passionate about creating exceptional digital experiences that scale.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((link, index) => (
                <Button key={index} variant="ghost" size="icon" asChild className="hover:text-purple-600">
                  <a href={link.href} aria-label={link.label}>
                    <link.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Get In Touch</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>{PERSONAL_INFO.email}</p>
              <p>{PERSONAL_INFO.phone}</p>
              <p>{PERSONAL_INFO.location}</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center mt-2 sm:mt-0">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  )
}
