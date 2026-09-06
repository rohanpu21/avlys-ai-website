import type { Metadata } from "next";
import Link from "next/link";
import CaseStudyImage from "../components/CaseStudyImage";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { caseStudies, featuredCaseStudies } from "../data/caseStudies";
import { absoluteUrl, siteConfig } from "../lib/site";

const pageTitle = "Case Studies - Platforms, AI Agents & Automation | Avlys AI";
const pageDescription =
  "Shipped systems: marketplaces, AI agent architectures, voice agents, automation suites, and custom platforms - each with context, solution, and delivery scope.";

export const metadata: Metadata = {
  title: {
    absolute: pageTitle,
  },
  description: pageDescription,
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    url: absoluteUrl("/case-studies"),
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: absoluteUrl("/case-studies/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Avlys AI case studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [absoluteUrl("/case-studies/opengraph-image")],
  },
};

const caseStudiesUrl = absoluteUrl("/case-studies");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${caseStudiesUrl}#webpage`,
      url: caseStudiesUrl,
      name: "Case Studies - Avlys AI",
      description: pageDescription,
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${caseStudiesUrl}#case-study-list`,
      itemListElement: caseStudies.map((caseStudy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: caseStudy.title,
        url: absoluteUrl(`/case-studies/${caseStudy.slug}`),
      })),
    },
  ],
};

// Featured (platform/AI) work leads; the rest follows.
const featuredSlugSet = new Set(featuredCaseStudies.map((item) => item.slug));
const orderedCaseStudies = [
  ...featuredCaseStudies,
  ...caseStudies.filter((caseStudy) => !featuredSlugSet.has(caseStudy.slug)),
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="type-hero text-ink">Selected work.</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              Marketplaces, AI agent architectures, voice agents, automations,
              and custom platforms - each documented with the context, the
              solution, and what was delivered.
            </p>
          </div>
        </section>
        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-2">
            {orderedCaseStudies.map((caseStudy, index) => (
              <article
                key={caseStudy.slug}
                className="group overflow-hidden rounded-[18px] border border-hairline bg-canvas transition-colors hover:border-ink-faint"
              >
                <Link href={`/case-studies/${caseStudy.slug}`}>
                  <CaseStudyImage
                    slug={caseStudy.slug}
                    title={caseStudy.title}
                    coverImage={caseStudy.coverImage}
                    priority={index < 2}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                  <div className="p-6 pb-0">
                    <p className="type-caption-strong uppercase tracking-wide text-primary">
                      {caseStudy.engagement ?? "Software build"}
                    </p>
                    <h2 className="mt-3 text-[21px] font-semibold leading-snug text-ink">
                      {caseStudy.headline}
                    </h2>
                    <p className="type-caption mt-4 text-ink-faint">
                      {caseStudy.stack} · {caseStudy.market}
                    </p>
                  </div>
                </Link>
                <div className="flex flex-wrap items-center gap-4 px-6 pb-6 pt-4">
                  <Link
                    href={`/case-studies/${caseStudy.slug}`}
                    className="text-[15px] text-primary transition-opacity hover:opacity-65"
                  >
                    Case study
                  </Link>
                  {caseStudy.liveUrl ? (
                    <a
                      href={caseStudy.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[15px] text-primary transition-opacity hover:opacity-65"
                    >
                      Visit site
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
