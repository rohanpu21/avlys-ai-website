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
      publishedTime: post.publishDate,
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
  const relatedService = post.relatedServiceSlug
    ? getServicePage(post.relatedServiceSlug)
    : undefined;
  const relatedPosts = getRelatedPosts(post.slug);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        datePublished: post.publishDate,
        dateModified: post.publishDate,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        inLanguage: "en-IN",
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
          <div className="mx-auto w-full max-w-4xl pb-16">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
            >
              ← Blog
            </Link>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              {post.eyebrow}
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.02]">
              {post.h1}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <time dateTime={post.publishDate}>
                {new Date(post.publishDate).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-[var(--muted)]">
              {post.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto w-full max-w-4xl">
            <div className="grid gap-14">
              {post.sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-2xl font-light leading-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 max-w-3xl space-y-4 text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.list ? (
                    <ul className="mt-6 grid gap-3 border border-[var(--border-subtle)] p-6">
                      {section.list.map((item) => (
                        <li
                          key={item}
                          className="border-b border-[var(--border-subtle)] pb-3 text-sm leading-6 text-[var(--muted)] last:border-b-0 last:pb-0 sm:text-base"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-4xl border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Key Takeaways
            </p>
            <ul className="mt-6 grid gap-4">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={takeaway} className="grid gap-3 sm:grid-cols-[40px_1fr]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-6 text-[var(--muted)] sm:text-base">
                    {takeaway}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Questions
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
            <div className="mt-10 grid border border-[var(--border-subtle)]">
              {post.faqs.map((faq, index) => (
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

        <section className="px-6 pb-20">
          <div className="mx-auto w-full max-w-4xl border border-[var(--border-strong)] p-6 sm:p-10">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Talk To Avlys AI
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-light leading-snug sm:text-3xl">
              {relatedService
                ? `Want help with ${relatedService.title.toLowerCase()}?`
                : "Want help scoping a project like this?"}
            </h2>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
              >
                Book Strategy Call
              </Link>
              {relatedService ? (
                <Link
                  href={`/services/${relatedService.slug}`}
                  className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View Related Service
                </Link>
              ) : (
                <Link
                  href="/services"
                  className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Services
                </Link>
              )}
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 ? (
          <section className="px-6 pb-24">
            <div className="mx-auto w-full max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Related Reading
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {relatedPost.category}
                    </p>
                    <p className="mt-3 text-base font-light leading-snug">
                      {relatedPost.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
