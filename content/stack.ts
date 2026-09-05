import type { StackDomain } from "./types"

/**
 * Skills grouped by the engineering problem they solve, not by badge count.
 * Everything here appears in the résumé's technical skills section or in a
 * documented role.
 */
export const stackDomains: StackDomain[] = [
  {
    id: "backend",
    name: "Backend",
    summary: "Where most of the six years went. API design, service boundaries, and the code that has to be correct.",
    items: ["Laravel", "Node.js", "NestJS", "Express.js", "FastAPI", "REST API design", "GraphQL", "PHP", "Python", "TypeScript"],
  },
  {
    id: "data",
    name: "Databases",
    summary: "Relational as system of record, document stores for volume, and knowing which one a problem actually needs.",
    items: ["MySQL", "PostgreSQL", "MongoDB", "AWS DocumentDB", "SQL", "Query optimisation"],
  },
  {
    id: "search",
    name: "Search & caching",
    summary: "Read-optimised projections and the cache in front of them — the pairing that halved database load.",
    items: ["Elasticsearch", "AWS OpenSearch", "Redis", "AWS ElastiCache", "Relevance tuning", "Geo-scoped search"],
  },
  {
    id: "messaging",
    name: "Messaging & async",
    short: "Messaging",
    summary: "Getting expensive work off the request path so spikes are absorbed instead of felt.",
    items: ["AWS SQS", "AWS SNS", "Event-driven architecture", "Background workers", "Fan-out processing"],
  },
  {
    id: "cloud",
    name: "Cloud & delivery",
    summary: "Running services in AWS and shipping them without downtime, including major framework upgrades.",
    items: ["AWS EC2", "AWS S3", "AWS RDS", "Jenkins", "CI/CD", "GitHub Actions", "Linux", "Git"],
  },
  {
    id: "payments",
    name: "Payments",
    summary: "Card processors, bank rails and instant settlement, normalised behind one interface.",
    items: ["Stripe", "CyberSource", "RAAST", "1Link", "PayFast", "Subscription billing", "Payment orchestration"],
  },
  {
    id: "observability",
    name: "Observability & security",
    short: "Observability",
    summary: "Systems you can see into, and access control that holds.",
    items: ["ELK Stack", "Kibana", "Logstash", "OAuth 2.0", "JWT", "RBAC", "pytest", "PHPUnit", "Selenium"],
  },
  {
    id: "ai",
    name: "AI / ML",
    summary: "Current focus — production NLP pipelines with the same engineering discipline as the backend work.",
    items: ["PyTorch", "Hugging Face Transformers", "DistilBERT", "Transfer learning", "RAG", "NLP", "pandas", "Streamlit"],
  },
]

/**
 * Edges for the stack constellation. Each pair reflects a relationship that
 * actually exists in the described systems.
 */
export const stackRelations: Array<[string, string]> = [
  ["backend", "data"],
  ["backend", "search"],
  ["backend", "messaging"],
  ["backend", "payments"],
  ["backend", "cloud"],
  ["data", "search"],
  ["messaging", "cloud"],
  ["messaging", "payments"],
  ["payments", "observability"],
  ["search", "cloud"],
  ["observability", "cloud"],
  ["ai", "backend"],
  ["ai", "cloud"],
]
