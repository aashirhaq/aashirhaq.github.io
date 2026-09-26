import type { CompactProject, FlagshipProject, Project } from "./types";

// Every statement below traces back to the resume, the LinkedIn profile, or an
// answer confirmed during content review. Wording is edited; facts are not.

export const flagshipProjects: FlagshipProject[] = [
  {
    slug: "steam-review-intelligence",
    tier: "flagship",
    name: "Steam Review Intelligence Platform",
    context: "Stats AI",
    period: "2026",
    summary:
      "An end-to-end AI system that ingests Steam game reviews, classifies sentiment with a fine-tuned DistilBERT model, answers natural-language questions through RAG, and turns aggregates into LLM-written insights — with model quality monitored in production.",
    role: "AI Engineer — design, model fine-tuning, pipeline and deployment",
    metrics: [
      { value: "89%+", label: "accuracy on 10K+ reviews" },
      { value: "+12%", label: "F1 over pre-trained baseline" },
      { value: "−80%", label: "manual lookup time (RAG)" },
      { value: "−15%", label: "production error rate" },
    ],
    stack: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "Vector Embeddings",
      "Claude / OpenAI APIs",
      "Streamlit",
      "pandas",
      "GitHub Actions",
      "Steam Web API",
      "CUDA",
    ],
    links: [
      {
        label: "Live dashboard",
        href: "https://steam-review-sentiment-xt4bsraqrvdp8gwakq4sj6.streamlit.app/",
      },
    ],
    modules: [
      {
        name: "Sentiment pipeline",
        description:
          "Pulls reviews from the Steam API and classifies them with a DistilBERT model fine-tuned on gaming reviews, served on CUDA-accelerated PyTorch inference.",
        metric: "89%+ accuracy",
      },
      {
        name: "RAG query layer",
        description:
          "Vector embeddings and semantic search over unstructured review text, answering natural-language questions through a production API endpoint.",
        metric: "−80% lookup time",
      },
      {
        name: "LLM insight generation",
        description:
          "Anthropic Claude / OpenAI APIs turn aggregated sentiment into human-readable summaries and actionable insights.",
        metric: "hours → minutes",
      },
      {
        name: "Evaluation & monitoring",
        description:
          "Tracks accuracy, F1 drift and inference latency across model versions to decide when to retrain.",
        metric: "−15% error rate",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: "The platform started as a sentiment-analysis pipeline for Steam game reviews and grew into a complete AI system: classification, retrieval-augmented question answering, LLM-generated reporting, and production model monitoring — surfaced through a live Streamlit dashboard that refreshes daily.",
      },
      {
        heading: "Challenge",
        body: "Game reviews are high-volume, unstructured and domain-specific. Analysts needed reliable sentiment across titles, a way to ask questions of the raw text, and summaries they could act on — without manual reading and reporting.",
      },
      {
        heading: "Architecture",
        points: [
          "Ingestion from the Steam Web API with async data fetching.",
          "Modular inference pipeline with configurable batch sizes, extensible to new game titles with minimal code changes.",
          "DistilBERT classifier (Hugging Face Transformers, PyTorch) with CUDA-accelerated inference.",
          "Embedding index with semantic search behind a production API endpoint for RAG queries.",
          "LLM summarization layer over aggregated review data.",
          "Evaluation framework tracking accuracy, F1 drift and latency per model version.",
          "Streamlit dashboard with automated daily refresh through GitHub Actions.",
        ],
      },
      {
        heading: "Engineering decisions",
        points: [
          "Fine-tuned DistilBERT with transfer learning on domain-specific gaming reviews rather than relying on a general pre-trained model — improving F1 by 12%.",
          "Kept the pipeline modular so each stage (fetching, inference, aggregation) can be reused and extended independently.",
          "Made model quality observable in production so retraining decisions are driven by data, not guesswork.",
        ],
      },
      {
        heading: "Outcome",
        points: [
          "89%+ classification accuracy across 10K+ reviews.",
          "Manual analysis time reduced by ~70%; manual lookup time reduced by 80%.",
          "Analyst reporting time reduced from hours to minutes.",
          "Production error rate reduced by 15%.",
        ],
      },
    ],
  },
  {
    // Source: github.com/aashirhaq/streamlit_image_search_db (README + streamlit_app.py).
    // A Stats AI project; the owner confirmed building the embedding pipeline,
    // vector search, search logic, LLM layer and Streamlit app. No live link by choice.
    slug: "multimodal-image-search",
    tier: "flagship",
    name: "Multimodal Reverse Image Search",
    context: "Stats AI",
    period: "2026",
    summary:
      "A reverse image search system that finds visually similar animals from either a photo or a text description — CLIP embeddings, nearest-neighbour search in Qdrant Cloud, and an LLM-written summary of the match.",
    role: "Contributor — embedding pipeline, vector search, search logic, LLM layer and Streamlit app",
    metrics: [
      { value: "5,000+", label: "animal images indexed" },
      { value: "2", label: "search modes: text & image" },
      { value: "16", label: "nearest neighbours per query" },
      { value: "3", label: "LLM fallback tiers" },
    ],
    stack: [
      "Python",
      "CLIP (ViT-B/32)",
      "sentence-transformers",
      "PyTorch",
      "Qdrant Cloud",
      "LangChain",
      "Google Gemini",
      "Groq (Llama 3.1)",
      "Streamlit",
      "Google Colab",
    ],
    modules: [
      {
        name: "Embedding pipeline",
        description:
          "CLIP ViT-B/32 embeddings generated for 5,000+ animal images in Google Colab and uploaded to Qdrant Cloud, with image path and animal type stored as payload.",
        metric: "5,000+ images",
      },
      {
        name: "Vector similarity search",
        description:
          "The query embedding runs a nearest-neighbour search in Qdrant; the animal type is read from the top result's payload and matching images are resolved from their stored paths.",
        metric: "top-16 results",
      },
      {
        name: "Multimodal queries",
        description:
          "The same CLIP model embeds either a selected image or typed text into one shared space, so a single index serves both image-to-image and text-to-image search.",
        metric: "2 modes",
      },
      {
        name: "LLM summary layer",
        description:
          "LangChain calls Google Gemini for a 100-word summary of the identified animal, falling back to Gemini 2.5 Flash and then Groq (Llama 3.1 8B) if a provider fails.",
        metric: "3-tier fallback",
      },
    ],
    sections: [
      {
        heading: "Overview",
        body: "A visual search application: pick an animal image or type an animal's name, and the system returns the most similar images from its index, identifies the animal, and — when an LLM key is available — writes a short summary about it.",
      },
      {
        heading: "Architecture",
        points: [
          "Offline: CLIP embeddings for the image set computed in Google Colab and uploaded to a Qdrant Cloud collection.",
          "Query: the selected image or the entered text is encoded into a query embedding with the same CLIP model.",
          "Retrieval: nearest-neighbour similarity search in Qdrant returns the top 16 matches with their payloads.",
          "Resolution: the animal type comes from the first result's payload; images are loaded from the stored image paths.",
          "Generation: the identified animal is passed to an LLM (Gemini, with Gemini 2.5 Flash and Groq Llama 3.1 fallbacks) for a summary.",
          "Interface: a Streamlit app with image and text search inputs and a results grid.",
        ],
      },
      {
        heading: "Engineering decisions",
        points: [
          "One CLIP model for both images and text, so a single vector index powers two search modes.",
          "Embeddings are precomputed offline; at runtime the app only needs to embed the query.",
          "Image path and animal type live in the Qdrant payload, so every result resolves directly to an image and a label.",
          "An ordered LLM provider fallback chain keeps summaries available when one provider fails.",
          "Model, embeddings and the database client are loaded once and cached with Streamlit resource caching.",
        ],
      },
    ],
  },
  {
    slug: "payment-orchestration",
    tier: "flagship",
    name: "Payment Orchestration & Subscription Billing",
    context: "Golootlo (DECAGON)",
    period: "2022 — 2025",
    summary:
      "A centralized payment microservice integrating 10+ gateways for one-time and recurring payments, with a subscription platform built from scratch — core infrastructure behind the platform's growth from 8M to 24M+ users.",
    role: "Senior Software Engineer — architecture and delivery lead",
    metrics: [
      { value: "10+", label: "payment gateways" },
      { value: "35K+", label: "daily transactions" },
      { value: "+18%", label: "transaction success" },
      { value: "60%", label: "revenue growth contributed to" },
    ],
    stack: ["Laravel", "Node.js", "NestJS", "1Link", "RAAST", "CyberSource", "OAuth 2.0", "JWT", "AWS", "ELK Stack"],
    sections: [
      {
        heading: "Overview",
        body: "Golootlo's payments needed to support many gateways, both one-time and recurring charges, and subscription-gated product features. I architected a centralized payment microservice and designed the subscription module that sits on top of it.",
      },
      {
        heading: "Challenge",
        body: "Integrating 10+ payment providers — including 1Link, RAAST and CyberSource — behind one reliable service, while handling tens of thousands of daily transactions and gating features for a fast-growing user base.",
      },
      {
        heading: "Architecture",
        points: [
          "Centralized payment microservice abstracting 10+ gateways for one-time and recurring payments.",
          "Subscription module designed from scratch: dynamic packages, automated eligibility checks and per-feature gating across QR deals and fantasy league rewards.",
          "Fantasy league subscription gating validating 25K+ teams per match during real-time score calculation.",
          "Real-time QR payments via RAAST, the government-backed instant payment rail, enabling instant merchant settlements.",
          "Centralized payment log monitoring on the ELK stack with exportable reports.",
        ],
      },
      {
        heading: "Scale",
        points: [
          "35K+ daily transactions across the platform.",
          "Distributed APIs secured with OAuth 2.0 and JWT, supporting 24M+ users and 60K+ peak concurrency.",
        ],
      },
      {
        heading: "Outcome",
        points: [
          "Transaction success improved by 18%.",
          "Contributed to 60% revenue growth as the platform scaled from 8M to 24M+ users.",
        ],
      },
    ],
  },
  {
    slug: "search-infrastructure",
    tier: "flagship",
    name: "Elasticsearch Search Infrastructure",
    context: "Golootlo (DECAGON)",
    period: "2019 — 2025",
    summary:
      "A read-optimized search and data layer that grew from powering 35+ APIs to serving 50+ customer-facing APIs with sub-500ms responses under 60K+ concurrent users.",
    role: "Designed the original layer and later redesigned it",
    metrics: [
      { value: "<500ms", label: "response at 60K+ concurrency" },
      { value: "50+", label: "customer-facing APIs" },
      { value: "−50%", label: "database load" },
      { value: "0", label: "data loss across 8M+ users" },
    ],
    stack: ["Elasticsearch", "MySQL", "Redis", "Laravel", "AWS"],
    sections: [
      {
        heading: "Overview",
        body: "Orders, QR deals and merchant data were read far more than written. I designed a centralized Elasticsearch layer as the read-optimized source for customer-facing APIs, and later redesigned it for a much larger platform.",
      },
      {
        heading: "Architecture",
        points: [
          "Elasticsearch as the read-optimized data source behind customer-facing APIs (orders, QR deals, merchants).",
          "Dual-database synchronization between MySQL and Elasticsearch, keeping data consistent across 8M+ users with zero data loss.",
          "Redis caching and query optimization in front of the primary database.",
        ],
      },
      {
        heading: "Evolution",
        points: [
          "v1 (Software Engineer): powered 35+ APIs and reduced API response times by 50%.",
          "v2 (Senior Software Engineer): redesigned to serve 50+ APIs at sub-500ms under 60K+ concurrent users, while improving search relevance.",
        ],
      },
      {
        heading: "Outcome",
        points: [
          "Sub-500ms responses under 60K+ concurrent users.",
          "Database load reduced by 50% and API latency by 30%.",
        ],
      },
    ],
  },
  {
    slug: "fantasy-cricket",
    tier: "flagship",
    name: "Fantasy Cricket Platform",
    context: "Golootlo (DECAGON)",
    period: "2019 — 2022",
    summary:
      "A fantasy cricket platform built from scratch in 30 days for PSL tournaments — dynamic rule engine, real-time leaderboards and event-driven scoring for 25K+ teams per match.",
    role: "Software Engineer — built from scratch",
    metrics: [
      { value: "30 days", label: "from scratch to launch" },
      { value: "50K+", label: "players" },
      { value: "25K+", label: "teams scored per match" },
      { value: "100K+", label: "new customers, first cycle" },
    ],
    stack: ["Laravel", "PHP", "AWS SQS", "AWS SNS", "MySQL", "Event-Driven Architecture"],
    sections: [
      {
        heading: "Overview",
        body: "A fantasy league product integrated into the main Golootlo app for Pakistan Super League (PSL) tournaments, built from the ground up in 30 days.",
      },
      {
        heading: "Architecture",
        points: [
          "Dynamic rule engine.",
          "Event-driven background scoring on AWS SQS/SNS for 25K+ teams per match.",
          "Real-time leaderboard calculation.",
          "Subscription gating with automated validation for 25K+ teams per match during live scoring.",
        ],
      },
      {
        heading: "Operations",
        points: [
          "Laravel microservices later upgraded from 7 to 10 across 15+ tournament cycles with zero downtime.",
        ],
      },
      {
        heading: "Outcome",
        points: [
          "50K+ players across PSL tournaments.",
          "100K+ new customers onboarded in the first PSL tournament cycle.",
        ],
      },
    ],
  },
];

export const compactProjects: CompactProject[] = [
  {
    slug: "qr-mobile-pos",
    tier: "compact",
    name: "QR Mobile POS Payments",
    context: "Golootlo (DECAGON)",
    period: "2022 — 2025",
    summary: "QR-based mobile point-of-sale payments on 1Link and RAAST.",
    points: [
      "Processes 4–5K daily transactions across 100+ merchants.",
      "Node.js / Express.js / NestJS backend with a Laravel admin dashboard.",
      "RAAST integration enables instant merchant settlement.",
    ],
    metrics: [
      { value: "4–5K", label: "daily transactions" },
      { value: "100+", label: "merchants" },
    ],
    stack: ["Node.js", "Express.js", "NestJS", "Laravel", "1Link", "RAAST"],
  },
  {
    slug: "microservices-modernization",
    tier: "compact",
    name: "Microservices Migration & Laravel Upgrades",
    context: "Golootlo (DECAGON)",
    period: "2019 — 2025",
    summary: "Breaking a monolith into services, then keeping them current without downtime.",
    points: [
      "Contributed to splitting the monolith into independent search, payments and orders services.",
      "Upgraded 5–6 microservices from Laravel 7 to 10 across 15+ fantasy tournament cycles with zero downtime.",
    ],
    metrics: [{ value: "0", label: "downtime during upgrades" }],
    stack: ["Laravel", "PHP", "Microservices", "AWS"],
  },
  {
    slug: "observability-migration",
    tier: "compact",
    name: "Observability & Data Migration",
    context: "Golootlo (DECAGON)",
    period: "2022 — 2025",
    summary: "Centralized logging and a cost-driven move of historical data off the primary database.",
    points: [
      "Implemented the ELK stack for centralized payment and system log monitoring with exportable reports.",
      "Migrated logs and historical data to AWS DocumentDB (MongoDB), offloading 24M+ user records and reducing RDS costs.",
    ],
    metrics: [{ value: "24M+", label: "records offloaded" }],
    stack: ["Elasticsearch", "Logstash", "Kibana", "AWS DocumentDB", "AWS RDS"],
  },
  {
    slug: "the-huntr",
    tier: "compact",
    name: "The Huntr 2.0",
    context: "Freelance · Dubai, UAE",
    period: "2023 — Present",
    summary:
      "Laravel backend for a members-only digital media platform for Dubai and the UAE — a partner of the Government of Dubai and Emirates Group.",
    points: [
      "Stripe subscription billing with webhook-driven payment flows.",
      "Elasticsearch-powered location-based search.",
      "Coffee card rewards system and business analytics dashboard.",
    ],
    stack: ["Laravel", "PHP", "Stripe", "Webhooks", "Elasticsearch"],
    links: [{ label: "thehuntr.com", href: "https://thehuntr.com/" }],
  },
  {
    slug: "your-rewards",
    tier: "compact",
    name: "Your Rewards",
    context: "Freelance · Dubai, UAE",
    period: "2022 — Present",
    summary: "Laravel backend for a Dubai-based employee benefits app.",
    points: [
      "Partner management, employer onboarding and employee access control.",
      "Elasticsearch-powered location-based deal search.",
      "Analytics dashboard and reporting for platform performance insights.",
    ],
    stack: ["Laravel", "PHP", "Elasticsearch", "RBAC"],
  },
  {
    slug: "jamiaahsan",
    tier: "compact",
    name: "jamiaahsan.com",
    context: "Jamia Arabia Ahsan Ul Uloom",
    period: "2015 — 2021",
    summary: "Islamic education platform serving thousands of users.",
    points: [
      "Audio/video lecture libraries, live broadcast streaming, student registration, class management and book downloads.",
      "REST APIs consumed by a React-based mobile app.",
    ],
    stack: ["PHP", "MySQL", "REST APIs", "Streaming"],
    links: [{ label: "jamiaahsan.com", href: "https://jamiaahsan.com" }],
  },
  {
    slug: "erp-customization",
    tier: "compact",
    name: "ERP Customization",
    context: "WayZ Consulting",
    period: "2019",
    summary: "Client-specific FrontAccounting ERP modules with automated regression testing.",
    points: [
      "Customized sales orders, invoicing, purchase orders and inventory modules.",
      "Selenium regression suite to reduce manual QA effort.",
    ],
    stack: ["PHP", "MySQL", "FrontAccounting", "Selenium"],
  },
];

export const projects: Project[] = [...flagshipProjects, ...compactProjects];

export function getFlagship(slug: string): FlagshipProject | undefined {
  return flagshipProjects.find((p) => p.slug === slug);
}
