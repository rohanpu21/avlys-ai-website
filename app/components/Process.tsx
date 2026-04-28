const steps = [
  {
    title: "Roadmap",
    description: "Identify the workflow, data sources, response rules, success criteria, and fastest launch path.",
  },
  {
    title: "Architecture",
    description: "Design the agent, chatbot, automation, or software system around your business logic.",
  },
  {
    title: "Build",
    description: "Ship the working interface, integrations, handoffs, dashboards, and operator controls.",
  },
  {
    title: "Optimize",
    description: "Review usage, tighten prompts and flows, document operations, and support post-launch changes.",
  },
];

const Process = () => {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Build Process
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              A practical path from messy workflow to running system.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-6 text-[var(--muted)]">
              The goal is not a demo. The goal is a handoff your operators can trust after the first week.
            </p>
          </div>
          <div className="grid border border-[var(--border-subtle)]">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="grid gap-4 border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:grid-cols-[120px_1fr]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  0{index + 1}
                </p>
                <div>
                  <h3 className="text-xl font-light">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
