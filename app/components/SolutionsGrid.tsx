import Link from "next/link";

const solutions = [
  {
    title: "AI Calling Agents",
    href: "/services/ai-calling-agents",
    description:
      "Human-like voice systems for inbound inquiries, outbound qualification, appointment setting, and property or service follow-ups.",
  },
  {
    title: "Custom AI Chatbots",
    href: "/services/custom-ai-chatbot-development",
    description:
      "Website and WhatsApp assistants that answer FAQs, send brochures, collect requirements, and route qualified buyers.",
  },
  {
    title: "WhatsApp AI Chatbots",
    href: "/services/whatsapp-ai-chatbots",
    description:
      "Smart WhatsApp bots for FAQs, brochures, buyer requirements, lead capture, and automated follow-up sequences.",
  },
  {
    title: "Lead Qualification AI Agents",
    href: "/services/lead-qualification-ai-agents",
    description:
      "AI systems that capture, score, route, and nurture leads across website, WhatsApp, phone, forms, and CRM workflows.",
  },
];

const SolutionsGrid = () => {
  return (
    <section id="solutions" className="px-6 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Our Core Solutions
          </p>
          <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
            Systems for conversations, operations, and custom workflows.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="group border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
            >
              <div className="mb-10 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)] transition-colors group-hover:text-[var(--muted-strong)]">
                0{index + 1}
              </div>
              <h3 className="text-xl font-light">{solution.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{solution.description}</p>
              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                Explore Service
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsGrid;
