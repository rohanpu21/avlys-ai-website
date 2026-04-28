const solutions = [
  {
    title: "AI Calling Agents",
    description:
      "Human-like voice systems for inbound inquiries, outbound qualification, appointment setting, and property or service follow-ups.",
  },
  {
    title: "Custom AI Chatbots",
    description:
      "Website and WhatsApp assistants that answer FAQs, send brochures, collect requirements, and route qualified buyers.",
  },
  {
    title: "Tailored Software",
    description:
      "Custom web platforms, internal tools, dashboards, marketplaces, and data workflows built around your operating model.",
  },
  {
    title: "Agentic Systems",
    description:
      "Multi-agent architectures, RAG systems, offline AI stacks, and workflow orchestration for more advanced automation needs.",
  },
];

const SolutionsGrid = () => {
  return (
    <section id="solutions" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Our Core Solutions
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            Systems for conversations, operations, and custom workflows.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="group border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
            >
              <div className="mb-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)] transition-colors group-hover:text-[var(--muted-strong)]">
                0{index + 1}
              </div>
              <h3 className="text-xl font-light">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{solution.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
