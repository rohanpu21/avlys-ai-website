import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
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
      card: "summary",
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
        inLanguage: "en-IN",
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto grid min-h-[calc(100vh-84px)] w-full max-w-6xl gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {service.eyebrow}
              </p>
              <h1 className="mt-4 max-w-5xl font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
                {service.h1}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
                {service.description}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  Map This Workflow
                </Link>
                <Link
                  href="/portfolio"
                  className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View Proof
                </Link>
              </div>
            </div>
            <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Built for operators
              </p>
              <div className="mt-6 grid gap-4">
                {service.proof.map((item) => (
                  <div key={item} className="border-t border-[var(--border-subtle)] pt-4">
                    <p className="text-sm leading-6 text-[var(--muted)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Outcomes
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                What this system should improve.
              </h2>
            </div>
            <div className="grid border border-[var(--border-subtle)]">
              {service.outcomes.map((outcome, index) => (
                <div
                  key={outcome}
                  className="grid gap-4 border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:grid-cols-[120px_1fr]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted)]">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build Path
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                From messy workflow to reliable automation.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {service.workflow.map((step, index) => (
                <article
                  key={step}
                  className="border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-6 text-sm leading-6 text-[var(--muted)]">{step}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Questions
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                Answers buyers and search engines can read clearly.
              </h2>
            </div>
            <div className="mt-10 grid border border-[var(--border-subtle)]">
              {service.faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="grid gap-5 border-b border-[var(--border-subtle)] p-6 last:border-b-0 lg:grid-cols-[160px_1fr]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-xl font-light">{faq.question}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
