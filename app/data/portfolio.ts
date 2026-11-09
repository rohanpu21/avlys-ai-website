export type PortfolioItemBase = {
  /** Preserve published URLs when a project's display title changes. */
  slug?: string;
  title: string;
  type: string;
  stack: string;
  market: string;
  description: string;
  category: string;
  coverImage?: string;
  architectureImage?: string;
  liveUrl?: string;
};

export type PortfolioItem = PortfolioItemBase & {
  slug: string;
};

export const createProjectSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const categories = [
  "All",
  "Website Development & Redesign",
  "E-Commerce Development",
  "Marketplace & Platform Builds",
  "AI & Agentic Systems",
  "Automation & Chatbot Systems",
];

const rawPortfolioItems: PortfolioItemBase[] = [
  {
    title: "Workshop Management System",
    type: "Workshop Operations Prototype",
    stack: "Next.js + Fastify + mock adapters + Drizzle schema",
    market: "India / International",
    description:
      "An HR workshop demo with capacity-capped registration, waitlists, and approval rules. Production storage and provider wiring remain pending.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/covers/workshop-management-system.png",
    architectureImage: "/portfolio/architecture/workshop-management-system-layered.png",
  },
  {
    title: "Mike Legal AI",
    type: "Legal Document Intelligence",
    stack: "Next.js + Express + Supabase + object storage",
    market: "International (USD)",
    description:
      "A legal document workspace that ingests files, converts office formats, and lets teams query and review them through a model-backed interface.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/covers/mike-legal-ai.png",
    architectureImage: "/portfolio/architecture/mike-legal-ai-layered.png",
  },
  {
    slug: "magic-creation-studio-wedding-photography-erp",
    title: "Magic Creation Studio - Studio Operations Platform",
    type: "Photography Studio Operations",
    stack: "Next.js 14 + Supabase + shadcn/ui",
    market: "India (INR)",
    description:
      "A custom operations platform for photography studios, connecting client bookings, shoots, albums, and delivery in one workspace.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/magic-creation-studio.jpg",
    liveUrl: "https://magic-creation-studio-next.vercel.app",
  },
  {
    title: "Hospital Voice Agent",
    type: "AI Voice Reception",
    stack: "FastAPI + Sarvam STT/TTS + Groq + Google Calendar",
    market: "India (INR)",
    description:
      "A Hindi, Odia, and English hospital receptionist that answers inbound calls and books appointments into Google Calendar.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/covers/hospital-voice-agent.png",
    architectureImage: "/portfolio/architecture/hospital-voice-agent-layered.png",
    liveUrl: "https://hospital-voice-agent.vercel.app",
  },
  {
    title: "Hiredesk - Recruiting Match System",
    type: "AI Recruiting Backend",
    stack: "FastAPI + Celery + Postgres + Redis + embeddings",
    market: "India / International",
    description:
      "A recruiting backend that parses resumes, ingests jobs, and ranks matches with embeddings and LLM reranking.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/covers/hiredesk-recruiting-match-system.png",
    architectureImage: "/portfolio/architecture/hiredesk-recruiting-match-system-layered.png",
  },
  {
    title: "ad sakhi - Ad-Ops Studio",
    type: "AI Creative Operations",
    stack: "Vite + React + Clerk + FastAPI",
    market: "India (INR)",
    description:
      "A small ad-ops studio: paste a product URL, generate a 9:16 creative, then watch spend from one desk.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/ad-sakhi.jpg",
  },
  {
    title: "BidSure AI - Tender Eligibility Platform",
    type: "AI Bidding Platform",
    stack: "Next.js + Prisma",
    market: "India (INR)",
    description:
      "A contractor platform for checking tender eligibility and assembling bids from structured project requirements.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/bidsure.jpg",
  },
  {
    title: "Brand Sahayak - Social Content Platform",
    type: "AI Content Operations",
    stack: "React + TypeScript + Supabase + OpenAI",
    market: "India / International",
    description:
      "A social content desk with AI captions, brand-glossary translation, scheduling, and workspace-level access control.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/brand-sahayak.jpg",
  },
  {
    title: "Siddhi Vinayak Tiles - 3D Showroom Website",
    type: "Interactive Website",
    stack: "React + Vite + Three.js + Tailwind",
    market: "India (INR)",
    description:
      "A 3D showroom site for Siddhi Vinayak Tiles in Nuapada, live at sidhhibinayaktiles.com, with material swapping, gallery, and WhatsApp contact.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/siddhi-vinayak.jpg",
    liveUrl: "https://sidhhibinayaktiles.com",
  },
  {
    title: "Godwit Cafe - Multi-City Website",
    type: "Website Development",
    stack: "Next.js + Vercel",
    market: "India (INR)",
    description:
      "A unified cafe website for Indore, Raipur, and Nagpur with outlet pages, menu, and a direct booking path instead of aggregator-only discovery.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/godwit-cafe.jpg",
    liveUrl: "https://godwitcafe.com",
  },
  {
    title: "Taomish - CTRM Website Redesign",
    type: "B2B Website Redesign",
    stack: "Next.js + Tailwind",
    market: "International (USD)",
    description:
      "An enterprise website redesign for Taomish covering trading, treasury, risk, and derivatives positioning, with lead capture for Xceler demos.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/taomish.jpg",
    liveUrl: "https://taomish-bay.vercel.app",
  },
  {
    title: "Girish Lakhotya - Bondsman Website",
    type: "Personal Brand Website",
    stack: "Next.js",
    market: "India (INR)",
    description:
      "A founder website for Girish Lakhotya and Bond Smart: essays, video, and a single digital presence for India's bail-bond work.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/girish-lakhotya.jpg",
    liveUrl: "https://girish-lakhotya.vercel.app",
  },
  {
    title: "IndexPilot",
    type: "Website Development",
    stack: "Next.js + Vercel",
    market: "India / International",
    description:
      "A focused web interface for search visibility and indexing work.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/indexpilot.jpg",
    liveUrl: "https://indexpilot-ashen.vercel.app",
  },
  {
    title: "HJSN Digital Platform",
    type: "Enterprise Education Platform",
    stack: "Android + Web + API Gateway + PostgreSQL",
    market: "India (INR)",
    description:
      "A proposed architecture for an education and profession network, covering identity verification, membership, notifications, and external integration boundaries.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/covers/hjsn-digital-platform.png",
    architectureImage: "/portfolio/architecture/hjsn-digital-platform.jpeg",
  },
  {
    slug: "integrated-erp-and-club-management",
    title: "Club Operations Platform Architecture",
    type: "Operations Platform Design",
    stack: "Shared data model + role-based workflow design",
    market: "India (INR)",
    description:
      "A proposed operations architecture connecting membership, billing, HR, finance, and inventory through shared records and approval workflows.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/club-erp.jpg",
  },
  {
    title: "BroMechanic - Multi-City Service Platform",
    type: "Service Operations Platform",
    stack: "Multi-city web + CRM + call masking",
    market: "India (INR)",
    description:
      "A service-platform design connecting multi-city bookings, masked calling, mechanic assignment, and customer follow-up.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/bromechanic.jpg",
  },
  {
    title: "MNS Job and Career Portal",
    type: "Career Marketplace",
    stack: "Job APIs + matching + application engine",
    market: "India / International",
    description:
      "A scoped career-portal proposal covering student profiles, job matching, applications, and an admin pipeline, with nursing and healthcare as a core track.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/mns-careers.jpg",
  },
  {
    title: "AI Trade Intel - Equity and Derivatives",
    type: "Algorithmic Trading System",
    stack: "Python + swarm simulation + broker execution",
    market: "India (INR)",
    description:
      "A behavioral-intelligence trading desk for Indian equity and derivatives: news ingest, swarm consensus, signal fusion, and risk-controlled execution. Client name withheld.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/ai-trade-intel.jpg",
  },
  {
    title: "P2P Wi-Fi Camera Ecosystem",
    type: "Device + Mobile + Web",
    stack: "Embedded C/C++ + Android/iOS + WebRTC",
    market: "India (INR)",
    description:
      "A scoped camera ecosystem covering a firmware bridge, native apps, and a web viewer, designed for device-to-device video without a cloud relay.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/p2p-camera.jpg",
  },
  {
    slug: "realcrm-real-estate-pipeline",
    title: "RealCRM - Real Estate Sales Operations",
    type: "Custom Sales Operations",
    stack: "CRM + email sequences + WhatsApp",
    market: "India (INR)",
    description:
      "A custom real-estate sales workspace connecting contact scoring, owner assignment, pipeline stages, and buyer follow-up.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/realcrm.jpg",
  },
  {
    title: "Darshan Thaker - B2B Engineering CMS Website",
    type: "B2B Website Development",
    stack: "WordPress + Elementor Pro + ACF",
    market: "India (INR)",
    description:
      "An SEO-first engineering website with dynamic services, project filtering, blog CMS, maps, WhatsApp CTA, CDN, and security setup.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/darshan-thaker.jpg",
  },
  {
    title: "Aqua Flight - Luxury Yacht Services Rebuild",
    type: "Luxury Website Rebuild",
    stack: "Webflow",
    market: "International (USD)",
    description:
      "A full strategic rebuild with luxury UX patterns, information architecture, SEO migration, and landing zones for charter, buying, logistics, and concierge.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/aqua-flight.jpg",
    liveUrl: "https://aqua-flight.com",
  },
  {
    title: "Luis Orozco - Casino and Gaming Brand Website",
    type: "Website Development",
    stack: "WordPress / Custom Code",
    market: "International (USD)",
    description:
      "An immersive gaming brand website for Mexico and LATAM with research, Figma design, responsive development, QA, and go-live support.",
    category: "Website Development & Redesign",
    coverImage: "/portfolio/luis-orozco.jpg",
  },
  {
    title: "AlesonFoods - D2C Food E-Commerce Website",
    type: "D2C E-Commerce",
    stack: "Shopify / WooCommerce / Custom",
    market: "International (USD)",
    description:
      "A premium mobile-first food commerce site with catalog, cart, checkout, payment integration, trust elements, SEO, and support.",
    category: "E-Commerce Development",
    coverImage: "/portfolio/alesonfoods.jpg",
    liveUrl: "https://www.alesons.com",
  },
  {
    title: "Fat Cow Skincare - D2C Beauty E-Commerce Website",
    type: "D2C E-Commerce",
    stack: "Shopify / WooCommerce / Custom",
    market: "International (USD)",
    description:
      "An editorial skincare storefront with skin concern quiz, ingredient transparency, proof sections, mobile-first build, and SEO.",
    category: "E-Commerce Development",
    coverImage: "/portfolio/fat-cow-skincare.jpg",
    liveUrl: "https://fatcowskin.com",
  },
  {
    title: "Multi-Vendor Marketplace Platform",
    type: "Marketplace Platform",
    stack: "Full-Stack Mobile + Web",
    market: "India (INR)",
    description:
      "A commerce marketplace with admin panels, customer and vendor apps, onboarding, order management, checkout, and commission logic.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/multi-vendor.jpg",
  },
  {
    title: "Ariana Lloyd - Webflow Directory Platform",
    type: "Directory and Marketplace Platform",
    stack: "Webflow + Memberstack + Wized + Xano + Finsweet",
    market: "International (USD)",
    description:
      "A profile and directory platform with memberships, filtering, booking, real-time messaging backend, editorial CMS, and mobile responsiveness.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/ariana-lloyd.jpg",
  },
  {
    title: "Kristen Leaman - Creator and Brand Jobs Board",
    type: "Creator Economy Marketplace",
    stack: "WordPress / No-Code + Stripe + GHL CRM",
    market: "International (USD)",
    description:
      "A creator-brand marketplace MVP with role-based portals, job posting, applications, Stripe payments, CRM sync, and support.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/kristen-leaman.jpg",
  },
  {
    title: "Joanna Koh - Client-Vendor Service Platform",
    type: "Full-Stack Service Marketplace",
    stack: "React/Next.js + Node.js/Laravel + PostgreSQL + Stripe",
    market: "International (USD)",
    description:
      "A service-marketplace design covering matching, scheduling, payment flows, reviews, and an admin dashboard.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/joanna-koh.jpg",
  },
  {
    title: "Off-Grid Modular AI Ecosystem",
    type: "Off-Grid AI Infrastructure",
    stack: "Ubuntu + Ollama + LocalAI + n8n + ChromaDB + Wav2Lip",
    market: "India (INR)",
    description:
      "A modular local AI prototype connecting LLM routing, automation, content generation, retrieval, and avatar rendering.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/off-grid-ai.jpg",
  },
  {
    title: "Agentic AI Architecture and Engineering",
    type: "Agentic AI Systems",
    stack: "LangGraph / CrewAI / AutoGen + OpenAI / Anthropic / Gemini",
    market: "International (USD)",
    description:
      "Enterprise multi-agent system design covering orchestration, HITL workflows, state-managed pipelines, error handling, and documentation.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/agentic-ai.jpg",
  },
  {
    title: "Multi-Agent Customer Support System",
    type: "AI Research and System Design",
    stack: "Relevance AI / Langflow",
    market: "Academic / Internal",
    description:
      "A three-agent e-commerce support design with routing, RAG policy answers, structured data retrieval, grounding, and observability research.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/support-agents.jpg",
  },
  {
    title: "AI Real Estate Voice Agent",
    type: "AI Voice + WhatsApp Automation",
    stack: "AI Voice + WhatsApp API",
    market: "India / International",
    description:
      "A voice-and-WhatsApp workflow design for buyer qualification, visit scheduling, brochure delivery, and structured sales handoff.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/real-estate-voice.jpg",
  },
  {
    title: "Lead Automation Suite",
    type: "Lead Automation",
    stack: "CRM + AI + Automation",
    market: "India / International",
    description:
      "An automation design connecting lead capture, qualification, scoring, routing, and nurture sequences.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/lead-automation.jpg",
  },
  {
    title: "WhatsApp Chatbot Systems",
    type: "WhatsApp Automation",
    stack: "WhatsApp API + AI",
    market: "India / International",
    description:
      "WhatsApp workflow designs for brochures, FAQs, buyer requirements, and follow-up across real estate, D2C, and services.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/whatsapp-bots.jpg",
  },
];

export const portfolioItems: PortfolioItem[] = rawPortfolioItems.map((item) => ({
  ...item,
  slug: item.slug ?? createProjectSlug(item.title),
}));

export const portfolioPreviewItems = portfolioItems.slice(0, 4);
