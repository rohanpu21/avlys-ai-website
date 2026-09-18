import type { Metadata } from "next";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import OfficePhoto from "../components/OfficePhoto";
import Link from "next/link";
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
        <section className="bg-parchment px-6 py-16 sm:py-20" aria-labelledby="contact-team-heading">
          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 md:grid-cols-2 md:gap-14">
            <OfficePhoto photo="review" caption="The Avlys team at work." />
            <div>
              <p className="type-caption-strong uppercase tracking-[0.14em] text-ink-muted">The people behind the conversation</p>
              <h2 id="contact-team-heading" className="type-display-lg mt-4">Get to know Avlys.</h2>
              <p className="type-lead-airy mt-5 text-ink-muted">Meet the team and take a look inside our office before we talk about your project.</p>
              <Link href="/about#office" className="mt-6 inline-flex min-h-11 items-center text-primary">Meet the team & see our office <span aria-hidden="true" className="ml-2">→</span></Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
