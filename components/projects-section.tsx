"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"

export function ProjectsSection() {
  const projects = [
    {
      title: "Golootlo - High-Traffic Discounts Platform",
      description:
        "Designed RESTful APIs serving 20M+ users with 60K+ peak concurrency. Built subscription billing platform integrating 10+ local gateways and CyberSource APIs, enabling 35K+ daily transactions.",
      image: "/images/golootlo.jpg",
      technologies: ["Laravel", "MySQL", "MongoDB", "Elasticsearch", "CyberSource", "NestJS", "Redis", "AWS"],
      liveUrl: "https://golootlo.pk/",
      githubUrl: "#",
      featured: true,
      company: "DECAGON PAKISTAN",
      period: "2019-Present",
    },
    {
      title: "Your Rewards - Employee Benefits Platform",
      description:
        "Established a backend portal for managing 500+ partner deals. Integrated Elasticsearch to enable precise geo-targeted partner search, reducing search response time by 40%.",
      image: "/images/project1.jpg",
      technologies: ["Laravel", "MySQL", "Elasticsearch", "REST APIs"],
      liveUrl: "https://yourrewards.io/",
      githubUrl: "#",
      featured: true,
      company: "Dubai Project",
      period: "2022",
    },
    {
      title: "The Huntr - Digital Media Platform",
      description:
        "Engineered Laravel backend and RESTful APIs for members-only platform. Enabled location-based search with Elasticsearch and integrated Stripe subscriptions for 20K+ users.",
      image: "/images/project2.jpg",
      technologies: ["Laravel", "MySQL", "Elasticsearch", "Stripe", "REST APIs"],
      liveUrl: "https://thehuntr.com",
      githubUrl: "#",
      featured: false,
      period: "2023",
    },
    {
      title: "Karachi Water & Sewerage Board",
      description:
        "Created water tanker ordering interface with geolocation-based pricing algorithm. Reduced manual booking errors by 40% handling 1,000+ daily orders.",
      image: "/images/project3.jpg",
      technologies: ["Laravel", "MySQL", "REST APIs"],
      liveUrl: "https://play.google.com/store/apps/details?id=com.hta.kwsb.ots&hl=en",
      githubUrl: "#",
      featured: false,
      period: "2024",
    },
    {
      title: "Extensia - Volunteer Management System",
      description:
        "Crafted two mobile-first web apps using Next.js for mosque volunteer management. Integrated AWS Cognito for secure authentication with check-in/out system.",
      image: "/images/project4.jpg",
      technologies: ["React", "Next.js", "AWS Cognito"],
      liveUrl: "https://extensia.cloud/",
      githubUrl: "#",
      featured: false,
      period: "2025",
    },
  ]

  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, demonstrating various technologies and problem-solving approaches.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-white/20 backdrop-blur-sm hover:bg-white/30" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg">{project.title}</span>
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">Featured</Badge>
                </CardTitle>
                <div className="text-sm text-muted-foreground">
                  {project.company} • {project.period}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Other Projects */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={500}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{project.period}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
