import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ProjectVisual from "../../components/ProjectVisual";
import StructuredData from "../../components/StructuredData";
import { caseStudies, getCaseStudy } from "../../data/caseStudies";
import { absoluteUrl, siteConfig } from "../../lib/site";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {};
  }

  const path = `/case-studies/${caseStudy.slug}`;

  return {
    title: {
      absolute: `${caseStudy.title} Case Study | Avlys AI`,
    },
    description: caseStudy.headline,
    keywords: [
      caseStudy.title,
      caseStudy.type,
      caseStudy.category,
      caseStudy.stack,
      "Avlys AI case study",
      "AI automation case study",
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: `${caseStudy.title} Case Study | Avlys AI`,
      description: caseStudy.headline,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const caseStudyUrl = absoluteUrl(`/case-studies/${caseStudy.slug}`);
  const related = caseStudies
    .filter((item) => item.slug !== caseStudy.slug)
    .filter((item) => item.category === caseStudy.category || item.visualKind === caseStudy.visualKind)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${caseStudyUrl}#article`,
        headline: `${caseStudy.title} Case Study`,
        description: caseStudy.headline,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: caseStudyUrl,
        articleSection: caseStudy.category,
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${caseStudyUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Case Studies",
            item: absoluteUrl("/case-studies"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: caseStudy.title,
            item: caseStudyUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto grid w-full max-w-6xl gap-12 pb-16 lg:min-h-[calc(100vh-84px)] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {caseStudy.category}
              </p>
              <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6.4rem)] font-light leading-[0.95]">
                {caseStudy.title}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                {caseStudy.headline}
              </p>
              <div className="mt-8 grid gap-3 border-y border-[var(--border-subtle)] py-5 text-xs text-[var(--muted-strong)] sm:grid-cols-3">
                <span>Type: {caseStudy.type}</span>
                <span>Stack: {caseStudy.stack}</span>
                <span>Market: {caseStudy.market}</span>
              </div>
            </div>
            <ProjectVisual
              kind={caseStudy.visualKind}
              title={caseStudy.title}
              category={caseStudy.category}
            />
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-3">
            {[
              ["Context", caseStudy.context],
              ["Challenge", caseStudy.challenge],
              ["Solution", caseStudy.solution],
            ].map(([label, copy]) => (
              <article key={label} className="border border-[var(--border-subtle)] p-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {label}
                </p>
                <p className="mt-6 text-sm leading-7 text-[var(--muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Visual Proof
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                A designed view of the system Avlys delivered.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-6 text-[var(--muted)]">
                These visuals are clean representative mockups of the project
                system, not fabricated client screenshots. Real labels and
                project context stay in HTML for quality and accessibility.
              </p>
            </div>
            <div className="grid gap-6">
              <ProjectVisual
                kind={caseStudy.visualKind}
                title={`${caseStudy.title} system view`}
                category={caseStudy.type}
                index={2}
              />
              <div className="grid gap-6 md:grid-cols-2">
                <ProjectVisual
                  kind={caseStudy.visualKind}
                  title={`${caseStudy.title} detail view`}
                  category="Detail View"
                  index={3}
                  compact
                />
                <ProjectVisual
                  kind={caseStudy.visualKind}
                  title={`${caseStudy.title} workflow view`}
                  category="Workflow View"
                  index={4}
                  compact
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Scope
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                What was delivered.
              </h2>
            </div>
            <div className="grid border border-[var(--border-subtle)]">
              {caseStudy.deliverables.map((deliverable, index) => (
                <div
                  key={deliverable}
                  className="grid gap-4 border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:grid-cols-[120px_1fr]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted)]">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Process
              </p>
              <div className="mt-8 grid border border-[var(--border-subtle)]">
                {caseStudy.process.map((step, index) => (
                  <div
                    key={step}
                    className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Outcomes
              </p>
              <div className="mt-8 grid border border-[var(--border-subtle)]">
                {caseStudy.outcomes.map((outcome, index) => (
                  <div
                    key={outcome}
                    className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Outcome {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Work
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More case studies in this direction.
                  </h2>
                </div>
                <Link
                  href="/case-studies"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Studies
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((item, index) => (
                  <Link
                    key={item.slug}
                    href={`/case-studies/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <ProjectVisual
                      kind={item.visualKind}
                      title={item.title}
                      category={item.type}
                      index={index + 1}
                      compact
                    />
                    <h3 className="mt-6 text-lg font-light leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.headline}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Need a system like this for your business?
              </h2>
            </div>
            <Link
              href="/#contact"
              className="w-fit bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Map My Workflow
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
