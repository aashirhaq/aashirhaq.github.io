"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Golootlo - DECAGON PAKISTAN PVT. LTD.",
      location: "Karachi, Pakistan",
      period: "Jul 2019 – Present",
      description:
        "Leading backend development for high-traffic discount platform serving 20M+ users with advanced payment systems and microservices architecture.",
      technologies: ["Laravel", "Node.js", "NestJS", "AWS", "Redis", "MySQL", "MongoDB"],
      achievements: [
        "Designed and maintained RESTful APIs serving 20M+ users with 60K+ peak concurrency",
        "Built subscription billing platform integrating 10+ local gateways and CyberSource APIs",
        "Improved API speed by 30% and halved DB load via Redis caching strategy",
        "Handled 500K+ monthly jobs with AWS SQS/SNS, improving reliability to 99.9%",
        "Centralized 5M+ monthly logs using ELK Stack for faster diagnostics",
        "Mentored 6+ juniors, enhancing team productivity by 30%",
      ],
    },
    {
      title: "ERP Developer",
      company: "Wayz Consulting",
      location: "Karachi, Pakistan",
      period: "Jan 2019 – Jun 2019",
      description:
        "Collaborated with multiple clients to develop ERP solutions and implemented automated testing pipelines.",
      technologies: ["PHP", "MySQL", "Selenium", "Jenkins"],
      achievements: [
        "Collaborated with 3+ clients to define technical specs, ensuring accurate delivery",
        "Designed and developed 5+ RESTful APIs for ERP modules in PHP",
        "Reduced deployment errors by 25% via Selenium (Java/TestNG) and Jenkins pipelines",
      ],
    },
    {
      title: "Software Intern",
      company: "Datawisdom",
      location: "Karachi, Pakistan",
      period: "Oct 2017 – Mar 2018",
      description: "Developed e-commerce platform and assisted in legacy system optimization projects.",
      technologies: ["PHP", "MySQL", "ASP.NET", "SQL Server"],
      achievements: [
        "Constructed an e-commerce platform using PHP and MySQL with 200+ product listings",
        "Assisted in ASP.NET/SQL Server projects, optimizing legacy systems",
      ],
    },
  ]

  const education = [
    {
      degree: "MS in Computer Science and Information Technology",
      school: "NED University of Engineering and Technology",
      location: "Karachi, Pakistan",
      period: "2021 – 2022",
      description: "Advanced studies in computer science with focus on software engineering and system architecture.",
      achievements: ["Specialized in Backend Systems", "Advanced Database Management", "Cloud Computing"],
    },
    {
      degree: "BS in Computer Science",
      school: "University of Karachi",
      location: "Karachi, Pakistan",
      period: "2015 – 2018",
      description:
        "Comprehensive computer science education with strong foundation in programming and software development.",
      achievements: ["Software Development", "Database Systems", "Web Technologies"],
    },
  ]

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Experience & Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and educational background that shaped my expertise in backend engineering.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-8">Professional Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <Badge variant="outline" className="w-fit">
                        <Calendar className="h-3 w-3 mr-1" />
                        {exp.period}
                      </Badge>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <span className="font-medium">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {exp.location}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{exp.description}</p>

                    <div className="mb-4">
                      <h5 className="font-medium mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Education</h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                    <div className="text-muted-foreground">
                      <div className="font-medium">{edu.school}</div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {edu.location}
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {edu.period}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3">{edu.description}</p>
                    <div>
                      <h5 className="font-medium mb-2 text-sm">Achievements:</h5>
                      <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Certifications</h4>
              <div className="space-y-3">
                <Card className="p-4">
                  <div className="text-sm font-medium">AWS Certified Solutions Architect</div>
                  <div className="text-xs text-muted-foreground">Amazon Web Services • 2023</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-medium">Google Cloud Professional Developer</div>
                  <div className="text-xs text-muted-foreground">Google Cloud • 2022</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm font-medium">MongoDB Certified Developer</div>
                  <div className="text-xs text-muted-foreground">MongoDB Inc. • 2021</div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
