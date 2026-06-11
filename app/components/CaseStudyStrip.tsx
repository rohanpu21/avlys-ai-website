import Link from "next/link";
import { featuredCaseStudies } from "../data/caseStudies";
import Reveal from "./Reveal";

// Horizontal scroll-snap strip of featured work on dark tiles.
const CaseStudyStrip = () => {
  return (
    <section className="on-dark bg-tile-2 px-6 py-20 text-on-dark">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="type-display-lg">Shipped systems.</h2>
            <p className="type-lead-airy mt-3 text-on-dark-muted">
              Platforms, marketplaces, agents, and automations in production.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="text-[17px] text-primary-on-dark transition-opacity hover:opacity-70"
          >
            All case studies &rarr;
          </Link>
        </Reveal>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {featuredCaseStudies.map((caseStudy) => (
            <Link
              key={caseStudy.slug}
              href={`/case-studies/${caseStudy.slug}`}
              className="flex w-[300px] shrink-0 snap-start flex-col rounded-[18px] bg-tile-3 p-6 transition-colors hover:bg-tile-1 sm:w-[340px]"
            >
              <span className="type-caption-strong uppercase tracking-wide text-on-dark-muted">
                {caseStudy.category}
              </span>
              <h3 className="mt-3 flex-1 text-[17px] font-semibold leading-snug">
                {caseStudy.headline}
              </h3>
              <p className="type-fine-print mt-4 text-on-dark-muted">
                {caseStudy.stack}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyStrip;
