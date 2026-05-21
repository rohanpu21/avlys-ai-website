import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectVisual from "../components/ProjectVisual";
import StructuredData from "../components/StructuredData";
import { caseStudies } from "../data/caseStudies";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Case Studies | Avlys AI",
  },
  description:
    "Explore Avlys AI case studies across AI calling agents, WhatsApp chatbots, marketplaces, ecommerce builds, websites, agentic systems, and automation workflows.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    url: absoluteUrl("/case-studies"),
    title: "AI Automation Case Studies | Avlys AI",
    description:
      "Explore Avlys AI case studies across AI calling agents, WhatsApp chatbots, marketplaces, ecommerce builds, websites, agentic systems, and automation workflows.",
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
    title: "AI Automation Case Studies | Avlys AI",
    description:
      "Explore Avlys AI case studies across AI calling agents, WhatsApp chatbots, marketplaces, ecommerce builds, websites, agentic systems, and automation workflows.",
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
      name: "AI Automation Case Studies - Avlys AI",
      description:
        "Avlys AI case studies across automation, AI agents, commerce, marketplaces, websites, and support systems.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
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

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Case Studies
              </p>
              <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
                Proof from shipped systems.
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                Every portfolio project is now presented as a case study with
                context, challenge, solution, delivery scope, outcomes, and
                project-specific visual proof.
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
              <p className="font-mono text-4xl font-light">{caseStudies.length}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Published studies
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {caseStudies.map((caseStudy, index) => (
              <Link
                key={caseStudy.slug}
                href={`/case-studies/${caseStudy.slug}`}
                className={`group border border-[var(--border-subtle)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 || caseStudy.visualKind === "voice-agent" ? "md:col-span-2" : ""
                }`}
              >
                <ProjectVisual
                  kind={caseStudy.visualKind}
                  title={caseStudy.title}
                  category={caseStudy.category}
                  index={index + 1}
                />
                <div className="p-3 pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {caseStudy.type}
                  </p>
                  <h2 className="mt-4 text-2xl font-light leading-snug">{caseStudy.title}</h2>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    {caseStudy.headline}
                  </p>
                  <div className="mt-6 grid gap-2 border-t border-[var(--border-subtle)] pt-5 text-xs text-[var(--muted-strong)] sm:grid-cols-3">
                    <span>Stack: {caseStudy.stack}</span>
                    <span>Market: {caseStudy.market}</span>
                    <span>Category: {caseStudy.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
