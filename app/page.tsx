import type { Metadata } from "next";
import CallToAction from "./components/CallToAction";
import CaseStudyStrip from "./components/CaseStudyStrip";
import FAQ, { homepageFaqs } from "./components/FAQ";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import IntegrationTile from "./components/IntegrationTile";
import LaunchFilmTile from "./components/LaunchFilmTile";
import LogoMarquee from "./components/LogoMarquee";
import Navbar from "./components/Navbar";
import Process from "./components/Process";
import ServicesGrid from "./components/ServicesGrid";
import StickyCtaBar from "./components/StickyCtaBar";
import StructuredData from "./components/StructuredData";
import Testimonials from "./components/Testimonials";
import WhyAvlys from "./components/WhyAvlys";
import { siteConfig } from "./lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Enterprise AI Development & Custom Software Company | Avlys AI",
  },
  description:
    "Avlys AI builds AI-native custom software, intelligent agents, and enterprise automation systems for teams in India and globally.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteConfig.url,
    title: "Enterprise AI Development & Custom Software Company | Avlys AI",
    description:
      "AI-native custom software, intelligent agents, and operational automation for enterprise teams.",
  },
};

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/#webpage`,
      url: siteConfig.url,
      name: "Enterprise AI Development & Custom Software Company - Avlys AI",
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
        <LaunchFilmTile />
        <LogoMarquee />
        <IntegrationTile />
        <ServicesGrid />
        <Process />
        <CaseStudyStrip />
        <Testimonials />
        <WhyAvlys />
        <FAQ />
        <CallToAction />
      </main>
      <StickyCtaBar />
      <Footer />
    </div>
  );
}
