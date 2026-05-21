"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CaseStudyImage from "../components/CaseStudyImage";
import { caseStudies } from "../data/caseStudies";
import { categories } from "../data/portfolio";

const PortfolioClient = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return caseStudies;
    }

    return caseStudies.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            AI Automation Portfolio
          </p>
          <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-none">
            Proof by category.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
            A curated showcase of AI calling agents, WhatsApp chatbot systems,
            automation workflows, custom platforms, marketplaces, and website
            systems delivered for Indian and international clients.
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
          <Link
            key={item.title}
            href={`/case-studies/${item.slug}`}
            className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
              index === 0 || item.title.includes("Agentic AI Architecture") ? "md:col-span-2" : ""
            }`}
          >
            <CaseStudyImage
              slug={item.slug}
              title={item.title}
              priority={index < 2}
              sizes={
                index === 0 || item.title.includes("Agentic AI Architecture")
                  ? "(min-width: 768px) 70vw, 100vw"
                  : "(min-width: 768px) 45vw, 100vw"
              }
            />
            <div className="mt-6 flex items-start justify-between gap-6">
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
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
              Open Case Study
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default PortfolioClient;
