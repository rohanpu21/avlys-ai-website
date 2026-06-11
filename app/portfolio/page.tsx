import type { Metadata } from "next";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { caseStudies } from "../data/caseStudies";
import { absoluteUrl, siteConfig } from "../lib/site";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: {
    absolute: "Portfolio - Platforms, AI Systems & Custom Software | Avlys AI",
  },
  description:
    "Browse delivered Avlys AI projects: marketplaces, AI agent systems, automation workflows, e-commerce builds, and custom software for Indian and US clients.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    url: absoluteUrl("/portfolio"),
    title: "Portfolio - Platforms, AI Systems & Custom Software | Avlys AI",
    description:
      "Delivered projects: marketplaces, AI agent systems, automation workflows, e-commerce builds, and custom software.",
  },
};

const portfolioUrl = absoluteUrl("/portfolio");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${portfolioUrl}#webpage`,
      url: portfolioUrl,
      name: "Portfolio - Avlys AI",
      description:
        "A portfolio of platforms, AI systems, automation, marketplace, commerce, and website projects from Avlys AI.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${portfolioUrl}#portfolio-items`,
      itemListElement: caseStudies.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        description: item.description,
        url: absoluteUrl(`/case-studies/${item.slug}`),
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${portfolioUrl}#breadcrumb`,
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
          name: "Portfolio",
          item: portfolioUrl,
        },
      ],
    },
  ],
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <PortfolioClient />
        </div>
      </main>
      <CallToAction />
      <Footer />
    </div>
  );
}
