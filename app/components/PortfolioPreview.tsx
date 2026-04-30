import Link from "next/link";
import { portfolioPreviewItems } from "../data/portfolio";

const PortfolioPreview = () => {
  return (
    <section id="portfolio" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Portfolio Proof
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Delivered systems across websites, commerce, marketplaces, and AI.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              A focused snapshot of our most recent work. Browse the full portfolio for every category.
            </p>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
          >
            View Full Portfolio
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {portfolioPreviewItems.map((item, index) => (
            <article
              key={item.title}
              className="border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 text-xl font-light leading-snug">{item.title}</h3>
              <div className="mt-4 grid gap-2 border-y border-[var(--border-subtle)] py-4 text-xs text-[var(--muted-strong)]">
                <span>Type: {item.type}</span>
                <span>Stack: {item.stack}</span>
                <span>Market: {item.market}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
