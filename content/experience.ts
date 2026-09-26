import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "stats-ai",
    organization: "Stats AI",
    domain: "AI · NLP · LLMs",
    period: "Jan 2026 — Present",
    location: "Remote · Illinois, USA",
    roles: [
      {
        title: "Junior AI Engineer",
        period: "Aug 2026 — Present",
        highlights: [
          "Designed and deployed a retrieval-augmented generation (RAG) pipeline using vector embeddings and semantic search to answer natural-language queries over unstructured review data — cutting manual lookup time by 80% and serving results through a production API endpoint.",
          "Integrated LLM APIs (Anthropic Claude / OpenAI) into the sentiment pipeline to auto-generate human-readable summaries and actionable insights, reducing analyst reporting time from hours to minutes.",
          "Built an automated model evaluation and monitoring framework tracking accuracy, F1 drift and inference latency across model versions — enabling data-driven retraining decisions and cutting production error rate by 15%.",
        ],
      },
      {
        title: "AI Engineering Intern",
        period: "Jan 2026 — Aug 2026",
        highlights: [
          "Built a modular Python pipeline for NLP processing of Steam game reviews, integrating REST APIs, DistilBERT, Hugging Face Transformers and PyTorch — 89%+ classification accuracy across 10K+ reviews.",
          "Fine-tuned DistilBERT on domain-specific gaming reviews with transfer learning, improving F1 by 12% over the pre-trained baseline.",
          "Deployed a live Streamlit dashboard with automated daily refresh via GitHub Actions and CUDA-accelerated PyTorch inference, reducing manual analysis time by ~70%.",
          "Designed a reusable inference pipeline with configurable batch sizes and async data fetching, so new game titles can be added with minimal code changes.",
          "Contributed to a multimodal reverse image search system — CLIP embeddings for 5,000+ images in Qdrant Cloud, text-to-image and image-to-image similarity search, and LLM-generated summaries via LangChain with Gemini/Groq fallbacks, served through Streamlit.",
        ],
      },
    ],
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "RAG",
      "CLIP",
      "Qdrant",
      "LangChain",
      "Claude / OpenAI APIs",
      "Streamlit",
      "pandas",
      "GitHub Actions",
    ],
    metrics: [
      { value: "89%+", label: "classification accuracy" },
      { value: "+12%", label: "F1 over baseline" },
      { value: "−80%", label: "manual lookup time" },
    ],
  },
  {
    id: "golootlo-senior",
    organization: "Golootlo (DECAGON)",
    organizationUrl: "https://golootlo.pk/",
    domain: "Fintech · Payments · Loyalty",
    period: "Jan 2022 — Sep 2025",
    location: "Karachi, Pakistan",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Jan 2022 — Sep 2025",
        highlights: [
          "Designed and architected REST and GraphQL APIs (Laravel, Node.js, NestJS) with OAuth 2.0 and JWT authentication across distributed systems supporting 24M+ users and 60K+ peak concurrency.",
          "Architected a centralized payment microservice integrating 10+ gateways (1Link, RAAST, CyberSource) for one-time and recurring payments — contributing to 60% revenue growth as the platform scaled from 8M to 24M+ users.",
          "Built the subscription billing platform, improving transaction success by 18% across 35K+ daily transactions; designed the subscription module with dynamic packages, automated eligibility checks and per-feature gating.",
          "Integrated real-time QR payments via RAAST (government-backed instant payment rail), enabling instant merchant settlements.",
          "Redesigned the Elasticsearch layer serving 50+ customer-facing APIs — sub-500ms responses under 60K+ concurrent users. Reduced database load by 50% and API latency by 30% with Redis caching and query optimization.",
          "Owned incident response and architecture standards across 50+ production APIs, reducing P1 incident frequency by 35%.",
          "Implemented the ELK stack for centralized payment and system log monitoring; migrated logs and historical data to AWS DocumentDB, offloading 24M+ user records and reducing RDS costs.",
          "Led, mentored and hired backend engineers across a 10+ person team — 99.95% uptime, 40% fewer production bugs and 25% shorter release cycles through Agile/Scrum.",
        ],
      },
    ],
    stack: ["Laravel", "Node.js", "NestJS", "GraphQL", "Elasticsearch", "Redis", "MySQL", "AWS", "ELK"],
    metrics: [
      { value: "24M+", label: "users" },
      { value: "99.95%", label: "uptime" },
      { value: "−35%", label: "P1 incidents" },
    ],
  },
  {
    id: "golootlo",
    organization: "Golootlo (DECAGON)",
    organizationUrl: "https://golootlo.pk/",
    domain: "Search · Microservices · Gaming",
    period: "Jul 2019 — Mar 2022",
    location: "Karachi, Pakistan",
    roles: [
      {
        title: "Software Engineer",
        period: "Jul 2019 — Mar 2022",
        highlights: [
          "Designed and integrated a centralized Elasticsearch layer as the read-optimized data source for 35+ customer-facing APIs (orders, QR deals, merchants), reducing API response times by 50%.",
          "Maintained dual-database sync (MySQL + Elasticsearch), keeping data consistent across 8M+ users with zero data loss.",
          "Built a fantasy cricket platform from scratch in 30 days — 50K+ players across PSL tournaments, dynamic rule engine, real-time leaderboards and automated background scoring on AWS SQS/SNS for 25K+ teams per match.",
          "Onboarded 100K+ new customers in the first PSL tournament cycle through the fantasy league integration.",
          "Contributed to the monolith-to-microservices migration, splitting search, payments and orders into independent services.",
        ],
      },
    ],
    stack: ["Laravel", "PHP", "Elasticsearch", "MySQL", "AWS SQS/SNS", "Microservices"],
    metrics: [
      { value: "−50%", label: "API response time" },
      { value: "100K+", label: "customers onboarded" },
    ],
  },
  {
    id: "wayz",
    organization: "WayZ Consulting",
    domain: "ERP · QA Automation",
    period: "Jan 2019 — Jun 2019",
    location: "Karachi, Pakistan",
    roles: [
      {
        title: "ERP Developer",
        period: "Jan 2019 — Jun 2019",
        highlights: [
          "Customized FrontAccounting (open-source PHP/MySQL ERP) for client requirements across sales orders, invoicing, purchase orders and inventory.",
          "Built automated Selenium test scripts to speed up ERP regression testing and reduce manual QA effort.",
          "Introduced Git version control to the organization and trained the team on branching and collaborative workflows.",
        ],
      },
    ],
    stack: ["PHP", "MySQL", "FrontAccounting", "Selenium", "Git"],
  },
  {
    id: "jamia",
    organization: "Jamia Arabia Ahsan Ul Uloom",
    domain: "Web · Digital Services",
    period: "Jul 2015 — Aug 2021",
    location: "Karachi, Pakistan",
    roles: [
      {
        title: "Web & Digital Services Provider",
        period: "Jul 2015 — Aug 2021",
        highlights: [
          "Built and maintained jamiaahsan.com, an Islamic education platform serving thousands of users — lecture libraries, live broadcast streaming, student registration, class management and book downloads.",
          "Developed REST APIs consumed by a React-based mobile app for content delivery, student management and classroom operations.",
          "Managed digital content operations including the YouTube channel, WhatsApp broadcasts and email communications.",
        ],
      },
    ],
    stack: ["PHP", "MySQL", "REST APIs", "Streaming"],
  },
  {
    id: "datawisdom",
    organization: "datawisdom",
    domain: "Web Development",
    period: "Aug 2017 — Jan 2018",
    location: "Karachi, Pakistan",
    roles: [
      {
        title: "Web Developer Intern",
        period: "Aug 2017 — Jan 2018",
        highlights: [
          "Developed websites and e-commerce features using PHP and MySQL under senior developer supervision.",
          "Gained hands-on experience in database design, server-side scripting and JavaScript front-end integration.",
        ],
      },
    ],
    stack: ["PHP", "MySQL", "JavaScript"],
  },
];
