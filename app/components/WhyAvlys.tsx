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

const WhyAvlys = () => {
  return (
    <section id="why" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
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
