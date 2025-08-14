"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Award, BookOpen } from "lucide-react"
import { PERSONAL_INFO, EDUCATION } from "@/lib/constants"

export function ExperienceSection() {
  const experiences = [
    {
      title: PERSONAL_INFO.currentWork.position,
      company: PERSONAL_INFO.currentWork.company,
      location: PERSONAL_INFO.currentWork.location,
      period: `${PERSONAL_INFO.currentWork.startDate} – ${PERSONAL_INFO.currentWork.currentStatus}`,
      description: `Leading backend development for high-traffic discount platform serving 20M+ users with advanced payment systems and microservices architecture. Currently working ${PERSONAL_INFO.currentWork.type.toLowerCase()} from ${PERSONAL_INFO.location}.`,
      technologies: ["Laravel", "Node.js", "NestJS", "AWS", "Redis", "MySQL", "MongoDB"],
      achievements: [
        `Transitioned to ${PERSONAL_INFO.currentWork.type.toLowerCase()} role in July 2025, maintaining system reliability from ${PERSONAL_INFO.location}`,
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
            {/* Education */}
            <h3 className="text-2xl font-semibold mb-8">Education</h3>
            <div className="space-y-6 mb-8">
              {EDUCATION.degrees.map((edu, index) => (
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

            {/* Online Courses */}
            <h4 className="text-lg font-semibold mb-4">Recent Learning</h4>
            <div className="space-y-3 mb-8">
              {EDUCATION.courses.map((course, index) => (
                <Card
                  key={index}
                  className="p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{course.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {course.platform} • {course.year}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{course.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {course.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Certifications */}
            {EDUCATION.certifications.length > 0 && (
              <>
                <h4 className="text-lg font-semibold mb-4">Certifications</h4>
                <div className="space-y-3">
                  {EDUCATION.certifications.map((cert, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{cert.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {cert.issuer} • {cert.year}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
