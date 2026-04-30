import LeadCaptureForm from "./LeadCaptureForm";

const CallToAction = () => {
  return (
    <section id="contact" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Ready to Automate?
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Send the workflow. We will map the fastest path to automation.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
              Share the workflow, goals, and timeline. We will confirm scope and suggest the best launch path.
            </p>
            <div className="mt-6 flex flex-col gap-3 text-sm text-[var(--muted)]">
              <a href="mailto:official@avlysai.com" className="transition-opacity hover:opacity-60">
                official@avlysai.com
              </a>
              <a href="tel:+919337709699" className="transition-opacity hover:opacity-60">
                +91 93377 09699
              </a>
            </div>
          </div>
          <div className="border border-[var(--border-subtle)] bg-[var(--background)] p-6">
            <LeadCaptureForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
