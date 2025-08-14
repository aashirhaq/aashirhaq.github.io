"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "PHP", level: 95 },
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 60 },
        { name: "SQL", level: 90 },
        { name: "C#", level: 30 },
      ],
    },
    {
      title: "Backend & Frontend Frameworks",
      skills: [
        { name: "Laravel", level: 95 },
        { name: "FastAPI", level: 85 },
        { name: "Node.js", level: 60 },
        { name: "Express.js", level: 60 },
        { name: "NestJS", level: 55 },
        { name: "Next.js", level: 50 },
      ],
    },
    {
      title: "Databases & Testing",
      skills: [
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 75 },
        { name: "Redis", level: 95 },
        { name: "Elasticsearch", level: 75 },
        { name: "pytest", level: 80 },
        { name: "PHPUnit", level: 85 },
      ],
    },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across backend technologies, databases, and cloud platforms with proven track record
            of optimization and scalability.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Competency Summary */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Professional Competency</h3>
                  <p className="text-purple-100 mb-4">
                    Demonstrated expertise in architecting and optimizing high-traffic backend systems serving{" "}
                    <strong>20M+ users</strong>. Proven ability to deliver <strong>30%+ performance gains</strong>{" "}
                    through advanced caching strategies and architectural improvements. Recently expanded expertise with{" "}
                    <strong>FastAPI and pytest</strong> for modern Python development.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Payment Systems (10+ gateway integrations)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Cloud Architecture (99.9% system reliability)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>FastAPI & pytest (Modern Python development)</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                      <span>Team Leadership (30% productivity improvement)</span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <div className="absolute inset-0 rounded-full border-4 border-white/30"></div>
                    <div
                      className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"
                      style={{ animationDuration: "3s" }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">93</div>
                        <div className="text-sm">/ 100</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold">Senior Backend Engineer</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
