const faqs = [
  {
    question: "What is Avlys AI?",
    answer:
      "Avlys AI is an AI automation agency in Hyderabad, India. We build AI calling agents, WhatsApp chatbots, customer support automation, lead qualification systems, and custom software for Indian and global businesses.",
  },
  {
    question: "What AI automation services does Avlys AI offer?",
    answer:
      "Avlys AI offers AI calling agents, custom AI chatbots, WhatsApp automation, lead capture and qualification, CRM workflow automation, support automation, agentic systems, and tailored software platforms.",
  },
  {
    question: "Who should use AI calling agents?",
    answer:
      "AI calling agents are useful for real estate teams, service businesses, clinics, education providers, marketplaces, and sales teams that miss calls or need consistent lead qualification and appointment booking.",
  },
  {
    question: "How does Avlys AI optimize automation after launch?",
    answer:
      "After launch, Avlys AI reviews usage data, transcripts, lead quality, handoff accuracy, and operator feedback to improve prompts, workflows, integrations, and response logic.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Common Questions
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            Clear answers for buyers comparing AI automation partners.
          </h2>
        </div>
        <div className="mt-10 grid border border-[var(--border-subtle)]">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="grid gap-5 border-b border-[var(--border-subtle)] p-6 last:border-b-0 lg:grid-cols-[160px_1fr]"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <h3 className="text-xl font-light">{faq.question}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { faqs as homepageFaqs };
export default FAQ;
