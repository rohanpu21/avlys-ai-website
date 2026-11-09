import Reveal from "./Reveal";

const steps = [
  { number: "01", title: "Agree on scope", detail: "We agree on what to build, how much it costs, and when it’s due." },
  { number: "02", title: "Build and review", detail: "You review working software and give us feedback as we build it." },
  { number: "03", title: "Test and launch", detail: "We test and deploy the software, then agree on handover and support." },
];

export default function Process() {
  return (
    <section id="process" className="bg-parchment px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal>
          <h2 className="type-display-lg text-ink">How we work</h2>
        </Reveal>
        <ol className="mt-9 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.05}>
                <span className="type-caption-strong text-primary" aria-hidden="true">{step.number}</span>
                <h3 className="mt-3 text-[20px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 max-w-xs text-[16px] leading-relaxed text-ink-muted">{step.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
