import type { MetadataRoute } from "next"
import { caseStudies } from "@/content/projects"
import { profile } from "@/content/profile"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${profile.site.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies.map((project) => ({
      url: `${profile.site.url}/work/${project.slug}/`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ]
}
