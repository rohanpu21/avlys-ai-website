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
      <section className="bg-canvas px-6 pb-12 pt-20 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="type-hero text-ink">Portfolio.</h1>
          <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
            {caseStudies.length} delivered projects across platforms,
            marketplaces, AI systems, automation, commerce, and websites - for
            Indian and international clients.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-4 py-2 text-[14px] font-semibold transition-all active:scale-95 ${
                activeCategory === category
                  ? "bg-ink text-on-dark"
                  : "border border-hairline bg-canvas text-ink-muted hover:border-ink-faint"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-parchment px-6 py-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
        {filteredItems.map((item, index) => (
          <article
            key={item.title}
            className="group overflow-hidden rounded-[18px] border border-hairline bg-canvas transition-colors hover:border-ink-faint"
          >
            <Link href={`/case-studies/${item.slug}`}>
              <CaseStudyImage
                slug={item.slug}
                title={item.title}
                coverImage={item.coverImage}
                priority={index < 2}
                sizes="(min-width: 768px) 45vw, 100vw"
              />
              <div className="p-6 pb-0">
                <p className="type-caption-strong uppercase tracking-wide text-primary">
                  {item.category}
                </p>
                <h2 className="mt-3 text-[19px] font-semibold leading-snug text-ink">
                  {item.title}
                </h2>
                <p className="type-caption mt-3 text-ink-muted">{item.description}</p>
                <p className="type-fine-print mt-4 text-ink-faint">
                  {item.stack} · {item.market}
                </p>
              </div>
            </Link>
            <div className="flex flex-wrap items-center gap-4 px-6 pb-6 pt-4">
              <Link
                href={`/case-studies/${item.slug}`}
                className="text-[15px] text-primary transition-opacity hover:opacity-65"
              >
                Case study
              </Link>
              {item.liveUrl ? (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-primary transition-opacity hover:opacity-65"
                >
                  Visit site
                </a>
              ) : null}
            </div>
          </article>
        ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PortfolioClient;
