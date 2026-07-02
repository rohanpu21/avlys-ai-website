import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost, getRelatedPosts } from "../../data/blog";
import { getServicePage } from "../../data/services";
import { absoluteUrl, siteConfig } from "../../lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const path = `/blog/${post.slug}`;
  const imageUrl = `${path}/opengraph-image`;

  return {
    title: {
      absolute: post.metaTitle,
    },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: absoluteUrl(imageUrl),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [absoluteUrl(imageUrl)],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = getRelatedPosts(post, 3);
  const relatedServices = (post.relatedServiceSlugs ?? [])
    .map((serviceSlug) => getServicePage(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        image: `${postUrl}/opengraph-image`,
        keywords: post.keywords.join(", "),
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${postUrl}#faq`,
        mainEntity: post.faqs.map((faq) => ({
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
          <div className="mx-auto w-full max-w-3xl pb-14">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
            >
              &larr; All Articles
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              <span>{post.category}</span>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">/</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <h1 className="mt-6 font-mono text-[clamp(2.25rem,6vw,4rem)] font-light leading-[1.02]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto w-full max-w-3xl border-t border-[var(--border-subtle)] pt-12">
            {post.intro.map((paragraph, index) => (
              <p
                key={index}
                className="mb-6 text-base leading-8 text-[var(--muted)] last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {post.sections.map((section) => (
              <div key={section.heading} className="mt-12">
                <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="mt-5 text-base leading-8 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 grid gap-3">
                    {section.bullets.map((bullet, index) => (
                      <li
                        key={index}
                        className="flex gap-3 border border-[var(--border-subtle)] p-4 text-sm leading-6 text-[var(--muted)]"
                      >
                        <span className="font-mono text-xs text-[var(--muted-soft)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            <div className="mt-14 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Key Takeaways
              </p>
              <ul className="mt-6 grid gap-3">
                {post.takeaways.map((takeaway, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                    <span className="font-mono text-[var(--foreground)]">{String(index + 1).padStart(2, "0")}</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-14">
              <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 grid border border-[var(--border-subtle)]">
                {post.faqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Q{index + 1}
                    </p>
                    <p className="mt-3 text-lg font-light leading-snug">
                      {faq.question}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {relatedServices.length > 0 && (
              <div className="mt-14 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="border border-[var(--border-subtle)] px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                  >
                    Related: {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Keep Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More from the Avlys AI blog.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Articles
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </p>
                    <h3 className="mt-6 text-lg font-light leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Want this built for your business?
              </h2>
            </div>
            <Link
              href="/#contact"
              className="w-fit bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Book Strategy Call
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
