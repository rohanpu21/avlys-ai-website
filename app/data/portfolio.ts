export type PortfolioItemBase = {
  title: string;
  type: string;
  stack: string;
  market: string;
  description: string;
  category: string;
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
  "Website Maintenance & Support",
];

const rawPortfolioItems: PortfolioItemBase[] = [
  {
    title: "Pooja Banvar - Professional Business Website",
    type: "Website Development",
    stack: "WordPress + Custom CSS",
    market: "India (INR)",
    description:
      "A polished business website with responsive pages, contact lead capture, on-page SEO, analytics, and speed optimization.",
    category: "Website Development & Redesign",
  },
  {
    title: "Saud Khan - Freelance Developer Personal Website",
    type: "Website Development",
    stack: "WordPress / Custom Code",
    market: "India (INR)",
    description:
      "A mobile-first professional website with CMS setup, SEO foundations, contact flow, performance tuning, and post-launch support.",
    category: "Website Development & Redesign",
  },
  {
    title: "Darshan Thaker - B2B Engineering CMS Website",
    type: "B2B Website Development",
    stack: "WordPress + Elementor Pro + ACF",
    market: "India (INR)",
    description:
      "An SEO-first engineering website with dynamic services, project filtering, blog CMS, maps, WhatsApp CTA, CDN, and security setup.",
    category: "Website Development & Redesign",
  },
  {
    title: "Aniket Nikhade - High-Performance Custom Website",
    type: "Custom Website Development",
    stack: "HTML/CSS/JS + CMS",
    market: "International (USD)",
    description:
      "A conversion-focused website with custom UI/UX, backend and CMS integration, structured data, Core Web Vitals work, and QA.",
    category: "Website Development & Redesign",
  },
  {
    title: "Aqua Flight - Luxury Yacht Services Rebuild",
    type: "Luxury Website Rebuild",
    stack: "Webflow",
    market: "International (USD)",
    description:
      "A full strategic rebuild with luxury UX patterns, information architecture, SEO migration, and landing zones for charter, buying, logistics, and concierge.",
    category: "Website Development & Redesign",
  },
  {
    title: "Luis Orozco - Casino and Gaming Brand Website",
    type: "Website Development",
    stack: "WordPress / Custom Code",
    market: "International (USD)",
    description:
      "An immersive gaming brand website for Mexico and LATAM with research, Figma design, responsive development, QA, and go-live support.",
    category: "Website Development & Redesign",
  },
  {
    title: "AlesonFoods - D2C Food E-Commerce Website",
    type: "D2C E-Commerce",
    stack: "Shopify / WooCommerce / Custom",
    market: "International (USD)",
    description:
      "A premium mobile-first food commerce site with catalog, cart, checkout, payment integration, trust elements, SEO, and support.",
    category: "E-Commerce Development",
  },
  {
    title: "Fat Cow Skincare - D2C Beauty E-Commerce Website",
    type: "D2C E-Commerce",
    stack: "Shopify / WooCommerce / Custom",
    market: "International (USD)",
    description:
      "An editorial skincare storefront with skin concern quiz, ingredient transparency, proof sections, mobile-first build, and SEO.",
    category: "E-Commerce Development",
  },
  {
    title: "Shopify Freelance Build - D2C Brand Store",
    type: "Shopify Development",
    stack: "Shopify Liquid / Custom Sections",
    market: "International (USD)",
    description:
      "A solo Shopify build with Liquid customization, bespoke sections, reviews and upsell apps, speed optimization, and support.",
    category: "E-Commerce Development",
  },
  {
    title: "Multi-Vendor Marketplace Platform",
    type: "Marketplace Platform",
    stack: "Full-Stack Mobile + Web",
    market: "India (INR)",
    description:
      "A scalable commerce marketplace with admin panels, customer and vendor apps, onboarding, order management, checkout, and commission logic.",
    category: "Marketplace & Platform Builds",
  },
  {
    title: "Ariana Lloyd - Webflow Directory Platform",
    type: "Directory and Marketplace Platform",
    stack: "Webflow + Memberstack + Wized + Xano + Finsweet",
    market: "International (USD)",
    description:
      "A profile and directory platform with memberships, filtering, booking, real-time messaging backend, editorial CMS, and mobile responsiveness.",
    category: "Marketplace & Platform Builds",
  },
  {
    title: "Kristen Leaman - Creator and Brand Jobs Board",
    type: "Creator Economy Marketplace",
    stack: "WordPress / No-Code + Stripe + GHL CRM",
    market: "International (USD)",
    description:
      "A creator-brand marketplace MVP with role-based portals, job posting, applications, Stripe payments, CRM sync, and support.",
    category: "Marketplace & Platform Builds",
  },
  {
    title: "Joanna Koh - Client-Vendor Service Platform",
    type: "Full-Stack Service Marketplace",
    stack: "React/Next.js + Node.js/Laravel + PostgreSQL + Stripe",
    market: "International (USD)",
    description:
      "A service marketplace with smart matching, scheduling, escrow payments, reviews, ratings, and a complete admin dashboard.",
    category: "Marketplace & Platform Builds",
  },
  {
    title: "Off-Grid Modular AI Ecosystem",
    type: "Off-Grid AI Infrastructure",
    stack: "Ubuntu + Ollama + LocalAI + n8n + ChromaDB + Wav2Lip",
    market: "India (INR)",
    description:
      "A fully offline modular AI ecosystem with LLM routing, outreach automation, content generation, local RAG, and avatar rendering.",
    category: "AI & Agentic Systems",
  },
  {
    title: "Agentic AI Architecture and Engineering",
    type: "Agentic AI Systems",
    stack: "LangGraph / CrewAI / AutoGen + OpenAI / Anthropic / Gemini",
    market: "International (USD)",
    description:
      "Enterprise multi-agent system design covering orchestration, HITL workflows, state-managed pipelines, error handling, and documentation.",
    category: "AI & Agentic Systems",
  },
  {
    title: "Multi-Agent Customer Support System",
    type: "AI Research and System Design",
    stack: "Relevance AI / Langflow",
    market: "Academic / Internal",
    description:
      "A three-agent e-commerce support design with routing, RAG policy answers, structured data retrieval, grounding, and observability research.",
    category: "AI & Agentic Systems",
  },
  {
    title: "AI Real Estate Voice Agent",
    type: "AI Voice + WhatsApp Automation",
    stack: "AI Voice + WhatsApp API",
    market: "India / International",
    description:
      "A 24/7 lead qualification system that handles calls, screens budget and timeline, schedules visits, and sends brochures over WhatsApp.",
    category: "AI & Agentic Systems",
  },
  {
    title: "Lead Automation Suite",
    type: "Lead Automation",
    stack: "CRM + AI + Automation",
    market: "India / International",
    description:
      "An end-to-end lead capture, qualification, scoring, routing, and nurturing system for faster sales follow-up.",
    category: "Automation & Chatbot Systems",
  },
  {
    title: "WhatsApp Chatbot Systems",
    type: "WhatsApp Automation",
    stack: "WhatsApp API + AI",
    market: "India / International",
    description:
      "Smart WhatsApp bots for brochures, FAQs, buyer requirements, and automated follow-up sequences across real estate, D2C, and services.",
    category: "Automation & Chatbot Systems",
  },
  {
    title: "NGO Website Maintenance - Dual-Site Retainer",
    type: "Website Maintenance",
    stack: "WordPress",
    market: "India (INR)",
    description:
      "A monthly support retainer for two NGO websites covering content updates, backups, patching, malware scans, performance, fixes, and reporting.",
    category: "Website Maintenance & Support",
  },
];

export const portfolioItems: PortfolioItem[] = rawPortfolioItems.map((item) => ({
  ...item,
  slug: createProjectSlug(item.title),
}));

export const portfolioPreviewItems = portfolioItems.slice(0, 4);
