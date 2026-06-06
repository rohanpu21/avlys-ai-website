import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blogs";
import { absoluteUrl, siteConfig } from "../../lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
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

  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const postUrl = absoluteUrl(path);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": postUrl,
        },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
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

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const otherPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category !== post.category)
    .slice(0, 2);

  const suggestedPosts = [...relatedPosts, ...otherPosts].slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl pb-12">
            <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
              <Link href="/blog" className="hover:text-[var(--foreground)] transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[var(--muted-strong)]">{post.category}</span>
            </nav>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]">
                {post.category}
              </span>
              <span className="font-mono text-xs text-[var(--muted-soft)]">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="font-mono text-xs text-[var(--muted-soft)]">{post.readingTime}</span>
            </div>
            <h1 className="mt-6 max-w-4xl font-mono text-[clamp(2rem,5vw,3.75rem)] font-light leading-[1.05]">
              {post.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1fr_280px] lg:items-start">
              <article>
                {post.sections.map((section, idx) => (
                  <div key={idx} className="mb-10 border-t border-[var(--border-subtle)] pt-10 first:border-t-0 first:pt-0">
                    {section.heading && (
                      <h2 className="mb-4 text-2xl font-light leading-snug sm:text-3xl">
                        {section.heading}
                      </h2>
                    )}
                    <p className="text-base leading-7 text-[var(--muted)]">{section.body}</p>
                    {section.items && section.items.length > 0 && (
                      <ul className="mt-4 grid gap-2">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                            <span className="mt-1 font-mono text-xs text-[var(--muted-soft)] shrink-0">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {post.faqs.length > 0 && (
                  <div className="mt-14 border-t border-[var(--border-subtle)] pt-14">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      FAQ
                    </p>
                    <h2 className="mt-4 text-3xl font-light leading-tight">
                      Common questions.
                    </h2>
                    <div className="mt-8 grid border border-[var(--border-subtle)]">
                      {post.faqs.map((faq, i) => (
                        <div
                          key={faq.question}
                          className="grid gap-4 border-b border-[var(--border-subtle)] p-6 last:border-b-0 sm:grid-cols-[120px_1fr]"
                        >
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                            {String(i + 1).padStart(2, "0")}
                          </p>
                          <div>
                            <h3 className="text-lg font-light">{faq.question}</h3>
                            <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>

              <aside className="hidden lg:block">
                <div className="sticky top-28 grid gap-6">
                  <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      Work with Avlys AI
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                      We build the systems described in this article — from agentic AI apps to custom web development and enterprise automation.
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/#contact"
                        className="block bg-[var(--foreground)] px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--background)] transition-opacity hover:opacity-90"
                      >
                        Book Strategy Call
                      </Link>
                    </div>
                  </div>

                  {suggestedPosts.length > 0 && (
                    <div className="border border-[var(--border-subtle)] p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                        More Articles
                      </p>
                      <div className="mt-4 grid gap-4">
                        {suggestedPosts.map((related) => (
                          <Link
                            key={related.slug}
                            href={`/blog/${related.slug}`}
                            className="group block border-t border-[var(--border-subtle)] pt-4 first:border-t-0 first:pt-0"
                          >
                            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                              {related.category}
                            </p>
                            <p className="mt-1 text-sm leading-snug transition-opacity group-hover:opacity-70">
                              {related.title}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              More from the Blog
            </p>
            <div className="mt-8 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 3)
                .map((related) => (
                  <article
                    key={related.slug}
                    className="group bg-[var(--background)] transition-colors hover:bg-[var(--surface-subtle)]"
                  >
                    <Link href={`/blog/${related.slug}`} className="block p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                        {related.category}
                      </p>
                      <h3 className="mt-3 text-base font-light leading-snug transition-opacity group-hover:opacity-80">
                        {related.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-[var(--muted)]">
                        {related.excerpt}
                      </p>
                      <p className="mt-4 font-mono text-xs text-[var(--muted-soft)]">
                        {related.readingTime} →
                      </p>
                    </Link>
                  </article>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
