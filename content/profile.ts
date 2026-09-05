/**
 * Canonical profile data. Sourced from the résumé (primary) and the LinkedIn
 * export (secondary). Nothing here is invented — if a fact is not in one of
 * those documents or the previous site, it does not belong in this file.
 */

export const profile = {
  name: "Aashir ul Haque",
  shortName: "Aashir Haque",
  initials: "AH",
  /** Overall professional specialisation and level — distinct from the current job title. */
  role: "Backend & Distributed Systems Engineer",
  experienceLabel: "6+ years",
  /** The employer-assigned title today. Accurate, but not the site's positioning. */
  currentRole: "Junior AI Engineer",
  currentCompany: "Stats AI",
  location: "Glen Ellyn, IL, USA",
  workAuthorization: "Authorized to work in the US without sponsorship",

  /** Five-second pitch. Reads as one sentence, no buzzword soup. */
  headline: "I build backend systems that stay up when the traffic doesn't stop.",
  summary:
    "Six years designing payment, search and event-driven infrastructure for a loyalty platform that grew from 8M to 24M+ users. Now applying the same systems thinking to production NLP pipelines.",

  email: "aashirulhaque@gmail.com",
  phone: "+1 (630) 945-2396",

  social: {
    github: "https://github.com/aashirhaq",
    linkedin: "https://www.linkedin.com/in/aashirhaq",
    stackoverflow: "https://stackoverflow.com/users/7940641/aashir-haque",
  },

  resume: {
    path: "/downloads/Aashir_Haque_Resume.pdf",
    filename: "Aashir_Haque_Resume.pdf",
  },

  site: {
    url: "https://aashirhaq.github.io",
    title: "Aashir ul Haque — Backend & Distributed Systems Engineer",
    description:
      "Backend engineer with 6+ years building payment, search and event-driven systems for 24M+ users. Laravel, Node.js, Python, Elasticsearch, Redis and AWS.",
    keywords: [
      "backend engineer",
      "distributed systems",
      "payment systems",
      "Elasticsearch",
      "Laravel",
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "AWS",
      "Redis",
      "microservices",
      "Aashir ul Haque",
    ],
    ogImage: "/og.png",
  },

  analytics: {
    googleAnalyticsId: "G-PWEQ5RJ569",
  },

  contactFormEndpoint: "https://formspree.io/f/mnnvgrdd",
} as const

/** Headline numbers. Every one traces to a résumé or LinkedIn bullet. */
export const impactMetrics = [
  { value: "24M+", label: "users served", note: "scaled from 8M" },
  { value: "60K+", label: "peak concurrency", note: "sub-500ms search" },
  { value: "35K+", label: "daily transactions", note: "10+ payment gateways" },
  { value: "99.95%", label: "uptime", note: "across a 10+ engineer team" },
] as const

export const education = [
  {
    // Résumé wording, confirmed by Aashir over the shorter LinkedIn label.
    degree: "MS, Computer Science & Information Technology",
    school: "NED University of Engineering and Technology",
    location: "Karachi, Pakistan",
    period: "2021 – 2022",
  },
  {
    degree: "BS, Computer Science",
    school: "University of Karachi",
    location: "Karachi, Pakistan",
    period: "2015 – 2018",
  },
] as const

export const certifications: Array<{ name: string; issuer?: string; year?: string }> = [
  // The LinkedIn export lists these two by name only — no issuer is stated there,
  // so none is claimed here.
  { name: "Supervised Machine Learning: Regression and Classification" },
  { name: "Break into AI: Data Annotation Essentials" },
  { name: "FastAPI — From Beginner to Advanced", issuer: "Udemy", year: "2025" },
]

export const navigation = [
  { href: "/#experience", label: "Experience" },
  { href: "/#work", label: "Work" },
  { href: "/#stack", label: "Stack" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const
