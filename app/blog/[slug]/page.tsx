import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";
import { notFound } from "next/navigation";

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
      authors: [siteConfig.name],
      section: post.category,
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

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .slice(0, 3);

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
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
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

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <article>
          <section className="px-6 pt-20 sm:pt-28">
            <div className="mx-auto w-full max-w-3xl pb-16">
              <div className="flex items-center gap-4">
                <Link
                  href="/blog"
                  className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
                >
                  Blog
                </Link>
                <span className="text-[var(--muted-soft)]">/</span>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {post.category}
                </p>
              </div>
              <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-6 border-y border-[var(--border-subtle)] py-4 text-xs text-[var(--muted-strong)]">
                <time dateTime={post.publishedAt} className="font-mono">
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span className="font-mono uppercase tracking-[0.15em]">
                  {post.category}
                </span>
              </div>
            </div>
          </section>

          <section className="px-6">
            <div className="mx-auto w-full max-w-3xl">
              {post.sections.map((section) => (
                <div key={section.heading} className="mb-12">
                  <h2 className="text-2xl font-light leading-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.body.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="mt-6 text-base leading-7 text-[var(--muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {post.faqs.length > 0 && (
            <section className="px-6 py-16 sm:py-20">
              <div className="mx-auto w-full max-w-3xl">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Frequently Asked Questions
                </p>
                <div className="mt-8 grid border border-[var(--border-subtle)]">
                  {post.faqs.map((faq) => (
                    <div
                      key={faq.question}
                      className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                    >
                      <h3 className="text-base font-light leading-snug">
                        {faq.question}
                      </h3>
                      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>

        {related.length > 0 && (
          <section className="px-6 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Articles
                  </p>
                  <h2 className="mt-4 text-2xl font-light leading-tight sm:text-3xl">
                    More on {post.category}.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  All Articles
                </Link>
              </div>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {related.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group border border-[var(--border-subtle)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-2 text-sm font-light leading-snug">
                      {relatedPost.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-3xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-xl text-2xl font-light leading-tight sm:text-3xl">
                Ready to automate your business?
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
