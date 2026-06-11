import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Audit",
    detail:
      "We map your systems, data, and the workflow you want to change - and agree the success metric before anything is built.",
    artifacts: "System map · Data review · Success criteria",
  },
  {
    number: "02",
    title: "Pilot",
    detail:
      "A fixed-price, fixed-scope working system in 4-6 weeks, tested against real cases. Working software, not a slide deck.",
    artifacts: "Working pilot · Evaluation results · Production plan",
  },
  {
    number: "03",
    title: "Integrate",
    detail:
      "Wired into your stack - CRM, ERP, telephony, internal tools - with access controls, logging, and human-review checkpoints.",
    artifacts: "Integrations · Audit controls · Runbook",
  },
  {
    number: "04",
    title: "Scale",
    detail:
      "90 days of post-deploy tuning included. We review real usage, fix edge cases, and hand over a system your team operates.",
    artifacts: "Usage reviews · Documentation · Handover",
  },
];

const Process = () => {
  return (
    <section id="process" className="bg-parchment px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg text-ink">
            Fixed scope. Working software. No discovery-phase theater.
          </h2>
          <p className="type-lead-airy mt-4 text-ink-muted">
            Every engagement follows the same four steps, and you know the
            price before each one begins.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.05}>
              <div className="flex h-full flex-col rounded-[18px] border border-hairline bg-canvas p-6">
                <span className="type-caption-strong text-primary">
                  {step.number}
                </span>
                <h3 className="mt-2 text-[17px] font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="type-caption mt-3 flex-1 text-ink-muted">
                  {step.detail}
                </p>
                <p className="type-fine-print mt-4 text-ink-faint">
                  {step.artifacts}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
