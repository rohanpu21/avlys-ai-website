import Link from "next/link";
import { servicePages } from "../data/services";
import Reveal from "./Reveal";

// Utility-card grid per DESIGN-apple.md: white cards, hairline border,
// 18px radius, no shadows.
const ServicesGrid = () => {
  return (
    <section id="services" className="bg-canvas px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="type-display-lg text-ink">What we build.</h2>
          <p className="type-lead-airy mt-4 text-ink-muted">
            Six ways teams work with us - every one starting with a fixed
            scope and a success metric.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.05}>
              <Link
                href={`/services/${service.slug}`}
                className="flex h-full flex-col rounded-[18px] border border-hairline bg-canvas p-6 transition-colors hover:border-ink-faint"
              >
                <h3 className="text-[17px] font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="type-caption mt-3 flex-1 text-ink-muted">
                  {service.description}
                </p>
                <span className="mt-5 text-[14px] text-primary">
                  Learn more &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
