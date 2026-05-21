import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { caseStudies } from "../data/caseStudies";
import { absoluteUrl, siteConfig } from "../lib/site";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Portfolio - Chatbots, Calling Agents & Custom Platforms | Avlys AI",
  },
  description:
    "Browse Avlys AI case-study proof across AI calling agents, WhatsApp chatbots, agentic systems, automation workflows, e-commerce builds, marketplaces, and custom software.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    url: absoluteUrl("/portfolio"),
    title: "AI Automation Portfolio - Avlys AI",
    description:
      "AI calling agents, WhatsApp chatbots, automation workflows, and custom platforms delivered for Indian and international clients.",
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
      name: "AI Automation Portfolio - Avlys AI",
      description:
        "A portfolio of AI automation, chatbot, calling agent, marketplace, website, and custom software projects from Avlys AI.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <PortfolioClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
