"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Palette, Zap, Users } from "lucide-react"

export function AboutSection() {
  const skills = [
    "PHP",
    "Laravel",
    "Python",
    "FastAPI",
    "JavaScript",
    "Node.js",
    "TypeScript",
    "NestJS",
    "MySQL",
    "MongoDB",
    "Redis",
    "Elasticsearch",
    "AWS",
    "Docker",
  ]

  const features = [
    {
      icon: Code,
      title: "Backend Architecture",
      description: "Designing scalable microservices and RESTful APIs with Laravel, FastAPI, and Node.js that handle millions of requests efficiently.",
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Improving system performance by 30%+ through caching strategies, database optimization, and modern testing with pytest.",
    },
    {
      icon: Palette,
      title: "Payment Systems Integration",
      description: "Integrating 10+ payment gateways and handling 35K+ daily transactions securely across multiple platforms.",
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Mentoring junior developers and enhancing team productivity through best practices and modern development workflows.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate backend engineer creating innovative solutions that power millions of users worldwide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Backend Engineer specializing in building scalable, cloud-native systems using Laravel, FastAPI, Node.js,
              and AWS. Expert in API performance optimization and microservices architecture with comprehensive testing
              strategies.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Proven record of delivering resilient platforms for 20M+ users and optimizing backend systems through
              caching, logging, and asynchronous processing. Recently completed advanced FastAPI training with pytest
              for modern Python development. I'm passionate about mentoring junior developers and have successfully
              guided 6+ team members, enhancing overall team productivity by 30%.
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 p-4 text-white">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <p className="text-sm font-medium">High Performance</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-orange-500 to-red-500 p-4 text-white">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <p className="text-sm font-medium">Scalable Systems</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-green-500 to-teal-500 p-4 text-white">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-2">🐍</div>
                  <p className="text-sm font-medium">Python & FastAPI</p>
                </div>
              </div>
              <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 p-4 text-white">
                <div className="text-center h-full flex flex-col justify-center">
                  <div className="text-3xl mb-2">👥</div>
                  <p className="text-sm font-medium">Team Leadership</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
