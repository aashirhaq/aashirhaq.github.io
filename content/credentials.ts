import type { Certification, Education } from "./types";

// Issuer and date taken from the credential pages linked below (verified 2026-09-26).
export const certifications: Certification[] = [
  {
    name: "Break into AI: Data Annotation Essentials",
    issuer: "LinkedIn Learning",
    date: "Aug 2026",
    credentialUrl:
      "https://www.linkedin.com/learning/certificates/3fc36b733d4b2825acaa84bf7a86ec05309e7df51ef1dbb979a1a4b1824e3eea/",
  },
  {
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    date: "Aug 2026",
    credentialUrl: "https://www.deeplearning.ai/certificates/fdace80a-84da-4a4c-93a3-e9cac74e1f14",
  },
];

export const education: Education[] = [
  {
    degree: "Master of Science in Computer Science & Information Technology",
    institution: "NED University of Engineering and Technology",
    period: "2022",
    location: "Karachi, Pakistan",
  },
  {
    degree: "Bachelor's in Computer Science",
    institution: "University of Karachi",
    period: "2015 — 2018",
    location: "Karachi, Pakistan",
  },
];
