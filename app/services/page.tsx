import type { Metadata } from "next";
import Link from "next/link";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Reveal from "../components/Reveal";
import StructuredData from "../components/StructuredData";
import { servicePages } from "../data/services";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Custom Software & AI Product Engineering Services | Avlys AI",
  },
  description:
    "Custom enterprise software, AI applications, agents, and workflow automation. Avlys brings product thinking and engineering from discovery through launch and support.",
  alternates: {
    canonical: "/services",
  },
};

const servicesUrl = absoluteUrl("/services");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${servicesUrl}#webpage`,
      url: servicesUrl,
      name: "Custom Software & AI Product Engineering Services - Avlys AI",
      description:
        "Custom enterprise software, AI agents, workflow automation, integration, and consulting from Avlys AI, an India-based product studio and engineering partner.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-US",
    },
    {
      "@type": "ItemList",
      "@id": `${servicesUrl}#services`,
      itemListElement: servicePages.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: absoluteUrl(`/services/${service.slug}`),
      })),
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="type-hero text-ink">From product idea to working software.</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              Custom platforms, internal tools, and AI applications. Product
              design and engineering, from discovery to launch.
            </p>
          </div>
        </section>
        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto grid w-full max-w-6xl gap-5 md:grid-cols-2">
            {servicePages.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.04}>
                <Link
                  href={`/services/${service.slug}`}
                  className="flex h-full flex-col rounded-[18px] border border-hairline bg-canvas p-8 transition-colors hover:border-ink-faint"
                >
                  <p className="type-caption-strong uppercase tracking-wide text-primary">
                    {service.eyebrow}
                  </p>
                  <h2 className="mt-3 text-[21px] font-semibold leading-snug text-ink">
                    {service.h1}
                  </h2>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-muted">
                    {service.description}
                  </p>
                  <span className="mt-6 text-[15px] text-primary">
                    Learn more &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
        <CallToAction compact />
      </main>
      <Footer />
    </div>
  );
}
