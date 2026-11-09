import Link from "next/link";
import { featuredCaseStudies } from "../data/caseStudies";
import CaseStudyImage from "./CaseStudyImage";
import Reveal from "./Reveal";

export default function CaseStudyStrip() {
  const [featured, ...more] = featuredCaseStudies;
  if (!featured) return null;
  return (
    <section className="on-dark bg-tile-2 px-6 py-14 text-on-dark sm:py-16">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="type-display-lg">Selected projects</h2>
          <Link href="/case-studies" className="inline-flex min-h-11 items-center text-primary-on-dark">View all case studies →</Link>
        </Reveal>
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <Reveal>
            <CaseStudyImage slug={featured.slug} title={featured.title} coverImage={featured.coverImage} sizes="(min-width: 1024px) 55vw, 100vw" />
            <p className="type-fine-print mt-2 text-on-dark-muted">Product illustration</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="type-caption-strong text-primary-on-dark">{featured.title} · {featured.type}</p>
            <h3 className="mt-3 text-[28px] font-semibold leading-tight tracking-tight">One workspace for legal documents.</h3>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-on-dark-muted">Upload files, convert office documents to PDF, and ask questions against your library.</p>
            <Link href={`/case-studies/${featured.slug}`} className="mt-5 inline-flex min-h-11 items-center text-primary-on-dark">View case study →</Link>
          </Reveal>
        </div>
        <div className="mt-9 grid gap-5 border-t border-white/15 pt-6 md:grid-cols-3">
          {more.slice(0, 3).map((item) => (
            <Link key={item.slug} href={`/case-studies/${item.slug}`} className="group flex flex-col py-2">
              <p className="type-caption text-on-dark-muted">{item.type}</p>
              <h3 className="mt-2 text-[21px] font-semibold leading-tight group-hover:text-primary-on-dark">{item.title}</h3>
              <span className="mt-auto pt-3 text-[15px] text-primary-on-dark">View project →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
