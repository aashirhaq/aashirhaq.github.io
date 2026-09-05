import type { Project } from "./types"

export const projects: Project[] = [
  {
    slug: "payment-orchestration",
    title: "Payment orchestration platform",
    tagline:
      "One interface in front of 10+ gateways, a subscription engine behind it, and a real-time QR rail for merchants.",
    role: "Architecture + implementation",
    period: "2022 — 2025",
    org: "Golootlo",
    technologies: [
      "Node.js",
      "NestJS",
      "Express.js",
      "Laravel",
      "MySQL",
      "Redis",
      "AWS SQS/SNS",
      "RAAST",
      "1Link",
      "CyberSource",
      "ELK Stack",
    ],
    metrics: [
      { value: "35K+", label: "daily transactions" },
      { value: "+18%", label: "transaction success" },
      { value: "10+", label: "gateways integrated" },
      { value: "+60%", label: "revenue growth" },
    ],
    liveUrl: "https://golootlo.pk/",
    featured: true,
    caseStudy: {
      problem:
        "Every new payment method meant another gateway integration wired directly into product code. Each one carried its own failure modes, its own retry semantics and its own idea of what a successful transaction looked like. Adding a gateway was a release-blocking project, and when one degraded, the blast radius reached the checkout path.",
      constraints: [
        "A live platform — no window for a rewrite, no acceptable downtime on the payment path.",
        "Gateways with genuinely different contracts: card processors, bank rails, and a government-backed instant rail.",
        "Recurring billing and one-time payments had to share the same settlement and reconciliation path.",
        "Every transaction needed to be reconstructable afterwards for reconciliation and dispute handling.",
      ],
      sections: [
        {
          heading: "The seam",
          body: "The first decision was where to cut. Payments were not one concern but three: authorisation (does this charge succeed), entitlement (what does this user now have access to) and settlement (who gets paid, when). Collapsing them into per-gateway code was why every integration hurt. Splitting them let each gateway become an adapter behind a single interface, and let the subscription engine reason about entitlement without knowing which rail the money arrived on.",
        },
        {
          heading: "Gateway adapters",
          body: "A centralised payment microservice fronts every provider. Product code asks for a charge; the service selects a route, normalises the provider's response into one internal transaction shape, and owns retry and reconciliation. Adding the eleventh gateway is an adapter, not a release.",
          points: [
            "One normalised transaction model across card, bank and instant-rail providers.",
            "Routing and retry live in the service, not in the calling product code.",
            "Support for both one-time and recurring charges through the same path.",
          ],
        },
        {
          heading: "Subscriptions and entitlement",
          body: "The subscription module was built from scratch with dynamic packages and automated eligibility checks, gating features per package — QR deals, fantasy league rewards — rather than per hard-coded plan. Entitlement is derived from subscription state, so a billing outcome and a feature gate can never disagree.",
        },
        {
          heading: "Real-time QR at the merchant",
          body: "A QR-based mobile POS system integrating 1Link and RAAST, Pakistan's government-backed instant payment rail, gave merchants settlement at the point of sale rather than on a batch cycle. Node.js, Express and NestJS behind the rail; a Laravel dashboard for merchant administration.",
          points: [
            "4–5K daily QR transactions across 100+ merchants.",
            "Instant merchant settlement rather than deferred batch payout.",
          ],
        },
        {
          heading: "Seeing the money move",
          body: "A payment system you cannot observe is a payment system you cannot operate. ELK centralised payment and system logs with exportable reports, which is what made reconciliation tractable and what turned incident response from archaeology into a query.",
        },
      ],
      diagram: {
        cols: 5,
        rows: 3,
        caption:
          "Client and merchant POS traffic enters the payment service, which routes through per-provider adapters to RAAST, 1Link and CyberSource. The subscription engine derives entitlement from transaction state, settlement runs asynchronously through SQS/SNS workers, and every step logs to ELK.",
        nodes: [
          { id: "app", label: "App checkout", kind: "client", col: 0, row: 0 },
          { id: "pos", label: "Merchant QR POS", kind: "client", col: 0, row: 2 },
          { id: "svc", label: "Payment service", kind: "service", col: 1, row: 1, note: "routing · retry" },
          { id: "sub", label: "Subscription engine", kind: "service", col: 2, row: 0, note: "entitlement" },
          { id: "adapters", label: "Gateway adapters", kind: "edge", col: 2, row: 2, note: "normalised" },
          { id: "db", label: "MySQL", kind: "store", col: 3, row: 0, note: "ledger" },
          { id: "rails", label: "Payment rails", kind: "external", col: 3, row: 2, note: "RAAST · 1Link · CyberSource" },
          { id: "queue", label: "SQS / SNS", kind: "queue", col: 4, row: 0, note: "settlement" },
          { id: "elk", label: "ELK", kind: "observability", col: 4, row: 1 },
        ],
        edges: [
          { from: "app", to: "svc", flow: true },
          { from: "pos", to: "svc", flow: true },
          { from: "svc", to: "sub", flow: true },
          { from: "svc", to: "adapters", flow: true },
          { from: "adapters", to: "rails", flow: true },
          { from: "sub", to: "db" },
          { from: "adapters", to: "db" },
          { from: "db", to: "queue", async: true },
          { from: "svc", to: "elk", async: true },
          { from: "adapters", to: "elk", async: true },
        ],
      },
      results: [
        "Transaction success up 18% across 35K+ daily transactions.",
        "10+ gateways behind one interface, including RAAST instant settlement.",
        "4–5K daily QR transactions across 100+ merchants.",
        "Payment orchestration contributed to 60% company revenue growth.",
      ],
    },
  },
  {
    slug: "search-read-layer",
    title: "Elasticsearch read layer",
    tagline:
      "Moving 50+ customer-facing APIs off the write database, and keeping two stores honest with each other at 24M users.",
    role: "Design + ownership",
    period: "2019 — 2025",
    org: "Golootlo",
    technologies: ["Elasticsearch", "MySQL", "Redis", "Laravel", "AWS OpenSearch", "AWS ElastiCache"],
    metrics: [
      { value: "<500ms", label: "under 60K concurrent" },
      { value: "50+", label: "APIs served" },
      { value: "−50%", label: "database load" },
      { value: "−30%", label: "API latency" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "Customer-facing reads — deals, merchants, orders, geo-scoped search — were being served from the same MySQL instance that took every write. Read traffic and write traffic were competing for the same resources, and search relevance was whatever a LIKE query could manage. Every growth milestone made the contention worse.",
      constraints: [
        "8M+ users at the point of migration, growing throughout — no acceptable data loss.",
        "MySQL had to remain the system of record; this was not a database replacement.",
        "50+ existing APIs, migrated incrementally rather than in one cutover.",
        "Geo-scoped queries and relevance ranking that a relational index could not express well.",
      ],
      sections: [
        {
          heading: "Read and write are different problems",
          body: "The core move was to stop pretending one store should do both. MySQL stayed the system of record and kept all writes. Elasticsearch became a read-optimised projection of it, shaped around the queries the product actually issues rather than around normalised entities. Once reads had somewhere else to go, the write database stopped being the bottleneck for everything.",
        },
        {
          heading: "Keeping two stores honest",
          body: "The hard part of this pattern is never the first index — it is consistency six months in. Dual-database sync between MySQL and Elasticsearch had to hold across 8M+ user records with zero data loss, which meant treating drift as an expected condition to detect and repair rather than an anomaly to be surprised by.",
          points: [
            "MySQL remains authoritative; Elasticsearch is always a derived view.",
            "Sync verified continuously rather than assumed after backfill.",
            "Incremental per-API migration, so a bad index never took down the platform.",
          ],
        },
        {
          heading: "Caching in front",
          body: "Redis sits ahead of the read layer for the hottest paths. The combination of a purpose-shaped index and a cache in front of it is what took database load down by half and API latency down by 30% — neither alone would have done it.",
        },
        {
          heading: "Holding under peak",
          body: "The layer was later redesigned to serve 50+ customer-facing APIs at sub-500ms under 60K+ concurrent users, which in practice is a tournament-night traffic shape: a flat baseline with a very sharp spike. Designing for the spike rather than the average is what made those nights uneventful.",
        },
      ],
      diagram: {
        cols: 4,
        rows: 3,
        caption:
          "Read traffic from customer-facing APIs is served by Redis and an Elasticsearch projection; writes go to MySQL, which remains the system of record and continuously syncs into the search index.",
        nodes: [
          { id: "clients", label: "Customer APIs", kind: "client", col: 0, row: 1, note: "50+ endpoints" },
          { id: "edge", label: "Read path", kind: "edge", col: 1, row: 0 },
          { id: "write", label: "Write path", kind: "edge", col: 1, row: 2 },
          { id: "redis", label: "Redis", kind: "cache", col: 2, row: 0, note: "hot keys" },
          { id: "es", label: "Elasticsearch", kind: "store", col: 2, row: 1, note: "read projection" },
          { id: "mysql", label: "MySQL", kind: "store", col: 3, row: 2, note: "system of record" },
        ],
        edges: [
          { from: "clients", to: "edge", flow: true },
          { from: "clients", to: "write" },
          { from: "edge", to: "redis", flow: true },
          { from: "edge", to: "es", flow: true },
          { from: "write", to: "mysql", flow: true },
          { from: "mysql", to: "es", label: "sync", async: true },
        ],
      },
      results: [
        "Sub-500ms response across 50+ APIs under 60K+ concurrent users.",
        "API response times reduced by 50% on the originally migrated endpoints, 30% platform-wide after later optimisation.",
        "Database load halved.",
        "Zero data loss maintaining MySQL–Elasticsearch consistency across 8M+ users.",
      ],
    },
  },
  {
    slug: "fantasy-cricket",
    title: "Real-time fantasy cricket platform",
    tagline: "Built from scratch in 30 days, then run through 15+ tournament cycles with live scoring for 25K+ teams a match.",
    role: "Built from scratch",
    period: "2019 — 2025",
    org: "Golootlo",
    technologies: ["Laravel", "Node.js", "MySQL", "Redis", "AWS SQS", "AWS SNS", "Elasticsearch"],
    metrics: [
      { value: "50K+", label: "players" },
      { value: "25K+", label: "teams per match" },
      { value: "30 days", label: "to first tournament" },
      { value: "100K+", label: "new customers onboarded" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "The business wanted a fantasy cricket product live for the PSL tournament cycle. The deadline was the tournament, not a date that could move. Fantasy scoring is a deceptively hard workload: it is idle most of the time and then, the instant a wicket falls, every team that contains that player must be rescored and every leaderboard reordered — simultaneously, for everyone watching.",
      constraints: [
        "30 days from nothing to a platform running a live national tournament.",
        "Scoring rules that change between tournaments and cannot be hard-coded.",
        "Extremely spiky load — near-idle between matches, everything at once during play.",
        "Subscription gating had to be validated per team during live score calculation.",
      ],
      sections: [
        {
          heading: "Rules as data",
          body: "A dynamic rule engine was the first thing built, because it was the thing most likely to change. Scoring rules are configuration, not code, so a new tournament with different point values is a data change made before the season rather than a deploy made during it.",
        },
        {
          heading: "Decoupling the spike",
          body: "Match events do not update leaderboards synchronously. They publish to SNS and fan out to SQS-backed workers that recompute scores in the background. That decoupling is the whole design: the ingestion path stays fast and constant-time regardless of how many teams are affected, and the expensive recomputation absorbs the spike behind a queue instead of in a request.",
          points: [
            "Event-driven scoring — match events fan out, workers recompute.",
            "Real-time leaderboard calculation for 25K+ teams per match.",
            "Automated background scoring rather than synchronous request work.",
          ],
        },
        {
          heading: "Entitlement in the hot path",
          body: "Fantasy league access was gated by the subscription platform, so scoring had to validate entitlement for 25K+ teams per match without turning every recomputation into a round trip. Entitlement state is resolved against cached subscription data alongside the scoring pass rather than as a separate synchronous check.",
        },
        {
          heading: "Then keeping it alive",
          body: "The 30-day build was the easy half. The platform then ran through 15+ tournament cycles, including upgrading 5–6 Laravel microservices from version 7 to 10 with zero downtime across those cycles — migration work scheduled around a calendar that does not negotiate.",
        },
      ],
      diagram: {
        cols: 5,
        rows: 3,
        caption:
          "Live match events publish to SNS and fan out to SQS-backed scoring workers. Workers apply the configurable rule engine, check cached entitlement, write results to MySQL and refresh Redis-backed leaderboards read by the app.",
        nodes: [
          { id: "feed", label: "Match events", kind: "external", col: 0, row: 1 },
          { id: "sns", label: "SNS", kind: "queue", col: 1, row: 1, note: "fan-out" },
          { id: "sqs", label: "SQS", kind: "queue", col: 2, row: 1, note: "absorbs spike" },
          { id: "rules", label: "Rule engine", kind: "service", col: 2, row: 0, note: "config-driven" },
          { id: "workers", label: "Scoring workers", kind: "service", col: 3, row: 1 },
          { id: "sub", label: "Entitlement", kind: "cache", col: 3, row: 0, note: "cached" },
          { id: "db", label: "MySQL", kind: "store", col: 4, row: 2 },
          { id: "board", label: "Leaderboards", kind: "cache", col: 4, row: 1, note: "Redis" },
          { id: "app", label: "App", kind: "client", col: 4, row: 0 },
        ],
        edges: [
          { from: "feed", to: "sns", flow: true },
          { from: "sns", to: "sqs", flow: true },
          { from: "sqs", to: "workers", flow: true },
          { from: "rules", to: "workers" },
          { from: "sub", to: "workers" },
          { from: "workers", to: "db", async: true },
          { from: "workers", to: "board", flow: true },
          { from: "board", to: "app", flow: true },
        ],
      },
      results: [
        "Live for the PSL tournament 30 days after starting from nothing.",
        "50K+ players and 25K+ teams scored per match.",
        "100K+ new customers onboarded in the first tournament cycle.",
        "5–6 Laravel microservices upgraded 7→10 with zero downtime across 15+ tournament cycles.",
      ],
    },
  },
  {
    slug: "review-intelligence",
    title: "Steam review intelligence pipeline",
    tagline: "A configurable NLP pipeline that turns 10K+ raw game reviews into answers, with drift monitoring behind it.",
    role: "Design + implementation",
    period: "2026",
    org: "Stats AI",
    technologies: [
      "Python",
      "PyTorch",
      "Hugging Face Transformers",
      "DistilBERT",
      "RAG",
      "pandas",
      "Streamlit",
      "GitHub Actions",
    ],
    metrics: [
      { value: "89%+", label: "accuracy" },
      { value: "+12%", label: "F1 over baseline" },
      { value: "−80%", label: "manual lookup time" },
      { value: "−15%", label: "production error rate" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "Understanding how a game was landing meant an analyst reading reviews. That does not scale past a few titles, it is slow, and two analysts reading the same thread will not agree on the sentiment split.",
      constraints: [
        "Public review data with no fixed schema and highly informal language.",
        "Adding a new game title had to be cheap — configuration, not a code branch.",
        "Inference had to be fast enough for a daily refresh on available hardware.",
        "Model quality had to be observable over time, not assumed at training.",
      ],
      sections: [
        {
          heading: "Stages, not a script",
          body: "The pipeline is a set of configurable stages — fetch, batch, infer, aggregate, serve — with batch size and data source as inputs rather than assumptions baked into the code. Extending it to a new title is a config change. This is the same reasoning that makes backend services extensible, applied to an ML workload.",
        },
        {
          heading: "Fitting the model to the domain",
          body: "A general sentiment model does not read gaming reviews well; the vocabulary and the sarcasm are domain-specific. Fine-tuning DistilBERT on gaming-domain review data with transfer learning lifted F1 by 12% over the pre-trained baseline, at a fraction of the cost of training something larger.",
          points: [
            "89%+ classification accuracy across 10K+ reviews.",
            "CUDA-accelerated batched inference via PyTorch.",
            "Async data fetching so I/O does not stall the inference stage.",
          ],
        },
        {
          heading: "From classification to answers",
          body: "Sentiment percentages are not what anyone actually wants. A retrieval-augmented layer over vector embeddings of the same corpus answers natural-language questions and serves them through a production API endpoint, and LLM APIs turn aggregated numbers into readable summaries — reducing reporting from hours to minutes and manual lookup time by 80%.",
        },
        {
          heading: "Knowing when it degrades",
          body: "An automated evaluation and monitoring framework tracks accuracy, F1 drift and inference latency across model versions. Retraining becomes a decision driven by measurements instead of a hunch, which is what cut the production error rate by 15%.",
        },
      ],
      results: [
        "89%+ classification accuracy across 10K+ reviews.",
        "12% F1 improvement over the pre-trained baseline.",
        "~70% reduction in manual analysis time; 80% reduction in manual lookup.",
        "15% reduction in production error rate through drift-driven retraining.",
      ],
    },
  },
  {
    slug: "the-huntr",
    title: "The Huntr 2.0",
    tagline: "Laravel backend for a members-only digital media platform in Dubai and the UAE.",
    role: "Backend developer",
    period: "2023 — Present",
    org: "Freelance",
    technologies: ["Laravel", "MySQL", "Elasticsearch", "Stripe", "REST APIs"],
    // Confirmed by Aashir; carried over from the previous site (not in the résumé/LinkedIn).
    metrics: [{ value: "20K+", label: "users" }],
    liveUrl: "https://thehuntr.com",
    featured: false,
  },
  {
    slug: "your-rewards",
    title: "Your Rewards",
    tagline: "Employee benefits platform for Dubai employers — partner management, access control and geo-scoped deal search.",
    role: "Backend developer",
    period: "2022 — Present",
    org: "Freelance",
    technologies: ["Laravel", "MySQL", "Elasticsearch", "REST APIs"],
    // Confirmed by Aashir; carried over from the previous site (not in the résumé/LinkedIn).
    metrics: [{ value: "500+", label: "partner deals" }],
    // No liveUrl: the yourrewards.io domain no longer resolves.
    featured: false,
  },
  {
    slug: "kwsb-tankers",
    title: "Karachi Water & Sewerage Board",
    tagline: "Water tanker ordering with geolocation-based pricing, handling 1,000+ orders a day.",
    role: "Backend developer",
    period: "2024",
    technologies: ["Laravel", "MySQL", "REST APIs"],
    // Confirmed by Aashir; carried over from the previous site (not in the résumé/LinkedIn).
    metrics: [{ value: "1,000+", label: "daily orders" }],
    liveUrl: "https://play.google.com/store/apps/details?id=com.hta.kwsb.ots&hl=en",
    featured: false,
  },
  {
    slug: "extensia",
    title: "Extensia",
    tagline: "Mobile-first volunteer management with Cognito-backed authentication and check-in/out.",
    role: "Full-stack developer",
    period: "2025",
    technologies: ["React", "Next.js", "AWS Cognito"],
    metrics: [],
    liveUrl: "https://extensia.cloud/",
    featured: false,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const otherProjects = projects.filter((p) => !p.featured)

export const caseStudies = projects.filter(
  (p): p is Project & { caseStudy: NonNullable<Project["caseStudy"]> } => Boolean(p.caseStudy),
)

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
