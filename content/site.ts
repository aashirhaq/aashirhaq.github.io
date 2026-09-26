export const site = {
  url: "https://aashirhaq.github.io",
  title: "Aashir ul Haque — Backend & AI Engineer",
  description:
    "Backend & AI engineer building scalable systems, payments and LLM-powered pipelines. 6+ years of production engineering on platforms serving 24M+ users.",
  locale: "en_US",
  gaMeasurementId: "G-PWEQ5RJ569",
} as const;

export const navSections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navSections)[number]["id"];
