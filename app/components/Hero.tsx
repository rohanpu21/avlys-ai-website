import Link from "next/link";

const Hero = () => {
  const proof = [
    { value: "24/7", label: "AI lead and support coverage" },
    { value: "6", label: "delivery categories in portfolio" },
    { value: "IN + Global", label: "remote-first client delivery" },
  ];

  return (
    <section className="px-6 pt-20 sm:pt-28">
      <div className="mx-auto flex min-h-[calc(100vh-84px)] w-full max-w-6xl flex-col justify-center gap-12 pb-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
          <div>
            <h1 className="max-w-5xl font-mono text-[clamp(3rem,10vw,8.5rem)] font-light leading-[0.95]">
              AI automation agency in India.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Avlys AI builds custom chatbots, AI calling agents, WhatsApp automation,
              and tailored software for businesses that need faster operations, cleaner
              handoffs, and fewer missed leads.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="mailto:official@avlysai.com"
                className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
              >
                Get Your AI Roadmap
              </a>
              <Link
                href="/portfolio"
                className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
              >
                View Portfolio
              </Link>
            </div>
          </div>
          <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Hyderabad and global
            </p>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
              Strategy, architecture, build, integration, and post-launch support for
              AI-powered operations across India and global markets.
            </p>
            <div className="mt-6 grid gap-4">
              {proof.map((item) => (
                <div key={item.value} className="border-t border-[var(--border-subtle)] pt-4">
                  <div className="font-mono text-xl font-light">{item.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)]">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid border-y border-[var(--border-subtle)] font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] sm:grid-cols-3">
          <div className="py-4 sm:border-r sm:border-[var(--border-subtle)]">Custom AI Chatbots</div>
          <div className="py-4 sm:border-r sm:border-[var(--border-subtle)] sm:px-6">AI Calling Agents</div>
          <div className="py-4 sm:px-6">Tailored Software Systems</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
