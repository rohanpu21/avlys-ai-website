import Reveal from "./Reveal";

const commitments = [
  {
    title: "Clarity before the build",
    description:
      "Agree the scope, deliverables, pricing, and responsibilities for each phase before work begins.",
  },
  {
    title: "Work with the builders",
    description:
      "Collaborate with the people designing and engineering your product through working demos and technical decisions.",
  },
  {
    title: "Your IP, completely",
    description:
      "Source code, infrastructure, and documentation transfer to you. We work in your repos and cloud when you prefer.",
  },
  {
    title: "Plan beyond launch",
    description:
      "Agree a support and handover plan, with documentation, operating responsibilities, and room for the product to evolve.",
  },
];

const WhyAvlys = () => {
  return (
    <section id="why" className="bg-canvas px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg text-ink">
            A partnership with clear ownership.
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
