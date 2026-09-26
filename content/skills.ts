import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    id: "ai",
    label: "AI / ML",
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "NLP",
      "Transfer Learning",
      "RAG",
      "Vector Embeddings",
      "Semantic Search",
      "LLM APIs (Claude, OpenAI)",
      "Google Gemini API",
      "Groq (Llama 3.1)",
      "LangChain",
      "CLIP",
      "sentence-transformers",
      "Model Evaluation & Drift Monitoring",
      "CUDA Inference",
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: ["Python", "PHP", "Laravel", "Node.js", "Express.js", "NestJS", "FastAPI", "REST API Design", "GraphQL"],
  },
  {
    id: "architecture",
    label: "Architecture",
    items: ["Microservices", "Distributed Systems", "Event-Driven Architecture", "System Design", "Performance Optimization"],
  },
  {
    id: "data",
    label: "Databases & Caching",
    items: ["MySQL", "PostgreSQL", "MongoDB", "AWS DocumentDB", "Redis"],
  },
  {
    id: "search",
    label: "Search",
    items: ["Elasticsearch", "AWS OpenSearch", "Qdrant (Vector DB)"],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    items: ["AWS EC2", "AWS S3", "AWS RDS", "AWS SQS", "AWS SNS", "AWS ElastiCache", "Jenkins", "GitHub Actions", "CI/CD", "Git", "Linux"],
  },
  {
    id: "payments",
    label: "Payments",
    items: ["Stripe", "CyberSource", "RAAST", "1Link", "PayFast", "Subscription Billing", "Webhooks"],
  },
  {
    id: "security",
    label: "Security",
    items: ["OAuth 2.0", "JWT", "RBAC", "API Authentication"],
  },
  {
    id: "observability",
    label: "Observability",
    items: ["Elasticsearch", "Logstash", "Kibana"],
  },
  {
    id: "tooling",
    label: "Data & Tooling",
    items: ["pandas", "Streamlit", "Selenium"],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: ["TypeScript", "JavaScript", "React", "Next.js", "HTML", "CSS"],
  },
  {
    id: "ai-tools",
    label: "AI Dev Tools",
    items: ["Claude Code", "Cursor", "ChatGPT"],
  },
];
