import Link from "next/link";
import Reveal from "./Reveal";

const capabilities = [
  {
    title: "Custom platforms",
    detail: "Customer portals, marketplaces and products built around your business.",
    href: "/services/custom-software-development",
    example: "Built for your customers",
  },
  {
    title: "Internal tools",
    detail: "Give your team one place to manage work, data and decisions.",
    href: "/services/custom-software-development",
    example: "Built for your team",
  },
  {
    title: "AI workflows",
    detail: "Put agents, document intelligence and automation into everyday work.",
    href: "/services/ai-agents",
    example: "Built into your operations",
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="bg-canvas px-6 py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="type-display-lg text-ink">What we can build for you.</h2>
          <Link href="/services" className="inline-flex min-h-11 items-center text-[15px] text-primary underline-offset-4 hover:underline">
            All services <span className="ml-2" aria-hidden="true">→</span>
          </Link>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {capabilities.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <Link href={item.href} className="group flex h-full flex-col rounded-[18px] border border-hairline bg-parchment p-6 transition-colors hover:border-primary">
                <p className="type-caption text-ink-muted">{item.example}</p>
                <h3 className="mt-4 text-[22px] font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 flex-1 text-[16px] leading-relaxed text-ink-muted">{item.detail}</p>
                <span className="mt-5 inline-flex min-h-11 items-center text-[14px] font-medium text-primary">
                  Explore <span className="ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}