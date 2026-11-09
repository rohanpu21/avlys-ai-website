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
      "Map the workflow, check data readiness, and agree the success criteria.",
    artifacts: ["System map", "Data readiness review", "Success criteria document"],
  },
  {
    title: "Pilot",
    detail:
      "Test one working workflow in a fixed-scope, fixed-price pilot over 4-6 weeks.",
    artifacts: ["Working pilot system", "Evaluation results", "Pilot-to-production plan"],
  },
  {
    title: "Integrate",
    detail:
      "Connect your systems with access controls, logging, and human-review checkpoints.",
    artifacts: ["Production integrations", "Access and audit controls", "Runbook"],
  },
  {
    title: "Scale",
    detail:
      "Hand over the system and improve it under the support scope agreed with you.",
    artifacts: ["Usage reviews", "Documentation", "Handover and training"],
  },
];

const productWorkflow: ServiceWorkflowStep[] = [
  {
    title: "Scope",
    detail:
      "Agree the users, workflows, responsibilities, and acceptance criteria for the first release.",
    artifacts: ["Product scope", "User workflows", "Acceptance criteria"],
  },
  {
    title: "Design and build",
    detail:
      "Build the application and integrations together, with regular working demonstrations.",
    artifacts: ["Product designs", "Working software", "Progress reviews"],
  },
  {
    title: "Validate and launch",
    detail:
      "Test real use cases, permissions, and failure paths; prepare deployment with your operators.",
    artifacts: ["Validation results", "Deployment plan", "Operator documentation"],
  },
  {
    title: "Improve and support",
    detail:
      "Review usage and feedback, then maintain and improve the product under an agreed support plan.",
    artifacts: ["Handover", "Support plan", "Improvement backlog"],
  },
];

// Data work has its own lifecycle: the calibration batch and the independent
// audit pass replace the pilot/integrate rhythm of a build engagement.
const dataWorkflow: ServiceWorkflowStep[] = [
  {
    title: "Scope",
    detail:
      "Agree the model task, label taxonomy, edge cases, and quality thresholds.",
    artifacts: ["Annotation guidelines", "Label taxonomy", "Quality thresholds"],
  },
  {
    title: "Calibrate",
    detail:
      "Review a small paid batch together and refine the guidelines before volume production.",
    artifacts: ["Sample dataset", "Calibration notes", "Per-unit pricing"],
  },
  {
    title: "Produce",
    detail:
      "Collect, clean, and label data, checking for duplicates, malformed records, and missing fields.",
    artifacts: ["Working dataset", "Automated check log", "Progress reporting"],
  },
  {
    title: "Audit",
    detail:
      "Independently review the output against a held-out gold set and document corrections.",
    artifacts: ["Gold-set audit results", "Agreement scores", "Correction log"],
  },
  {
    title: "Deliver",
    detail:
      "Deliver in your pipeline's format, with a schema, guidelines, and known limitations.",
    artifacts: ["Final dataset", "Schema and data dictionary", "Handover documentation"],
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: "custom-software-development",
    title: "Custom Software Development",
    metaTitle: "Custom Enterprise Software Development in India | Avlys AI",
    metaDescription:
      "AI-native enterprise platforms, internal tools, and customer applications. Avlys's India-based product and engineering team takes software from discovery to launch and support.",
    keywords: [
      "custom software development company",
      "custom software development India",
      "web application development company",
      "enterprise software development",
    ],
    eyebrow: "Custom Software Development",
    h1: "Enterprise software built around your business.",
    description:
      "Custom platforms, internal tools, and customer applications, from product discovery to launch and ongoing engineering.",
    proof: ["Product design + engineering", "Scope agreed before build", "India-based team"],
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
      "Workflows shaped around your business.",
      "Typed code, CI, staging, and documentation.",
      "A fixed scope and price for each phase.",
      "Ownership of your code, infrastructure, and IP.",
    ],
    workflow: productWorkflow,
    faqs: [
      {
        question: "What kinds of custom software does Avlys AI build?",
        answer:
          "Avlys AI builds custom web platforms and portals, internal operations tools and dashboards, marketplaces, and customer-facing applications. Each scope starts with your workflows; integrations and AI features are included where they fit.",
      },
      {
        question: "When should a business choose custom software over an off-the-shelf product?",
        answer:
          "Custom software makes sense when a critical workflow, integration, or product requirement is poorly served by available tools and the cost of workarounds justifies a build. If an off-the-shelf product meets the requirements more simply, Avlys recommends buying it instead. The decision is scoped around workflow fit, integrations, ownership needs, and the total cost of operating the system.",
      },
      {
        question: "How long does custom software development take?",
        answer:
          "A first working pilot for one scoped workflow typically takes 4-6 weeks. A full production build can take longer depending on product scope, integrations, testing, and rollout needs. Avlys scopes and prices each phase before work begins, so there is no single timeline for every build.",
      },
      {
        question: "Who owns the code and IP?",
        answer:
          "You do, fully. Source code, infrastructure, designs, and documentation transfer to you. We work in your repositories and your cloud accounts whenever you prefer.",
      },
      {
        question: "How much does custom software development cost?",
        answer:
          "Custom software pricing depends on the workflow, integrations, security requirements, and rollout needs, so there is no single price for every build. Avlys scopes the first phase after a 30-minute call, then agrees a fixed price before work begins. A first working pilot for one workflow typically takes 4-6 weeks; later production phases are scoped separately.",
      },
      {
        question: "Where is the team, and how do we work together?",
        answer:
          "Our team works from Hyderabad and Bengaluru, India. We agree a communication cadence, working demonstrations, and decision points with you, including time-zone overlap for clients outside India.",
      },
      {
        question: "Do you maintain software after launch?",
        answer:
          "Yes. We agree post-launch support with you as part of the engagement. Ongoing engineering and maintenance can cover monitoring, fixes, updates, and new product capabilities through a separately scoped retainer.",
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
      "AI agents for support, sales, voice, and document workflows, with business rules, evaluation, and human checkpoints.",
    proof: ["Human review built in", "Grounding and evaluation", "Production orchestration"],
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
      "Business rules and defined escalation paths.",
      "Structured updates in your existing systems.",
      "Measured accuracy, coverage, and failure modes.",
      "Prompts, rules, and knowledge your team can manage.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "How do you stop an agent from making things up?",
        answer:
          "We ground responses in approved sources, add citations where available, and design refusal and human-escalation paths. These controls reduce risk but do not eliminate errors. Evaluation before and after launch checks accuracy, scope adherence, and failure cases against agreed criteria.",
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
      {
        question: "How much does AI agent development cost?",
        answer:
          "Avlys prices an agent pilot as a fixed-scope, fixed-price phase after a 30-minute scoping call. The quote depends on the workflow, channels, system integrations, evaluation, and human-review requirements. You agree the scope and success metric before build work begins; larger delivery is priced phase by phase.",
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
      "Automate lead follow-up, support triage, and document handling inside your existing tools, with rules and approval steps you control.",
    proof: ["Your tools, automated", "Approval gates built in", "Measured before scaled"],
    capabilities: [
      {
        title: "Lead response and routing",
        description:
          "Automated response, qualification, scoring, and CRM routing across agreed channels, with response-time targets set during scoping.",
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
      "Response times measured against your baseline.",
      "Documented questions, rules, and routing.",
      "Logged, auditable handoffs between tools.",
      "Visibility into completed, escalated, and failed runs.",
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
          "We document the rules your team can update and add monitoring to flag failures. Some process changes need only configuration; new integrations or major workflow changes may require engineering and testing. We assess that scope with you before making the change.",
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
      {
        question: "How much does AI workflow automation cost?",
        answer:
          "Avlys scopes and prices each automation before work begins. The quote depends on workflow complexity, data readiness, integrations, and the approval or monitoring rules required. The first phase is fixed-price and measured against a success metric agreed upfront.",
      },
    ],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    metaTitle: "AI Integration Services for Enterprise Systems | Avlys AI",
    metaDescription:
      "Connect AI capabilities to your enterprise applications. RAG, copilots, document pipelines, and controlled integrations from Avlys's India-based engineering team.",
    keywords: [
      "AI integration services",
      "integrate AI into existing software",
      "enterprise AI integration",
      "AI integration company",
    ],
    eyebrow: "AI Integration Services",
    h1: "AI built into the systems you already run.",
    description:
      "Connect AI search, copilots, and document workflows to your existing applications through controlled integrations.",
    proof: ["Works with your systems", "4-6 week pilots", "Support scoped with you"],
    capabilities: [
      {
        title: "Retrieval-augmented generation (RAG)",
        description:
          "Retrieval from your documents and databases, with citations, access controls, and evaluation to measure answer quality.",
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
      "AI capabilities inside your existing applications.",
      "Source grounding, citations, and audit trails.",
      "A measured pilot before production rollout.",
      "A documented integration layer your engineers can maintain.",
    ],
    workflow: pilotWorkflow,
    faqs: [
      {
        question: "Can you integrate AI without replacing our existing software?",
        answer:
          "Yes. For integration engagements, we build around your current ERP, CRM, or custom applications. Your systems of record stay where they are; AI reads from and writes to them through controlled APIs.",
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
        question: "How much does AI integration cost?",
        answer:
          "Avlys quotes each AI integration after a 30-minute scope call. The price depends on the workflow, systems to connect, data readiness, model choice, and security requirements. The first phase is a fixed-scope, fixed-price pilot, typically 4-6 weeks for one workflow; production work is scoped and priced separately.",
      },
      {
        question: "Which AI models do you work with?",
        answer:
          "OpenAI, Anthropic, Google, and open-source models, chosen per use case for accuracy, latency, cost, and data-residency requirements - not by default vendor preference.",
      },
    ],
  },
  {
    slug: "enterprise-ai-consulting",
    title: "Enterprise AI Consulting",
    metaTitle: "Enterprise AI Consulting | Avlys AI",
    metaDescription:
      "AI strategy for enterprises: readiness assessment, use-case selection, build-vs-buy analysis, and a costed pilot plan.",
    keywords: [
      "enterprise AI consulting",
      "AI readiness assessment",
      "AI strategy consulting",
      "enterprise AI adoption",
    ],
    eyebrow: "Enterprise AI Consulting",
    h1: "An AI roadmap your enterprise can build on.",
    description:
      "Choose the right AI use case and leave with a costed build plan, based on your systems, data, and business priorities.",
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
      "Expected impact with assumptions made explicit.",
      "Lower-value use cases identified before a build.",
      "A pilot scope, success criteria, and fixed price.",
      "A plan your leadership and engineering teams can use.",
    ],
    workflow: [
      {
        title: "Discover",
        detail:
          "Review workflows, systems, and data with your operators.",
        artifacts: ["Workflow inventory", "Data readiness review"],
      },
      {
        title: "Evaluate",
        detail:
          "Compare use cases by impact, feasibility, and cost; assess build versus buy.",
        artifacts: ["Ranked use-case matrix", "Build-vs-buy analysis"],
      },
      {
        title: "Plan",
        detail:
          "Define the pilot's scope, architecture, success criteria, and fixed price.",
        artifacts: ["Pilot specification", "Costed roadmap", "Executive summary"],
      },
    ],
    faqs: [
      {
        question: "Can we start with the data and systems we already have?",
        answer:
          "Often, yes. Workflows such as lead response, support triage, and document processing can use the data already in your CRM, helpdesk, and inbox. The assessment tells you precisely what is realistic with what you have.",
      },
      {
        question: "Are you just going to recommend hiring you to build it?",
        answer:
          "The deliverable is a plan you can execute with any competent team - scope, architecture, and success metrics included. If an off-the-shelf product fits better than a custom build, the plan says so.",
      },
      {
        question: "How long does the assessment take?",
        answer:
          "A focused assessment typically takes two to three weeks. Timing depends on system access, stakeholder availability, and the workflows in scope. We agree the schedule before discovery begins.",
      },
      {
        question: "What does it cost?",
        answer:
          "It is a fixed-price engagement, quoted after a 30-minute scoping call based on the number of workflows and systems in scope - agreed before work begins, like everything we do.",
      },
    ],
  },
  {
    slug: "ai-training-data",
    title: "Data Collection & Preparation",
    metaTitle: "AI Training Data Services - Collection & Preparation | Avlys AI",
    metaDescription:
      "AI training data services: image, audio and video catalogue options, plus custom text, collection, annotation, cleaning and evaluation scoped to your model task.",
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
      "Collection, annotation, and evaluation for your model task. Explore image, audio, and video catalogue options; text and document work is custom-scoped.",
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
      "Data scoped around your model's failure modes.",
      "Gold-set results, agreement scores, and corrections.",
      "Per-unit pricing after a paid calibration batch.",
      "Documented schema, guidelines, and limitations.",
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
          "The current off-the-shelf catalogue describes image, audio and video options. Text and document data, custom collection, and other task-specific work are scoped per project. We agree on the taxonomy and quality bar first. If specialist domain expertise is needed, we confirm fit before the engagement.",
      },
      {
        question: "How do you measure quality?",
        answer:
          "Every project runs a second review pass, independent of whoever produced the work, scored against a held-out gold set. You receive the agreement scores and the correction log along with the data - not just the finished files.",
      },
      {
        question: "How much does AI training data cost?",
        answer:
          "Custom training-data pricing depends on accepted units, collection difficulty, language or domain expertise, annotation depth, review, and permitted use. Avlys agrees the unit definition, minimum batch, and per-unit quote after a paid calibration batch and before production begins.",
      },
      {
        question: "Who owns the data, and how is it protected?",
        answer:
          "For custom work, the written agreement defines rights in the agreed deliverables. For off-the-shelf options, permitted use and any restrictions are confirmed in the written terms; Avlys cannot transfer rights outside those terms. Before client data is shared, agree on access, storage location, transfer, retention, deletion, and any required processing terms. Avlys does not currently hold HIPAA or SOC 2 certification; if certified handling is required, we will say so before work begins.",
      },
      {
        question: "Can you also build the system that uses the data?",
        answer:
          "Yes, and that is usually the point. Most data vendors hand over files and leave. We can prepare the dataset and carry it straight into the pilot that consumes it, so nothing is lost translating between two vendors.",
      },
    ],
  },
];

export const getServicePage = (slug: string) =>
  servicePages.find((service) => service.slug === slug);
