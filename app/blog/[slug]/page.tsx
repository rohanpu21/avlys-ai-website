import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
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
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;
  const postUrl = absoluteUrl(path);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        inLanguage: "en-IN",
        keywords: post.keywords.join(", "),
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: post.metaTitle,
        description: post.metaDescription,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
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
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
      ...(post.faqs.length > 0
        ? [
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
          ]
        : []),
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <article className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                ← Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {post.category}
              </p>
            </div>
            <h1 className="mt-8 font-mono text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 border-b border-[var(--border-subtle)] pb-8">
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--muted-soft)]">
                {post.publishedAt}
              </p>
              <p className="font-mono text-xs tracking-[0.18em] text-[var(--muted-soft)]">
                {post.readTime}
              </p>
            </div>

            <p className="mt-10 text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>

            {post.sections.map((section, index) => (
              <section key={section.heading} className="mt-12">
                <h2 className="text-2xl font-light leading-snug">
                  {section.heading}
                </h2>
                {section.body.split("\n\n").map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 60)}
                    className="mt-5 text-base leading-7 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {post.faqs.length > 0 && (
              <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Frequently Asked Questions
                </p>
                <div className="mt-8 grid gap-8">
                  {post.faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-xl font-light">{faq.question}</h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {post.relatedServices.length > 0 && (
              <section className="mt-16 border-t border-[var(--border-subtle)] pt-12 pb-20">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Related Services
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {post.relatedServices.map((serviceSlug) => (
                    <Link
                      key={serviceSlug}
                      href={`/services/${serviceSlug}`}
                      className="border border-[var(--border-subtle)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                    >
                      {serviceSlug.replace(/-/g, " ")}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>

        <section className="border-t border-[var(--border-subtle)] px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-6xl text-center">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Ready to automate?
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Book a strategy call.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
              Tell us what you are building and we will map the fastest path
              to production-ready automation.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-block bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
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
