"use client";

import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type PortfolioItem = {
  title: string;
  type: string;
  stack: string;
  market: string;
  description: string;
  category: string;
};

const categories = [
  "All",
  "Website Development & Redesign",
  "E-Commerce Development",
  "Marketplace & Platform Builds",
  "AI & Agentic Systems",
  "Automation & Chatbot Systems",
  "Website Maintenance & Support",
];

const portfolioItems: PortfolioItem[] = [
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

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return portfolioItems;
    }

    return portfolioItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Avlys AI Portfolio
              </p>
              <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-none">
                Proof by category.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                A curated showcase of websites, commerce builds, marketplaces, agentic AI systems,
                automation workflows, and maintenance retainers delivered for Indian and international clients.
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] p-6">
              <p className="font-mono text-4xl font-light">{filteredItems.length}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Visible projects
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`border px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                  activeCategory === category
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border-subtle)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {filteredItems.map((item, index) => (
              <article
                key={item.title}
                className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 || item.title.includes("Agentic AI Architecture") ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="max-w-[160px] text-right text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)]">
                    {item.category}
                  </p>
                </div>
                <h2
                  className={`mt-8 font-light leading-snug ${
                    index === 0 || item.title.includes("Agentic AI Architecture")
                      ? "max-w-3xl text-3xl"
                      : "text-xl"
                  }`}
                >
                  {item.title}
                </h2>
                <div
                  className={`mt-5 grid gap-3 border-y border-[var(--border-subtle)] py-5 text-xs text-[var(--muted-strong)] ${
                    index === 0 || item.title.includes("Agentic AI Architecture")
                      ? "md:grid-cols-3"
                      : ""
                  }`}
                >
                  <span>Type: {item.type}</span>
                  <span>Stack: {item.stack}</span>
                  <span>Market: {item.market}</span>
                </div>
                <p
                  className={`mt-5 leading-6 text-[var(--muted)] ${
                    index === 0 || item.title.includes("Agentic AI Architecture")
                      ? "max-w-4xl text-base"
                      : "text-sm"
                  }`}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
