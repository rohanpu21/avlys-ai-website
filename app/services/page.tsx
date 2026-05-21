import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { servicePages } from "../data/services";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Services | Avlys AI",
  },
  description:
    "Explore Avlys AI services for AI calling agents, WhatsApp AI chatbots, customer support automation, lead qualification agents, and custom AI chatbot development.",
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
      name: "AI Automation Services - Avlys AI",
      description:
        "AI automation services from Avlys AI for calling agents, WhatsApp chatbots, customer support automation, lead qualification, and custom chatbot development.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Avlys AI Services
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              AI automation services for operators.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Focused service pages for the workflows businesses search for most:
              AI calling agents, WhatsApp chatbots, support automation, lead
              qualification, and custom AI chatbot development.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {servicePages.map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-8 text-2xl font-light leading-snug">{service.title}</h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {service.metaDescription}
                </p>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                  Open Service
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
