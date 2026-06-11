import Reveal from "./Reveal";

const commitments = [
  {
    title: "Fixed price before work begins",
    description:
      "Every phase is scoped and priced upfront. No open-ended billing, no surprise change orders.",
  },
  {
    title: "Senior engineers on every call",
    description:
      "The people who scope your project are the people who build it. No sales layer, no handoff chain.",
  },
  {
    title: "Your IP, completely",
    description:
      "Source code, infrastructure, and documentation transfer to you. We work in your repos and cloud when you prefer.",
  },
  {
    title: "We don't leave after launch",
    description:
      "90 days of post-deploy tuning included on every build - real usage reviewed, edge cases fixed, team trained.",
  },
];

const WhyAvlys = () => {
  return (
    <section id="why" className="bg-canvas px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg text-ink">
            How we keep the risk on our side.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {commitments.map((commitment, index) => (
            <Reveal key={commitment.title} delay={index * 0.05}>
              <div className="h-full rounded-[18px] border border-hairline p-6">
                <h3 className="text-[17px] font-semibold text-ink">
                  {commitment.title}
                </h3>
                <p className="type-caption mt-3 text-ink-muted">
                  {commitment.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAvlys;
