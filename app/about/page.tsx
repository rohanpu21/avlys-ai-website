import type { Metadata } from "next";
import Link from "next/link";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import StructuredData from "../components/StructuredData";
import { caseStudies } from "../data/caseStudies";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Avlys AI is a Hyderabad-based engineering team building custom software and AI integrations for enterprise and mid-market clients in the US and India.",
  alternates: {
    canonical: "/about",
  },
};

const aboutUrl = absoluteUrl("/about");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${aboutUrl}#webpage`,
  url: aboutUrl,
  name: "About Avlys AI",
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  about: {
    "@id": `${siteConfig.url}/#organization`,
  },
  inLanguage: "en-US",
};

const principles = [
  {
    title: "Integrate, don't replace",
    description:
      "The fastest path to AI value runs through the systems a company already operates. We extend working software instead of selling migrations.",
  },
  {
    title: "Working software over decks",
    description:
      "Engagements are measured in shipped systems, not discovery documents. A pilot you can test against real cases beats a strategy presentation.",
  },
  {
    title: "Numbers over adjectives",
    description:
      "Every engagement gets a success metric agreed before work begins. If we can't measure it, we tell you - before you pay for it.",
  },
  {
    title: "Senior people, small team",
    description:
      "No pyramid. The engineers who scope your project build it, demo it, and answer your questions on every call.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="type-hero text-ink">
              An engineering team, not an agency pyramid.
            </h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              Avlys AI is a Hyderabad-based team building custom software and
              AI integrations for enterprise and mid-market clients in the US
              and India - {caseStudies.length} delivered projects across
              platforms, marketplaces, AI systems, and automation.
            </p>
          </div>
        </section>

        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="type-display-lg text-ink">How we work.</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {principles.map((principle, index) => (
                <Reveal key={principle.title} delay={index * 0.04}>
                  <div className="h-full rounded-[18px] border border-hairline bg-canvas p-7">
                    <h3 className="text-[17px] font-semibold text-ink">
                      {principle.title}
                    </h3>
                    <p className="type-caption mt-3 text-ink-muted">
                      {principle.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="on-dark bg-tile-1 px-6 py-16 text-on-dark">
          <Reveal className="mx-auto w-full max-w-4xl text-center">
            <h2 className="type-display-lg">Where we work from.</h2>
            <p className="type-lead-airy mx-auto mt-6 max-w-2xl text-on-dark-muted">
              Engineering runs from Hyderabad, India. Communication, demos, and
              decisions run on your hours - US or India. One accountable team
              from scoping to the 90 days of post-deploy tuning included in
              every build.
            </p>
            <div className="mt-8">
              <Link
                href="/case-studies"
                className="text-[17px] text-primary-on-dark transition-opacity hover:opacity-70"
              >
                See what we&rsquo;ve shipped &rarr;
              </Link>
            </div>
          </Reveal>
        </section>

        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
