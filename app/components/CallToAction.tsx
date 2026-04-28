const CallToAction = () => {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Ready to Automate?
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Send the workflow. We will map the fastest path to automation.
            </h2>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:official@avlysai.com"
              className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Get Started Today
            </a>
            <a
              href="tel:+919337709699"
              className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
            >
              Call +91 93377 09699
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
