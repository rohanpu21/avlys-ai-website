import type { Metadata } from "next";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call or send project details. Avlys AI replies within one business day - custom software and AI integration for US and Indian teams.",
  alternates: {
    canonical: "/contact",
  },
};

const contactUrl = absoluteUrl("/contact");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${contactUrl}#webpage`,
  url: contactUrl,
  name: "Contact Avlys AI",
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#organization`,
  },
  inLanguage: "en-US",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-10 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="type-hero text-ink">Talk to an engineer.</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              Tell us about the workflow or system. We&rsquo;ll tell you
              honestly whether AI pays back, and what a fixed-price first phase
              would look like.
            </p>
          </div>
        </section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
