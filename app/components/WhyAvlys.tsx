import Link from "next/link";

const features = [
  {
    title: "Tailored Architecture",
    description: "Not generic API wrappers. Every solution is custom-built for your business logic and data.",
  },
  {
    title: "Seamless Integration",
    description: "Works with your CRM, ERP, website, WhatsApp, and existing tools with minimal disruption.",
  },
  {
    title: "Data Security",
    description: "Designed around controlled access, privacy-aware workflows, and enterprise-ready handover.",
  },
  {
    title: "Execution Ownership",
    description: "From roadmap to build to support, Avlys AI focuses on systems your team can actually operate.",
  },
];

const proofCategories = [
  "Websites",
  "E-commerce",
  "Marketplaces",
  "Agentic AI",
  "Automation",
  "Maintenance",
];

const WhyAvlys = () => {
  return (
    <section id="proof" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Proof Library
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Delivery across web, commerce, marketplace, AI, and automation work.
            </h2>
            <Link
              href="/portfolio"
              className="mt-8 inline-flex border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
            >
              Open Portfolio
            </Link>
          </div>
          <div className="grid border border-[var(--border-subtle)] sm:grid-cols-2">
            {proofCategories.map((category) => (
              <div
                key={category}
                className="min-h-28 border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {category}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Why Avlys AI
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            We do not sell generic wrappers. We engineer operational advantages.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)]"
            >
              <h3 className="text-lg font-light">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAvlys;
