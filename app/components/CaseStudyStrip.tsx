import Link from "next/link";
import { featuredCaseStudies } from "../data/caseStudies";
import CaseStudyImage from "./CaseStudyImage";
import Reveal from "./Reveal";

export default function CaseStudyStrip() {
  const [featured, ...more] = featuredCaseStudies;
  if (!featured) return null;
  return (
    <section className="on-dark bg-tile-2 px-6 py-20 text-on-dark">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="type-caption-strong uppercase tracking-[0.14em] text-on-dark-muted">Selected work</p>
            <h2 className="type-display-lg mt-4">Intelligence, put to work.</h2>
          </div>
          <Link href="/case-studies" className="inline-flex min-h-11 items-center text-primary-on-dark">Explore the work →</Link>
        </Reveal>
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <CaseStudyImage slug={featured.slug} title={featured.title} coverImage={featured.coverImage} sizes="(min-width: 1024px) 55vw, 100vw" />
            <p className="type-fine-print mt-3 text-on-dark-muted">Logical architecture · Explore the project for a full-size diagram</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-caption-strong text-primary-on-dark">{featured.title} · Software build</p>
            <h3 className="mt-4 text-[28px] font-semibold leading-tight tracking-tight">From scattered files to one document workspace.</h3>
            <p className="mt-5 text-[17px] leading-relaxed text-on-dark-muted">{featured.solution}</p>
            <ul className="mt-6 grid gap-3 text-[15px] text-on-dark-muted">
              {featured.deliverables.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-primary-on-dark">→</span>{item}</li>)}
            </ul>
            <Link href={`/case-studies/${featured.slug}`} className="mt-7 inline-flex min-h-11 items-center text-primary-on-dark">Read the implementation story →</Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 border-t border-white/15 pt-8 md:grid-cols-3">
          {more.map((item) => (
            <Link key={item.slug} href={`/case-studies/${item.slug}`} className="group flex flex-col py-2">
              <p className="type-caption text-on-dark-muted">{item.type}</p>
              <h3 className="mt-3 text-[21px] font-semibold leading-tight group-hover:text-primary-on-dark">{item.title}</h3>
              <p className="type-caption mt-3 text-on-dark-muted">{item.deliverables.slice(0, 2).join(" · ")}</p>
              <span className="mt-auto pt-5 text-[15px] text-primary-on-dark">View project →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
