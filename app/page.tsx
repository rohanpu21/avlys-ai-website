import type { Metadata } from "next";
import CallToAction from "./components/CallToAction";
import CaseStudyStrip from "./components/CaseStudyStrip";
import FAQ, { homepageFaqs } from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import LaunchFilmTile from "./components/LaunchFilmTile";
import Navbar from "./components/Navbar";
import Process from "./components/Process";
import PressMentions from "./components/PressMentions";
import ServicesGrid from "./components/ServicesGrid";
import StickyCtaBar from "./components/StickyCtaBar";
import StructuredData from "./components/StructuredData";
import { siteConfig } from "./lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI-native Product Studio & Enterprise Engineering Partner | Avlys AI",
  },
  description:
    "Avlys AI is an AI-native product studio and enterprise engineering partner in India. We design, build, and evolve custom platforms, internal tools, and intelligent applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
    title: "AI-native Product Studio & Enterprise Engineering Partner | Avlys AI",
    description:
      "Custom platforms, internal tools, and intelligent applications, from product discovery to production and ongoing improvement.",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: "AI-native Product Studio & Enterprise Engineering Partner - Avlys AI",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      about: {
        "@id": `${siteConfig.url}/#organization`,
      },
      description: siteConfig.description,
      inLanguage: "en-US",
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
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={homeSchema} />
      <Navbar />
      <main>
        <Hero />
        <PressMentions />
        <CaseStudyStrip />
        <ServicesGrid />
        <Process />
        <LaunchFilmTile />
        <FAQ />
        <CallToAction compact />
      </main>
      <StickyCtaBar />
      <Footer />
    </div>
  );
}
