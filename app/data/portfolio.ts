export type PortfolioItemBase = {
  title: string;
  type: string;
  stack: string;
  market: string;
  description: string;
  category: string;
  coverImage?: string;
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
    type: "Enterprise Operations Platform",
    stack: "Next.js + Fastify + PostgreSQL + Azure OpenAI",
    market: "India / International",
    description:
      "An HR workshop platform with capacity-capped registration, waitlists, Google Workspace reminders, and AI insight drafts that stay behind approval.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/traincore.jpg",
  },
  {
    title: "Mike Legal AI",
    type: "Legal Document Intelligence",
    stack: "Next.js + Express + Supabase + object storage",
    market: "International (USD)",
    description:
      "A legal document workspace that ingests files, converts office formats, and lets teams query and review them through a model-backed interface.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/mike-legal-ai.jpg",
  },
  {
    title: "Magic Creation Studio - Wedding Photography ERP",
    type: "Industry ERP",
    stack: "Next.js 14 + Supabase + shadcn/ui",
    market: "India (INR)",
    description:
      "A wedding photography business OS covering bookings, shoots, albums, and studio operations in one signed-in product.",
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
    coverImage: "/portfolio/hospital-voice-agent.jpg",
    liveUrl: "https://hospital-voice-agent.vercel.app",
  },
  {
    title: "Hiredesk - Recruiting Match System",
    type: "AI Recruiting Platform",
    stack: "FastAPI + Celery + Postgres + Redis + embeddings",
    market: "India / International",
    description:
      "A recruiting desk that parses resumes, ingests jobs, and ranks matches with embeddings and LLM reranking.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/hiredesk.jpg",
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
      "A focused indexing product surface for search visibility work, shipped as one web app rather than a separate marketing site.",
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
      "A modular education and profession network with identity verification, membership, notifications, and Aadhaar/Voter ID integrations — one platform, not a separate website and app story.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/hjsn-architecture.jpg",
  },
  {
    title: "Integrated ERP and Club Management",
    type: "Enterprise ERP",
    stack: "Full-stack ERP + role-based workflows",
    market: "India (INR)",
    description:
      "A unified ERP for HR, finance, membership, billing, inventory, and club operations on one database.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/club-erp.jpg",
  },
  {
    title: "BroMechanic - Multi-City Service Platform",
    type: "Service Operations Platform",
    stack: "Multi-city web + CRM + call masking",
    market: "India (INR)",
    description:
      "A bike-service platform for multi-city booking, masked calling, mechanic assignment, and leakage control — website and ops desk as one system.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/bromechanic.jpg",
  },
  {
    title: "MNS Job and Career Portal",
    type: "Career Marketplace",
    stack: "Job APIs + matching + application engine",
    market: "India / International",
    description:
      "An MNS-branded career portal for students with profile, matching, auto-apply, and admin pipeline — nursing and healthcare as a core track.",
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
      "A direct device-to-device camera stack: firmware bridge, native apps, and a live web view with no cloud video relay. One ecosystem, not a website plus a separate app case.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/p2p-camera.jpg",
  },
  {
    title: "RealCRM - Real Estate Pipeline",
    type: "CRM + Lead Automation",
    stack: "CRM + email sequences + WhatsApp",
    market: "India (INR)",
    description:
      "A real-estate contact pipeline with scoring, owner routing, and a buyer nurture sequence from ad click to closed-won.",
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
      "A scalable commerce marketplace with admin panels, customer and vendor apps, onboarding, order management, checkout, and commission logic.",
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
      "A service marketplace with smart matching, scheduling, escrow payments, reviews, ratings, and a complete admin dashboard.",
    category: "Marketplace & Platform Builds",
    coverImage: "/portfolio/joanna-koh.jpg",
  },
  {
    title: "Off-Grid Modular AI Ecosystem",
    type: "Off-Grid AI Infrastructure",
    stack: "Ubuntu + Ollama + LocalAI + n8n + ChromaDB + Wav2Lip",
    market: "India (INR)",
    description:
      "A fully offline modular AI ecosystem with LLM routing, outreach automation, content generation, local RAG, and avatar rendering.",
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
      "A 24/7 lead qualification system that handles calls, screens budget and timeline, schedules visits, and sends brochures over WhatsApp.",
    category: "AI & Agentic Systems",
    coverImage: "/portfolio/real-estate-voice.jpg",
  },
  {
    title: "Lead Automation Suite",
    type: "Lead Automation",
    stack: "CRM + AI + Automation",
    market: "India / International",
    description:
      "An end-to-end lead capture, qualification, scoring, routing, and nurturing system for faster sales follow-up.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/lead-automation.jpg",
  },
  {
    title: "WhatsApp Chatbot Systems",
    type: "WhatsApp Automation",
    stack: "WhatsApp API + AI",
    market: "India / International",
    description:
      "Smart WhatsApp bots for brochures, FAQs, buyer requirements, and automated follow-up sequences across real estate, D2C, and services.",
    category: "Automation & Chatbot Systems",
    coverImage: "/portfolio/whatsapp-bots.jpg",
  },
];

export const portfolioItems: PortfolioItem[] = rawPortfolioItems.map((item) => ({
  ...item,
  slug: createProjectSlug(item.title),
}));

export const portfolioPreviewItems = portfolioItems.slice(0, 4);
