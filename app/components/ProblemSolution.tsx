const ProblemSolution = () => {
  const oldWay = [
    "Leads wait for manual follow-up",
    "Teams repeat the same support answers",
    "Sales data lives across disconnected tools",
    "Customer experience changes by operator",
  ];

  const avlysWay = [
    "AI agents respond, qualify, and route instantly",
    "Chatbots answer FAQs and collect requirements",
    "Automations sync handoffs into your CRM",
    "Every workflow follows the same business logic",
  ];

  return (
    <section id="process" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            The Shift to Intelligent Operations
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            Replace manual response loops with systems that keep moving.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="border border-[var(--border-subtle)] p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
              The Old Way
            </p>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              {oldWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-[var(--muted-strong)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-8">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
              The Avlys Way
            </p>
            <ul className="mt-6 space-y-4 text-[var(--muted)]">
              {avlysWay.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 bg-[var(--foreground)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
