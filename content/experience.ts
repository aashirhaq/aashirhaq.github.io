import type { Experience } from "./types"

export const experiences: Experience[] = [
  {
    id: "stats-ai",
    company: "Stats AI",
    location: "Remote — IL, USA",
    period: "Jan 2026 — Present",
    roles: [
      { title: "Junior AI Engineer", period: "Aug 2026 — Present" },
      { title: "AI Engineering Intern", period: "Jan 2026 — Aug 2026" },
    ],
    context: "Applied NLP over public game-review data.",
    featured: true,
    story: {
      problem:
        "Analysts read Steam reviews by hand to work out how a title was being received. It did not scale past a handful of games, and the read was subjective.",
      scale:
        "10K+ reviews per pass, refreshed daily, across a growing set of game titles.",
      system:
        "A modular Python pipeline: async fetch from the Steam Web API, batched DistilBERT inference on PyTorch with CUDA, aggregation in pandas, and a Streamlit dashboard refreshed nightly by GitHub Actions. A retrieval-augmented layer answers natural-language questions over the same corpus via vector embeddings and semantic search.",
      contribution:
        "I designed the pipeline as configurable stages — batch size and data source are inputs, not assumptions — so adding a title is a config change rather than new code. I fine-tuned DistilBERT on gaming-domain reviews with transfer learning, wired LLM APIs in to turn aggregated numbers into readable summaries, and built the evaluation harness that tracks accuracy, F1 drift and inference latency across model versions.",
      result:
        "89%+ classification accuracy, a 12% F1 improvement over the pre-trained baseline, ~70% less manual analysis time, 80% less manual lookup time through the RAG endpoint, and a 15% cut in production error rate once drift monitoring drove retraining decisions.",
    },
    metrics: [
      { value: "89%+", label: "classification accuracy" },
      { value: "+12%", label: "F1 over baseline" },
      { value: "~70%", label: "less manual analysis" },
      { value: "10K+", label: "reviews per pass" },
    ],
    technologies: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "RAG",
      "pandas",
      "Streamlit",
      "GitHub Actions",
      "Steam Web API",
    ],
    diagram: {
      cols: 5,
      rows: 3,
      caption:
        "Steam Web API feeds an async ingestion stage; reviews are batched through a fine-tuned DistilBERT model on PyTorch, aggregated with pandas, and served to a Streamlit dashboard. Embeddings from the same corpus back a retrieval endpoint, and an evaluation harness monitors accuracy and drift across model versions.",
      nodes: [
        { id: "steam", label: "Steam Web API", kind: "external", col: 0, row: 1 },
        { id: "ingest", label: "Async ingest", kind: "service", col: 1, row: 1, note: "batched" },
        { id: "model", label: "DistilBERT", kind: "service", col: 2, row: 0, note: "fine-tuned" },
        { id: "embed", label: "Embeddings", kind: "service", col: 2, row: 2, note: "semantic search" },
        { id: "agg", label: "Aggregation", kind: "store", col: 3, row: 0, note: "pandas" },
        { id: "rag", label: "RAG endpoint", kind: "edge", col: 3, row: 2 },
        { id: "dash", label: "Streamlit", kind: "client", col: 4, row: 0 },
        { id: "eval", label: "Eval + drift", kind: "observability", col: 4, row: 2 },
      ],
      edges: [
        { from: "steam", to: "ingest", flow: true },
        { from: "ingest", to: "model", flow: true },
        { from: "ingest", to: "embed" },
        { from: "model", to: "agg", flow: true },
        { from: "embed", to: "rag" },
        { from: "agg", to: "dash", flow: true },
        { from: "model", to: "eval", async: true },
        { from: "rag", to: "eval", async: true },
      ],
    },
  },
  {
    id: "golootlo",
    company: "Golootlo",
    entity: "DECAGON Pakistan",
    location: "Karachi, Pakistan",
    period: "Jul 2019 — Sep 2025",
    roles: [
      { title: "Senior Software Engineer", period: "Jan 2022 — Sep 2025" },
      { title: "Software Engineer", period: "Jul 2019 — Jan 2022" },
    ],
    context: "National discount and loyalty platform with an in-app payment rail.",
    featured: true,
    story: {
      problem:
        "A loyalty app was outgrowing its monolith. Search was hitting MySQL directly, payments were bolted on per-gateway, and every tournament season added load the system had not been designed for.",
      scale:
        "8M users at the start, 24M+ by the end. 60K+ concurrent at peak, 35K+ payment transactions a day, 50+ customer-facing APIs.",
      system:
        "Services split out of the monolith along real seams — search, payments, orders. Elasticsearch became the read-optimised source for customer-facing reads, kept in sync with MySQL. A centralised payment microservice fronted 10+ gateways behind one interface. Background work moved onto AWS SQS/SNS. ELK centralised payment and system logs; historical records moved to DocumentDB to take pressure off RDS.",
      contribution:
        "I designed the Elasticsearch read layer and owned the dual-database sync between MySQL and Elasticsearch for 8M+ users with zero data loss. I architected the centralised payment service and integrated RAAST — Pakistan's government-backed instant rail — for real-time QR settlement. I built the fantasy cricket platform from scratch in 30 days, including the rule engine and the SQS/SNS scoring pipeline. I set the architecture standards, owned incident response, and hired and mentored the backend team.",
      result:
        "60% revenue growth, transaction success up 18%, API latency down 30%, database load halved, sub-500ms search under 60K+ concurrent users, P1 incidents down 35%, and 99.95% uptime with 40% fewer production bugs.",
    },
    metrics: [
      { value: "8M → 24M+", label: "users" },
      { value: "+60%", label: "revenue growth" },
      { value: "−50%", label: "database load" },
      { value: "99.95%", label: "uptime" },
    ],
    technologies: [
      "Laravel",
      "Node.js",
      "NestJS",
      "Express.js",
      "GraphQL",
      "MySQL",
      "Elasticsearch",
      "Redis",
      "MongoDB",
      "AWS SQS/SNS",
      "AWS DocumentDB",
      "ELK Stack",
      "OAuth 2.0",
      "JWT",
    ],
    diagram: {
      cols: 5,
      rows: 4,
      caption:
        "Mobile and merchant clients hit an authenticated API gateway. Reads are served from Redis and an Elasticsearch layer kept in sync with MySQL; writes go to MySQL. Payments route through a centralised service fronting multiple gateways including RAAST. Background scoring and settlement run through SQS/SNS workers, and ELK collects logs across the whole path.",
      nodes: [
        { id: "clients", label: "Mobile + merchant", kind: "client", col: 0, row: 1 },
        { id: "api", label: "API gateway", kind: "edge", col: 1, row: 1, note: "OAuth 2.0 · JWT" },
        { id: "redis", label: "Redis", kind: "cache", col: 2, row: 0, note: "hot reads" },
        { id: "search", label: "Elasticsearch", kind: "store", col: 2, row: 1, note: "50+ read APIs" },
        { id: "pay", label: "Payment service", kind: "service", col: 2, row: 2, note: "10+ gateways" },
        { id: "queue", label: "SQS / SNS", kind: "queue", col: 2, row: 3, note: "async jobs" },
        { id: "mysql", label: "MySQL", kind: "store", col: 3, row: 1, note: "system of record" },
        { id: "gateways", label: "Payment rails", kind: "external", col: 3, row: 2, note: "RAAST · 1Link · CyberSource" },
        { id: "workers", label: "Scoring workers", kind: "service", col: 3, row: 3, note: "fantasy league" },
        { id: "elk", label: "ELK", kind: "observability", col: 4, row: 1 },
        { id: "docdb", label: "DocumentDB", kind: "store", col: 4, row: 3, note: "history" },
      ],
      edges: [
        { from: "clients", to: "api", flow: true },
        { from: "api", to: "redis", flow: true },
        { from: "api", to: "search", flow: true },
        { from: "api", to: "pay", flow: true },
        { from: "search", to: "mysql", label: "sync", async: true },
        { from: "api", to: "mysql", label: "writes" },
        { from: "pay", to: "gateways", flow: true },
        { from: "pay", to: "queue", async: true },
        { from: "queue", to: "workers", flow: true },
        { from: "workers", to: "mysql", async: true },
        { from: "pay", to: "elk", async: true },
        { from: "workers", to: "docdb", async: true },
      ],
    },
  },
  {
    id: "jamia",
    company: "Jamia Arabia Ahsan Ul Uloom",
    location: "Karachi, Pakistan",
    period: "Jul 2015 — Aug 2021",
    roles: [{ title: "Web Developer", period: "Jul 2015 — Aug 2021" }],
    context: "Education platform with audio/video libraries and live broadcast.",
    featured: false,
    story: {
      problem:
        "An institution serving thousands of students had no digital presence for lectures, registration or class management.",
      scale: "Thousands of users across web and a React mobile app.",
      system:
        "A full education platform — audio and video lecture libraries, live broadcast streaming, student registration, class management and book downloads — plus REST APIs consumed by the mobile client.",
      contribution:
        "I built and maintained the platform and its REST APIs for content delivery, student management and classroom operations, and ran the institution's content channels alongside it.",
      result: "A single system covering registration through to content delivery, in daily institutional use.",
    },
    metrics: [{ value: "6 yrs", label: "in production" }],
    technologies: ["PHP", "MySQL", "REST APIs", "React"],
  },
  {
    id: "wayz",
    company: "WayZ Consulting",
    location: "Karachi, Pakistan",
    period: "Jan 2019 — Jun 2019",
    roles: [{ title: "ERP Developer", period: "Jan 2019 — Jun 2019" }],
    context: "Open-source ERP customisation for client businesses.",
    featured: false,
    story: {
      problem: "Client business processes did not match what a stock open-source ERP could do.",
      scale: "Sales orders, invoicing, purchase orders and inventory across client deployments.",
      system: "FrontAccounting (PHP/MySQL) customised per client, with Selenium regression suites around it.",
      contribution:
        "I customised the ERP modules, wrote the automated regression scripts, and introduced Git to the organisation — training the team on branching and collaborative workflow, which they had not had before.",
      result: "Faster regression cycles, less manual QA, and source control practices established for the first time.",
    },
    metrics: [],
    technologies: ["PHP", "MySQL", "Selenium", "Git"],
  },
  {
    id: "datawisdom",
    company: "datawisdom",
    location: "Karachi, Pakistan",
    period: "Aug 2017 — Jan 2018",
    roles: [{ title: "Web Developer Intern", period: "Aug 2017 — Jan 2018" }],
    context: "First professional engineering role.",
    featured: false,
    story: {
      problem: "Learning to ship production web software under senior supervision.",
      scale: "Websites and e-commerce platform features.",
      system: "PHP and MySQL back ends with JavaScript front-end integration.",
      contribution: "I built site and e-commerce features and learned database design and server-side scripting on real work.",
      result: "The foundation everything after this was built on.",
    },
    metrics: [],
    technologies: ["PHP", "MySQL", "JavaScript"],
  },
]

export const featuredExperiences = experiences.filter((e) => e.featured)
export const earlierExperiences = experiences.filter((e) => !e.featured)
