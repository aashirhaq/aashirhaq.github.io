"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { trackFormSubmission } from "./analytics"
import { PERSONAL_INFO, CONTACT_FORM } from "@/lib/constants"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      const response = await fetch(CONTACT_FORM.formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        // Track successful form submission
        trackFormSubmission("Contact Form", true)
      } else {
        setSubmitStatus("error")
        // Track failed form submission
        trackFormSubmission("Contact Form", false)
      }
    } catch (error) {
      setSubmitStatus("error")
      // Track failed form submission
      trackFormSubmission("Contact Form", false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

    const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: PERSONAL_INFO.email,
      href: PERSONAL_INFO.social.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: PERSONAL_INFO.phone,
      href: PERSONAL_INFO.social.phone,
    },
    {
      icon: MapPin,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: "#",
    },
  ]

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you. Let's create something amazing
            together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Formspree Configuration Fields */}
                <input type="hidden" name="_subject" value={CONTACT_FORM.subjects.default} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                {/* Honeypot Field - Hidden from users but visible to bots */}
                <div style={{ display: "none" }}>
                  <label htmlFor="_gotcha">Don't fill this out if you're human:</label>
                  <input type="text" name="_gotcha" id="_gotcha" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Alternative honeypot with common bot-targeted names */}
                <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                <input type="email" name="email_confirm" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                      autoComplete="name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    required
                    disabled={isSubmitting}
                    autoComplete="off"
                  />
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-md">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thank you! Your message has been sent successfully. I'll get back to you soon.</span>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-5 w-5" />
                    <span>Sorry, there was an error sending your message. Please try again or email me directly.</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                {/* Anti-spam notice */}
                <p className="text-xs text-muted-foreground text-center">
                  This form is protected against spam. Your privacy is important to us.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Let's Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  I'm always open to discussing new opportunities, creative projects, or just having a chat about
                  technology and design.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                        <info.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{info.label}</div>
                        <a href={info.href} className="font-medium hover:text-purple-600 transition-colors">
                          {info.value}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ready to Start?</h3>
                <p className="text-purple-100 mb-4">Let's discuss your project and bring your ideas to life.</p>
                <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  Schedule a Call
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>
      </div>
    </section>
  )
}
