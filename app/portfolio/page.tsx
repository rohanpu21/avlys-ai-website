"use client";

import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { categories, portfolioItems } from "../data/portfolio";

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
