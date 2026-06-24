import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      authors: [post.author],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        author: {
          "@type": "Organization",
          name: post.author,
          url: siteConfig.url,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        mainEntityOfPage: postUrl,
        inLanguage: "en-IN",
        keywords: post.keywords.join(", "),
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

  const postIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <article className="mx-auto w-full max-w-3xl">
          <div className="flex items-center gap-3 text-xs text-[var(--muted-soft)]">
            <Link
              href="/blog"
              className="font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="font-mono uppercase tracking-[0.18em]">
              {post.category}
            </span>
          </div>

          <h1 className="mt-6 font-mono text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 border-b border-[var(--border-subtle)] pb-8 text-xs text-[var(--muted-strong)]">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <div className="mt-10 space-y-8">
            {post.sections.map((section, sectionIndex) => (
              <section key={sectionIndex}>
                {section.heading && (
                  <h2 className="mb-4 font-mono text-xl font-light">
                    {section.heading}
                  </h2>
                )}
                {section.body.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="mb-4 text-base leading-7 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {post.faqs.length > 0 && (
            <section className="mt-16 border-t border-[var(--border-subtle)] pt-10">
              <h2 className="font-mono text-xl font-light">
                Frequently Asked Questions
              </h2>
              <div className="mt-6 space-y-6">
                {post.faqs.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="border-b border-[var(--border-subtle)] pb-6"
                  >
                    <h3 className="text-base font-medium">{faq.question}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-16 border-t border-[var(--border-subtle)] pt-10">
            <div className="rounded-none border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Ready to build?
              </p>
              <p className="mt-3 text-lg font-light">
                Let&apos;s discuss how Avlys AI can help your business.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
              >
                Book Strategy Call
              </Link>
            </div>
          </div>

          {(prevPost || nextPost) && (
            <nav className="mt-10 grid gap-4 sm:grid-cols-2">
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    Previous
                  </p>
                  <p className="mt-2 text-sm font-light leading-snug">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="border border-[var(--border-subtle)] p-5 text-right transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    Next
                  </p>
                  <p className="mt-2 text-sm font-light leading-snug">
                    {nextPost.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
