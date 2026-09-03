import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CallToAction from "../../components/CallToAction";
import CaseStudyImage from "../../components/CaseStudyImage";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
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
  const imageUrl = `${path}/opengraph-image`;

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
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: `${caseStudy.title} Case Study | Avlys AI`,
      description: caseStudy.headline,
      type: "article",
      images: [
        {
          url: absoluteUrl(imageUrl),
          width: 1200,
          height: 630,
          alt: `${caseStudy.title} case study by Avlys AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.title} Case Study | Avlys AI`,
      description: caseStudy.headline,
      images: [absoluteUrl(imageUrl)],
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
        image: `${caseStudyUrl}/opengraph-image`,
        inLanguage: "en-US",
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
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="type-caption-strong uppercase tracking-wide text-primary">
              {caseStudy.category}
            </p>
            <h1 className="type-display-lg mt-4 text-ink">{caseStudy.title}</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              {caseStudy.headline}
            </p>
            <p className="type-caption mt-6 text-ink-faint">
              {caseStudy.type} · {caseStudy.stack} · {caseStudy.market}
            </p>
            {caseStudy.liveUrl ? (
              <p className="mt-6">
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[17px] text-primary transition-opacity hover:opacity-65"
                >
                  Visit live website
                </a>
              </p>
            ) : null}
          </div>
          <div className="mx-auto mt-12 w-full max-w-5xl overflow-hidden rounded-[18px] border border-hairline">
            <CaseStudyImage
              slug={caseStudy.slug}
              title={caseStudy.title}
              coverImage={caseStudy.coverImage}
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
            />
          </div>
        </section>

        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-3">
            {[
              ["Context", caseStudy.context],
              ["Challenge", caseStudy.challenge],
              ["Solution", caseStudy.solution],
            ].map(([label, copy]) => (
              <article key={label} className="rounded-[18px] border border-hairline bg-canvas p-7">
                <p className="type-caption-strong uppercase tracking-wide text-primary">
                  {label}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-canvas px-6 py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
            <div>
              <h2 className="type-display-lg text-ink">Delivered.</h2>
              <div className="mt-8 flex flex-col gap-3">
                {caseStudy.deliverables.map((deliverable) => (
                  <div
                    key={deliverable}
                    className="flex items-start gap-4 rounded-[11px] border border-hairline p-4"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-[15px] leading-relaxed text-ink-muted">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="type-display-lg text-ink">Outcomes.</h2>
              <div className="mt-8 flex flex-col gap-3">
                {caseStudy.outcomes.map((outcome) => (
                  <div
                    key={outcome}
                    className="flex items-start gap-4 rounded-[11px] border border-hairline p-4"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <p className="text-[15px] leading-relaxed text-ink-muted">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="on-dark bg-tile-1 px-6 py-16 text-on-dark">
          <div className="mx-auto w-full max-w-6xl">
            <h2 className="type-display-lg text-center">How it was built.</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {caseStudy.process.map((step, index) => (
                <div key={step} className="rounded-[18px] bg-tile-3 p-6">
                  <span className="type-caption-strong text-primary-on-dark">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="type-caption mt-3 text-on-dark-muted">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-parchment px-6 py-16">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="type-display-lg text-ink">Related work.</h2>
                <Link
                  href="/case-studies"
                  className="text-[17px] text-primary transition-opacity hover:opacity-70"
                >
                  All case studies &rarr;
                </Link>
              </div>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/case-studies/${item.slug}`}
                    className="overflow-hidden rounded-[18px] border border-hairline bg-canvas transition-colors hover:border-ink-faint"
                  >
                    <CaseStudyImage
                      slug={item.slug}
                      title={item.title}
                      coverImage={item.coverImage}
                      sizes="(min-width: 768px) 30vw, 100vw"
                    />
                    <div className="p-5">
                      <h3 className="text-[17px] font-semibold leading-snug text-ink">
                        {item.title}
                      </h3>
                      <p className="type-caption mt-2 text-ink-muted">{item.headline}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
