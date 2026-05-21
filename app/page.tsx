import type { Metadata } from "next";
import CallToAction from "./components/CallToAction";
import FAQ, { homepageFaqs } from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PortfolioPreview from "./components/PortfolioPreview";
import ProblemSolution from "./components/ProblemSolution";
import Process from "./components/Process";
import SolutionsGrid from "./components/SolutionsGrid";
import StructuredData from "./components/StructuredData";
import WhyAvlys from "./components/WhyAvlys";
import { siteConfig } from "./lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Agency India - Chatbots, Calling Agents & Custom Software",
  },
  description:
    "Avlys AI is a Hyderabad-based AI automation agency building AI calling agents, WhatsApp chatbots, customer support automation, lead qualification systems, and custom software.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
    title: "AI Automation Agency India - Chatbots, Calling Agents & Custom Software",
    description:
      "Avlys AI builds custom AI calling agents, WhatsApp chatbots, and automation systems for businesses in India and globally.",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: "AI Automation Agency India - Avlys AI",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      about: {
        "@id": `${siteConfig.url}/#organization`,
      },
      description: siteConfig.description,
      inLanguage: "en-IN",
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.url}/#faq`,
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={homeSchema} />
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <SolutionsGrid />
        <Process />
        <PortfolioPreview />
        <WhyAvlys />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
