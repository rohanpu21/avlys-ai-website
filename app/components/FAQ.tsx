import Reveal from "./Reveal";

const faqs = [
  {
    question: "How do engagements work and what do they cost?",
    answer:
      "Every project starts with a fixed-scope, fixed-price phase - usually a 4-6 week pilot against one workflow - quoted after a 30-minute scoping call. You know the price before work begins, and each subsequent phase is scoped and priced the same way. Larger builds run as fixed-price phases; ongoing work runs as a monthly retainer.",
  },
  {
    question: "Who owns the code, and how is our data protected?",
    answer:
      "You own everything: source code, infrastructure, designs, and documentation. Engagements run under NDA, access follows least-privilege, your data stays inside your cloud where possible, and every data flow is documented before it ships.",
  },
  {
    question: "How are you different from a traditional outsourcing firm?",
    answer:
      "Small senior team, AI-native from the start, and no pyramid: the engineers who scope your project build it. We integrate into the systems you already run instead of selling a platform migration, and we commit to a measurable success metric per engagement instead of billable hours.",
  },
  {
    question: "Can you work with our existing ERP, CRM, or legacy systems?",
    answer:
      "Yes - that is most of our work. We build integration layers around Salesforce, SAP, HubSpot, NetSuite, helpdesks, databases, and custom or legacy applications, so AI capability lands inside the tools your team already uses.",
  },
  {
    question: "How fast can we see something working?",
    answer:
      "A scoped pilot ships in 4-6 weeks: a working system tested against your real cases and measured against success criteria agreed in week one. An AI readiness assessment - if you want a plan before a build - takes 2-3 weeks.",
  },
  {
    question: "Where is the team, and how do time zones work?",
    answer:
      "Engineering is based in Hyderabad, India, with delivery for US and Indian clients. Demos, decisions, and communication run on your hours; the build runs on ours - which usually means you wake up to progress.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="bg-parchment px-6 py-20">
      <div className="mx-auto w-full max-w-3xl">
        <Reveal>
          <h2 className="type-display-lg text-center text-ink">
            Questions buyers actually ask.
          </h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq) => (
            <Reveal key={faq.question}>
              <div className="rounded-[18px] border border-hairline bg-canvas p-6">
                <h3 className="text-[17px] font-semibold text-ink">
                  {faq.question}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                  {faq.answer}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export { faqs as homepageFaqs };
export default FAQ;
