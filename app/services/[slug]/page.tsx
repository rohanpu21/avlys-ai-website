import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import CallToAction from "../../components/CallToAction";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Reveal from "../../components/Reveal";
import StructuredData from "../../components/StructuredData";
import BookCallCta from "../../components/BookCallCta";
import { getServicePage, servicePages } from "../../data/services";
import { absoluteUrl, siteConfig } from "../../lib/site";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {};
  }

  const path = `/services/${service.slug}`;

  return {
    title: {
      absolute: service.metaTitle,
    },
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: service.metaTitle,
      description: service.metaDescription,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const path = `/services/${service.slug}`;
  const serviceUrl = absoluteUrl(path);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${serviceUrl}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.metaDescription,
        provider: {
          "@id": `${siteConfig.url}/#organization`,
        },
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "India" },
          { "@type": "Place", name: "Global remote delivery" },
        ],
        url: serviceUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${serviceUrl}#webpage`,
        url: serviceUrl,
        name: service.metaTitle,
        description: service.metaDescription,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        about: {
          "@id": `${serviceUrl}#service`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${serviceUrl}#breadcrumb`,
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
            name: "Services",
            item: absoluteUrl("/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: serviceUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${serviceUrl}#faq`,
        mainEntity: service.faqs.map((faq) => ({
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

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="type-caption-strong uppercase tracking-wide text-primary">
              {service.eyebrow}
            </p>
            <h1 className="type-hero mt-4 text-ink">{service.h1}</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              {service.description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <BookCallCta location={`service_${service.slug}`} />
              {service.slug === "ai-training-data" && (
                <Link href="/data" className="btn-pill-ghost">Explore Avlys Data</Link>
              )}
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {service.proof.map((item) => (
                <span key={item} className="type-caption text-ink-faint">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="type-display-lg text-ink">What&rsquo;s included.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {service.capabilities.map((capability, index) => (
                <Reveal key={capability.title} delay={index * 0.04}>
                  <div className="h-full rounded-[18px] border border-hairline bg-canvas p-6">
                    <h3 className="text-[17px] font-semibold text-ink">
                      {capability.title}
                    </h3>
                    <p className="type-caption mt-3 text-ink-muted">
                      {capability.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8 border-t border-hairline pt-6">
              <h3 className="type-caption-strong text-ink">Built into delivery</h3>
              <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {service.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-muted">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <details className="mt-6 border-t border-hairline pt-4">
              <summary className="cursor-pointer text-[15px] font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                Systems and technologies
              </summary>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {service.systems.map((system) => (
                  <li key={system} className="type-caption text-ink-muted">
                    {system}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        <section className="on-dark bg-tile-1 px-6 py-16 text-on-dark">
          <div className="mx-auto w-full max-w-6xl">
            <Reveal className="mx-auto max-w-2xl text-center">
              <h2 className="type-display-lg">How it runs.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {service.workflow.map((step, index) => (
                <Reveal key={step.title} delay={index * 0.04}>
                  <div className="flex h-full flex-col rounded-[18px] bg-tile-3 p-6">
                    <span className="type-caption-strong text-primary-on-dark">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-[17px] font-semibold">{step.title}</h3>
                    <p className="type-caption mt-3 flex-1 text-on-dark-muted">
                      {step.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto w-full max-w-3xl">
            <Reveal>
              <h2 className="type-display-lg text-center text-ink">
                Common questions.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-4">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-[18px] border border-hairline bg-canvas">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-[18px] px-6 py-5 text-[17px] font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                    <span>{faq.question}</span>
                    <span aria-hidden="true" className="shrink-0 text-primary transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-6 pb-6 text-[15px] leading-relaxed text-ink-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CallToAction compact />
      </main>
      <Footer />
    </div>
  );
}
