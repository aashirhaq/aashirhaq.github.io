import type { ContactLink, Metric } from "./types";

export const profile = {
  name: "Aashir ul Haque",
  shortName: "Aashir",
  positioning: "Backend & AI Engineer",
  positioningDetail: "Scalable Systems, Payments & LLMs",
  location: "Illinois, USA",
  heroStatement:
    "I build backend systems that scale — payments, search and event-driven platforms serving 24M+ users — and now bring that production discipline to AI.",
  /** Typed over the robot intro: a setup line, then the payoff before the camera enters the chip. */
  introCaption: ["24M+ users. 60K+ concurrent. 99.95% uptime.", "Meet the engineer behind them."],
  heroIndicators: [
    { value: "24M+", label: "users served" },
    { value: "60K+", label: "peak concurrency" },
    { value: "99.95%", label: "uptime" },
  ] satisfies Metric[],

  about: {
    profile:
      "Software engineer with 6+ years of production experience building high-scale systems with Python, PHP and JavaScript/TypeScript on AWS. At Golootlo I designed payment, subscription and search infrastructure for a platform that grew from 8M to 24M+ users, and led a 10+ person backend team.",
    focus: [
      "Distributed systems and event-driven architecture",
      "Payment orchestration and subscription billing",
      "Search infrastructure and performance optimization",
      "API design — REST and GraphQL, secured with OAuth 2.0 and JWT",
    ],
    current:
      "Now applying that production discipline to AI at Stats AI — fine-tuning transformer models, building RAG pipelines, integrating LLM APIs, and monitoring models in production.",
    scale: [
      { value: "24M+", label: "users on the platform" },
      { value: "35K+", label: "daily payment transactions" },
      { value: "500K+", label: "monthly background jobs" },
      { value: "50+", label: "production APIs" },
      { value: "10+", label: "engineers led & mentored" },
      { value: "6+ yrs", label: "production engineering" },
    ] satisfies Metric[],
  },

  email: "aashirulhaque@gmail.com",
  contact: [
    {
      kind: "email",
      label: "Email",
      display: "aashirulhaque@gmail.com",
      href: "mailto:aashirulhaque@gmail.com",
    },
    {
      kind: "linkedin",
      label: "LinkedIn",
      display: "linkedin.com/in/aashirhaq",
      href: "https://www.linkedin.com/in/aashirhaq",
    },
    {
      kind: "upwork",
      label: "Upwork",
      display: "Upwork profile",
      href: "https://www.upwork.com/freelancers/~01fe2b056168506b57",
    },
  ] satisfies ContactLink[],

  contactFormEndpoint: "https://formspree.io/f/mnnvgrdd",

  /**
   * TODO(owner): add the phone-free resume at public/documents/aashir-ul-haque-resume.pdf
   * (source: source-material/resume-public.pdf). The Download Resume button is only
   * rendered when this file exists at build time, so the phone-number version never ships.
   */
  resumePath: "/documents/aashir-ul-haque-resume.pdf",
} as const;
