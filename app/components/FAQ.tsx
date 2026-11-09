import Link from "next/link";

const faqs = [
  {
    question: "What does Avlys AI build?",
    answer: "AI-native custom software: platforms, internal tools and intelligent workflows. We build new products and connect them to the systems your team already uses.",
    link: { href: "/services", label: "Explore Avlys services" },
  },
  {
    question: "How much will it cost?",
    answer: "We start with a discovery call, then propose a scoped first phase with deliverables, pricing and milestones. You review the plan before committing to the build.",
  },
  {
    question: "How long does a build take?",
    answer: "It depends on the scope, data and integrations. We agree milestones upfront and share working increments so you can review progress.",
  },
  {
    question: "Who owns the software after launch?",
    answer: "You own the code and project deliverables. We agree access, documentation, handover and any ongoing support as part of the engagement.",
  },
  {
    question: "Does Avlys AI also help with AI training data?",
    answer: "Yes. Avlys Data offers image, audio and video options. Text, document work and custom collection are scoped separately; availability and permitted use are confirmed for each brief.",
    link: { href: "/data", label: "Explore Avlys Data" },
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="bg-canvas px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="type-display-lg text-center text-ink">Common questions</h2>
        <div className="mt-8 divide-y divide-hairline border-y border-hairline">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 rounded-sm py-5 text-[17px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                <span>{faq.question}</span>
                <span aria-hidden="true" className="shrink-0 text-[24px] font-normal text-primary group-open:rotate-45">+</span>
              </summary>
              <div className="pb-6 pr-8">
                <p className="text-[16px] leading-relaxed text-ink-muted">{faq.answer}</p>
                {faq.link && (
                  <Link href={faq.link.href} className="mt-2 inline-flex min-h-11 items-center text-[14px] font-medium text-primary underline-offset-4 hover:underline">
                    {faq.link.label} <span className="ml-2" aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export { faqs as homepageFaqs };
