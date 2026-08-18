export type ServiceCapability = {
  title: string;
  description: string;
};

export type ServiceWorkflowStep = {
  title: string;
  detail: string;
  artifacts: string[];
};

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  description: string;
  proof: string[];
  capabilities: ServiceCapability[];
  systems: string[];
  outcomes: string[];
  workflow: ServiceWorkflowStep[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const pilotWorkflow: ServiceWorkflowStep[] = [
  {
    title: "Audit",
    detail:
      "We map your current systems, data sources, and the workflow you want to change, then define the success metric with you before anything is built.",
    artifacts: ["System map", "Data readiness review", "Success criteria document"],
  },
  {
    title: "Pilot",
    detail:
      "A fixed-scope, fixed-price build of the core working loop in 4-6 weeks. Working software your team can test against real cases, not a slide deck.",
    artifacts: ["Working pilot system", "Evaluation results", "Pilot-to-production plan"],
  },
  {
    title: "Integrate",
    detail:
      "We wire the system into your stack - CRM, ERP, databases, telephony, internal tools - with access controls, logging, and human-review checkpoints.",
    artifacts: ["Production integrations", "Access and audit controls", "Runbook"],
  },
  {
    title: "Scale",
    detail:
      "90 days of post-deploy tuning are included. We review real usage, fix edge cases, and hand over a system your team can operate and extend.",
    artifacts: ["Usage reviews", "Documentation", "Handover and training"],
  },
];

// Data work has its own lifecycle: the calibration batch and the independent
// audit pass replace the pilot/integrate rhythm of a build engagement.
const dataWorkflow: ServiceWorkflowStep[] = [
  {
    title: "Scope",
    detail:
      "We define the dataset with you: what the model has to learn, the label taxonomy, the edge cases that decide quality, and the bar that counts as done - written down before any data is touched.",
    artifacts: ["Annotation guidelines", "Label taxonomy", "Quality thresholds"],
  },
  {
    title: "Calibrate",
    detail:
      "A small paid batch against the real taxonomy. You review actual output and we resolve genuine disagreements, so the guidelines are corrected on evidence rather than assumption before volume begins.",
    artifacts: ["Sample dataset", "Calibration notes", "Per-unit pricing"],
  },
  {
    title: "Produce",
    detail:
      "The core team collects, cleans, and labels to the agreed guidelines, with automated checks for duplicates, malformed records, and missing fields running alongside the human work.",
    artifacts: ["Working dataset", "Automated check log", "Progress reporting"],
  },
  {
    title: "Audit",
    detail:
      "A second pass reviews the work independently of whoever produced it and scores it against a held-out gold set, so quality arrives as a number you can inspect instead of a claim.",
    artifacts: ["Gold-set audit results", "Agreement scores", "Correction log"],
  },
  {
    title: "Deliver",
    detail:
      "Structured delivery in the format your pipeline expects, with schema, guidelines, and known limitations documented - and the option to carry it straight into the build that consumes it.",
    artifacts: ["Final dataset", "Schema and data dictionary", "Handover documentation"],
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: "ai-integration",
    title: "AI Integration",
    metaTitle: "AI Integration Services for Enterprise Systems | Avlys AI",
    metaDescription:
      "Embed AI into Salesforce, SAP, and custom apps without disrupting operations. RAG, copilots, AI agents - delivered by US + India teams. Fixed-price pilot scope.",
    keywords: [
      "AI integration services",
      "integrate AI into existing software",
      "enterprise AI integration",
      "AI integration company",
    ],
    eyebrow: "AI Integration Services",
    h1: "AI built into the systems you already run.",
    description:
      "Most AI projects fail because they try to replace working systems instead of extending them. We embed AI capability - retrieval, reasoning, automation - into your existing ERP, CRM, and custom applications, so your team keeps the tools and data they know.",
    proof: ["No rip-and-replace", "Fixed-scope pilots", "90-day post-deploy tuning"],
    capabilities: [
      {
        title: "Retrieval-augmented generation (RAG)",
        description:
          "LLM answers grounded in your documents, policies, tickets, and databases - with citations, access control, and evaluation suites so answers stay accurate.",
      },
      {
        title: "Copilots inside existing tools",
        description:
          "Assistants embedded in the software your team already uses: drafting in your CRM, lookups in your ERP, summaries in your support desk.",
      },
      {
        title: "Document and data pipelines",
        description:
          "Extraction, classification, and routing for invoices, contracts, claims, and emails - structured output written back into your systems of record.",
      },
      {
        title: "API and middleware integration",
        description:
          "Model providers (OpenAI, Anthropic, open-source) connected to your stack through a maintainable service layer with logging, fallbacks, and cost controls.",
      },
    ],
    systems: [
      "Salesforce",
      "SAP",
      "HubSpot",
      "NetSuite",
      "ServiceNow",
      "Zendesk",
      "PostgreSQL",
      "Legacy ERPs",
      "Internal tools",
    ],
    outcomes: [
      "AI features running inside your current stack instead of another disconnected tool.",
      "Answers and automations grounded in your data, with citations and audit trails.",
      "A measured pilot before any production commitment - success criteria agreed upfront.",
      "An integration layer your engineers can maintain, documented and handed over.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "Can you integrate AI without replacing our existing software?",
        answer:
          "Yes - that is the core of what we do. We build an integration layer around your current ERP, CRM, or custom applications. Your systems of record stay where they are; AI reads from and writes to them through controlled APIs.",
      },
      {
        question: "How do you keep our data secure?",
        answer:
          "Engagements run under NDA. We design around least-privilege access, keep your data inside your cloud where possible, support private model deployments when required, and document every data flow before it ships.",
      },
      {
        question: "What does a typical engagement look like?",
        answer:
          "A fixed-price, fixed-scope pilot of 4-6 weeks that ships a working integration against one workflow, measured against success criteria we agree on in week one. If the pilot proves out, we move to production integration and scaling.",
      },
      {
        question: "Which AI models do you work with?",
        answer:
          "OpenAI, Anthropic, Google, and open-source models, chosen per use case for accuracy, latency, cost, and data-residency requirements - not by default vendor preference.",
      },
    ],
  },
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Software Development Services - USA & India | Avlys AI",
    metaDescription:
      "Web platforms, internal tools, and marketplaces built by senior engineers across the US and India. AI-native architecture, fixed-scope delivery, full IP transfer.",
    keywords: [
      "custom software development company",
      "custom software development USA India",
      "web application development company",
      "enterprise software development",
    ],
    eyebrow: "Custom Software Development",
    h1: "Software built for your operation, not adapted to it.",
    description:
      "Platforms, internal tools, marketplaces, and customer-facing products - designed around your workflows and built AI-native from the first commit. Senior engineers, US-hours communication, India build velocity, and full IP transfer on every engagement.",
    proof: ["Senior engineers on every call", "Full IP transfer", "US + India delivery"],
    capabilities: [
      {
        title: "Web platforms and portals",
        description:
          "Customer portals, vendor platforms, and multi-role systems with authentication, payments, dashboards, and admin control built in.",
      },
      {
        title: "Internal tools and dashboards",
        description:
          "Operations consoles that replace the spreadsheet-and-email layer: order management, approvals, reporting, and team workflows.",
      },
      {
        title: "Marketplaces and multi-vendor systems",
        description:
          "Onboarding, listings, matching, scheduling, escrow payments, reviews, and commission logic across customer, vendor, and admin roles.",
      },
      {
        title: "Modernization with AI",
        description:
          "Rebuilding aging systems with AI capability designed in - search, extraction, and automation as architecture, not an afterthought.",
      },
    ],
    systems: [
      "Next.js",
      "React",
      "Node.js",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Stripe",
      "AWS",
      "Vercel",
    ],
    outcomes: [
      "A system shaped by your operating model instead of workarounds shaped by a template.",
      "Production architecture: typed codebases, CI, staging environments, and documentation.",
      "Transparent fixed-scope phases - you know the price before each phase begins.",
      "Your code, your infrastructure, your IP - handed over completely.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "Who owns the code and IP?",
        answer:
          "You do, fully. Source code, infrastructure, designs, and documentation transfer to you. We work in your repositories and your cloud accounts whenever you prefer.",
      },
      {
        question: "How do you price projects?",
        answer:
          "Fixed scope, fixed price, phase by phase. Every engagement starts with a scoped first phase priced before work begins, so there is no open-ended billing surprise.",
      },
      {
        question: "How does the US + India model work?",
        answer:
          "Senior engineers in India deliver the build; communication, demos, and decision meetings run on US-friendly hours. You get one accountable team, not a handoff chain.",
      },
      {
        question: "Do you maintain software after launch?",
        answer:
          "Yes. Every build includes 90 days of post-deploy tuning, and we offer ongoing maintenance retainers covering updates, monitoring, fixes, and feature iterations.",
      },
    ],
  },
  {
    slug: "ai-agents",
    title: "AI Agent Development",
    metaTitle: "AI Agent Development Services | Avlys AI",
    metaDescription:
      "Production AI agents for support, sales, voice, and operations - with orchestration, human-in-the-loop control, and your business rules. Fixed-scope pilots.",
    keywords: [
      "AI agent development company",
      "AI agent development services",
      "enterprise AI agents",
      "multi-agent systems",
    ],
    eyebrow: "AI Agent Development",
    h1: "Agents that complete workflows, not just conversations.",
    description:
      "We design and ship AI agents that execute real business processes - qualifying leads, resolving support tickets, handling calls, processing documents - with the orchestration, state management, and human checkpoints that production systems require.",
    proof: ["Human-in-the-loop by design", "Grounded answers only", "Production orchestration"],
    capabilities: [
      {
        title: "Support and service agents",
        description:
          "Agents that answer from approved policies, retrieve order and account data, and escalate sensitive cases to your team with full context.",
      },
      {
        title: "Sales and intake agents",
        description:
          "Qualification across web, chat, and voice: structured questions, scoring, CRM write-back, and routing to the right person with notes attached.",
      },
      {
        title: "Voice agents",
        description:
          "Inbound and outbound calling agents that qualify, book, remind, and follow up - with transfer rules and structured call summaries.",
      },
      {
        title: "Multi-agent orchestration",
        description:
          "LangGraph-style architectures with state management, error handling, evaluation suites, and observability - designed for operations teams, not demos.",
      },
    ],
    systems: [
      "LangGraph",
      "OpenAI",
      "Anthropic",
      "CrewAI",
      "Twilio",
      "WhatsApp Business API",
      "HubSpot",
      "Salesforce",
      "Custom CRMs",
    ],
    outcomes: [
      "Agents constrained to your business rules, with escalation paths for everything else.",
      "Structured data written back to your systems - not transcripts left in another inbox.",
      "Evaluation and monitoring so you can see accuracy, coverage, and failure modes.",
      "A system your operators control: prompts, rules, and knowledge sources they can update.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "How do you stop an agent from making things up?",
        answer:
          "Grounding and constraint. Agents answer only from approved knowledge sources, cite what they used, refuse outside their scope, and escalate to humans on low confidence. We ship evaluation suites that measure this before and after launch.",
      },
      {
        question: "Can agents hand off to our team?",
        answer:
          "Yes - handoff is designed first, not bolted on. Urgency rules, confidence thresholds, VIP routing, and full-context transfer to your existing tools.",
      },
      {
        question: "What channels can agents operate on?",
        answer:
          "Web chat, WhatsApp, voice calls, email, and internal tools like Slack - usually starting with the single channel where you lose the most time or leads.",
      },
      {
        question: "How long until a working agent?",
        answer:
          "A scoped pilot agent against one workflow typically ships in 4-6 weeks, including integration with your data sources and a measured evaluation against agreed success criteria.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    metaTitle: "AI Automation Services for Business Workflows | Avlys AI",
    metaDescription:
      "Automate lead response, support triage, document processing, and CRM workflows with AI - integrated into your existing tools. Fixed-scope delivery in weeks.",
    keywords: [
      "AI automation services",
      "business workflow automation",
      "AI process automation",
      "CRM automation services",
    ],
    eyebrow: "AI Automation Services",
    h1: "Workflows that run themselves, with your rules.",
    description:
      "The repetitive layer of your operation - lead follow-up, support triage, data entry, document handling, status chasing - automated with AI and wired into the tools you already use. Every automation follows business logic you approve and can change.",
    proof: ["Your tools, automated", "Approval gates built in", "Measured before scaled"],
    capabilities: [
      {
        title: "Lead response and routing",
        description:
          "Instant first response across web, chat, and phone; qualification questions; scoring; CRM updates; and routing to the right salesperson with context.",
      },
      {
        title: "Support triage and resolution",
        description:
          "Repeat questions answered from approved sources, tickets classified and routed, and unresolved cases escalated with a clean summary.",
      },
      {
        title: "Document processing",
        description:
          "Invoices, contracts, applications, and forms extracted into structured data, validated against rules, and written into your systems.",
      },
      {
        title: "Operations glue",
        description:
          "The handoffs between tools - CRM to spreadsheet to email to dashboard - replaced with reliable automations that log every action.",
      },
    ],
    systems: [
      "HubSpot",
      "Salesforce",
      "Zendesk",
      "WhatsApp Business API",
      "Slack",
      "Google Workspace",
      "n8n",
      "Zapier",
      "Custom APIs",
    ],
    outcomes: [
      "First response in seconds on the channels where you currently lose leads.",
      "Consistent handling: the same questions, rules, and routing on every case.",
      "Hours of manual data movement replaced with logged, auditable automations.",
      "Visibility - dashboards showing what ran, what escalated, and what failed.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "What should we automate first?",
        answer:
          "The workflow where delay costs the most - usually inbound lead response or support triage. We pick the first automation by measurable impact and data readiness, not by what demos well.",
      },
      {
        question: "Will automation break when our process changes?",
        answer:
          "Automations are built with explicit, documented rules your team can update, plus monitoring that flags failures instead of hiding them. Change the process, update the rule - no rebuild.",
      },
      {
        question: "Do we need new software for this?",
        answer:
          "Usually not. We integrate with the CRM, helpdesk, and messaging tools you already run. New tooling enters only when something is genuinely missing.",
      },
      {
        question: "How do you measure whether it worked?",
        answer:
          "Each automation ships with a success metric defined upfront - response time, resolution rate, hours saved - and a dashboard that tracks it against the pre-automation baseline.",
      },
    ],
  },
  {
    slug: "ai-training-data",
    title: "Data Collection & Preparation",
    metaTitle: "AI Training Data Services - Collection & Preparation | Avlys AI",
    metaDescription:
      "Datasets built for the model you are training: collection, annotation, cleaning, and evaluation sets. Delivered by a named core team under NDA and DPA.",
    keywords: [
      "AI training data services",
      "data collection and preparation",
      "data annotation services India",
      "dataset preparation for LLM fine-tuning",
      "AI data preparation company",
    ],
    eyebrow: "Data Collection & Preparation",
    h1: "The dataset your model actually needs.",
    description:
      "Collection, annotation, cleaning, and evaluation sets - scoped to the model you are training rather than sold by the seat. Delivered by the same core team that builds the systems the data feeds.",
    proof: ["Core team, not a crowd", "Paid calibration batch first", "Per-unit pricing"],
    capabilities: [
      {
        title: "Collection and sourcing",
        description:
          "Text, documents, images, audio, video, and multilingual data gathered or sourced to a spec agreed upfront - including the long-tail cases your model keeps getting wrong.",
      },
      {
        title: "Annotation and labeling",
        description:
          "Classification, extraction, entity and intent labeling, transcription, bounding boxes, and segmentation - against a written taxonomy, with edge cases settled before volume production starts.",
      },
      {
        title: "Cleaning and curation",
        description:
          "Deduplication, normalization, PII handling, chunking and metadata for RAG corpora, and instruction/response formatting for fine-tuning runs.",
      },
      {
        title: "Evaluation and golden sets",
        description:
          "Held-out test sets and scored benchmarks, so you can prove whether a model actually improved instead of judging it on a demo.",
      },
    ],
    systems: [
      "JSONL",
      "CSV / Parquet",
      "COCO / YOLO",
      "WAV / MP3",
      "Label Studio",
      "Hugging Face Datasets",
      "S3 / GCS",
      "PostgreSQL / pgvector",
      "Custom schemas",
    ],
    outcomes: [
      "A dataset shaped by your model's actual failure modes, not a generic labeling template.",
      "Quality you can inspect: a held-out gold set, agreement scores, and a correction log.",
      "Per-unit pricing agreed after a paid calibration batch - no open-ended data spend.",
      "Documented schema and guidelines, so the dataset stays usable long after handover.",
    ],
    workflow: dataWorkflow,
    faqs: [
      {
        question: "Who actually does the annotation?",
        answer:
          "Our core team. Work is not pushed out to an anonymous crowd platform, so the same accountable people stay on your project throughout - which is what lets domain context and calibration hold across a dataset.",
      },
      {
        question: "What data types can you handle?",
        answer:
          "Text, documents, images, audio, video, and multilingual data, scoped per project. We agree the taxonomy and quality bar with you first. If a dataset needs specialist domain knowledge we do not have, we say so before the engagement starts rather than after.",
      },
      {
        question: "How do you measure quality?",
        answer:
          "Every project runs a second review pass, independent of whoever produced the work, scored against a held-out gold set. You receive the agreement scores and the correction log along with the data - not just the finished files.",
      },
      {
        question: "Who owns the data, and how is it protected?",
        answer:
          "You own the dataset outright. Engagements run under NDA with a data processing agreement, least-privilege access, and your data kept in your storage where you prefer. We do not currently hold HIPAA or SOC 2 certification - if your data requires certified handling, we will tell you that upfront instead of after signing.",
      },
      {
        question: "Can you also build the system that uses the data?",
        answer:
          "Yes, and that is usually the point. Most data vendors hand over files and leave. We can prepare the dataset and carry it straight into the pilot that consumes it, so nothing is lost translating between two vendors.",
      },
    ],
  },
  {
    slug: "ai-consulting-mid-market",
    title: "AI Consulting for Mid-Sized Companies",
    metaTitle: "AI Consulting for Mid-Sized Companies | Avlys AI",
    metaDescription:
      "AI strategy for mid-market teams without a data science department: readiness assessment, use-case selection, build-vs-buy analysis, and a costed pilot plan.",
    keywords: [
      "AI consulting for mid-sized companies",
      "AI readiness assessment",
      "AI strategy consulting",
      "mid-market AI adoption",
    ],
    eyebrow: "AI Consulting - Mid-Market",
    h1: "Enterprise-grade AI, scoped for mid-market reality.",
    description:
      "You don't need a data science team to adopt AI - you need an honest assessment of where it pays back, what your data supports today, and what it will cost. We deliver that as a fixed-price engagement that ends in a costed, buildable plan.",
    proof: ["Fixed-price assessment", "Build-vs-buy honesty", "Ends in a costed plan"],
    capabilities: [
      {
        title: "AI readiness assessment",
        description:
          "A structured review of your systems, data quality, and workflows that identifies what AI can use today and what needs fixing first.",
      },
      {
        title: "Use-case selection by ROI",
        description:
          "Candidate use cases ranked by measurable impact, feasibility, and time to value - with the weak ones eliminated before they consume budget.",
      },
      {
        title: "Build-vs-buy analysis",
        description:
          "Where an off-the-shelf tool is the right answer, we say so. Custom builds are recommended only where they create a durable advantage.",
      },
      {
        title: "Pilot roadmap and costing",
        description:
          "A concrete first pilot: scope, architecture, success metrics, timeline, and a fixed price - ready to execute with us or any competent team.",
      },
    ],
    systems: [
      "Your existing CRM/ERP",
      "OpenAI",
      "Anthropic",
      "Open-source LLMs",
      "Data warehouses",
      "Spreadsheet workflows",
    ],
    outcomes: [
      "A clear answer to 'where does AI actually pay back for us' - with numbers and assumptions shown.",
      "Use cases you should not pursue, identified before they cost you a failed project.",
      "A pilot plan with fixed scope, success metrics, and price - executable immediately.",
      "Plain-language documentation your leadership team can act on.",
    ],
    workflow: [
      {
        title: "Discover",
        detail:
          "Interviews with your operators and a review of your systems and data - where time goes, where leads leak, where decisions wait.",
        artifacts: ["Workflow inventory", "Data readiness review"],
      },
      {
        title: "Evaluate",
        detail:
          "Candidate AI use cases scored on impact, feasibility, and cost, with build-vs-buy recommendations for each.",
        artifacts: ["Ranked use-case matrix", "Build-vs-buy analysis"],
      },
      {
        title: "Plan",
        detail:
          "The strongest use case turned into a concrete pilot: scope, architecture, integration points, success metrics, and a fixed price.",
        artifacts: ["Pilot specification", "Costed roadmap", "Executive summary"],
      },
    ],
    faqs: [
      {
        question: "We don't have a data team. Is AI realistic for us?",
        answer:
          "Usually yes. Most mid-market AI wins - lead response, support triage, document processing - run on the data already in your CRM, helpdesk, and inbox. The assessment tells you precisely what is realistic with what you have.",
      },
      {
        question: "Are you just going to recommend hiring you to build it?",
        answer:
          "The deliverable is a plan you can execute with any competent team - scope, architecture, and success metrics included. If an off-the-shelf product fits better than a custom build, the plan says so.",
      },
      {
        question: "How long does the assessment take?",
        answer:
          "Two to three weeks for most mid-market teams: one week of discovery, then evaluation and a costed pilot plan, delivered as working documents plus a leadership walkthrough.",
      },
      {
        question: "What does it cost?",
        answer:
          "It is a fixed-price engagement, quoted after a 30-minute scoping call based on the number of workflows and systems in scope - agreed before work begins, like everything we do.",
      },
    ],
  },
];

export const getServicePage = (slug: string) =>
  servicePages.find((service) => service.slug === slug);
