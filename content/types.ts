export type Metric = {
  value: string;
  label: string;
};

export type ContactLink = {
  kind: "email" | "linkedin" | "upwork";
  label: string;
  display: string;
  href: string;
};

export type Role = {
  title: string;
  period: string;
  location?: string;
  highlights: string[];
};

export type Experience = {
  id: string;
  organization: string;
  /** Public company website; the organization name links to it when set. */
  organizationUrl?: string;
  /** Shown as a subtle label, e.g. "AI · NLP" */
  domain: string;
  period: string;
  location: string;
  roles: Role[];
  stack: string[];
  metrics?: Metric[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  heading: string;
  body?: string;
  points?: string[];
};

export type FlagshipProject = {
  slug: string;
  tier: "flagship";
  name: string;
  context: string;
  period: string;
  summary: string;
  role: string;
  metrics: Metric[];
  stack: string[];
  links?: ProjectLink[];
  /** Sub-systems rendered as a module map on the detail page. */
  modules?: { name: string; description: string; metric?: string }[];
  sections: ProjectSection[];
};

export type CompactProject = {
  slug: string;
  tier: "compact";
  name: string;
  context: string;
  period: string;
  summary: string;
  points: string[];
  metrics?: Metric[];
  stack: string[];
  links?: ProjectLink[];
};

export type Project = FlagshipProject | CompactProject;

export type SkillGroup = {
  id: string;
  label: string;
  items: string[];
};

export type Certification = {
  name: string;
  issuer?: string;
  date?: string;
  credentialUrl?: string;
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
};
