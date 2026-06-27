import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blogPosts";
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
      authors: [post.author],
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
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@type": "Organization",
          name: post.author,
          url: siteConfig.url,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: {
          "@id": `${postUrl}#webpage`,
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
                Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {post.category}
              </p>
            </div>

            <h1 className="mt-6 text-[clamp(2rem,6vw,3.5rem)] font-light leading-[1.1]">
              {post.title}
            </h1>

            <div className="mt-6 flex items-center gap-6 border-b border-[var(--border-subtle)] pb-8">
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {post.author}
              </p>
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {post.readingTime}
              </p>
            </div>

            <div className="mt-12 space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.body.split("\n\n").map((paragraph, i) => (
                      <p
                        key={i}
                        className="text-base leading-7 text-[var(--muted)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {post.faqs.length > 0 && (
              <section className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Frequently Asked Questions
                </p>
                <div className="mt-8 grid border border-[var(--border-subtle)]">
                  {post.faqs.map((faq, index) => (
                    <div
                      key={faq.question}
                      className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-4 text-lg font-light">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="mt-16 border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Ready to build?
              </p>
              <p className="mt-4 text-lg font-light">
                Turn these insights into results for your business.
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                Avlys AI builds AI automation systems, custom web applications,
                and intelligent software for growing businesses.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  Book Strategy Call
                </Link>
                <Link
                  href="/blog"
                  className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  More Articles
                </Link>
              </div>
            </section>
          </div>
        </article>

        <div className="px-6 py-20">
          <div className="mx-auto w-full max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              More from the blog
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 4)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {relatedPost.category}
                    </p>
                    <h3 className="mt-3 text-sm font-light leading-snug">
                      {relatedPost.title}
                    </h3>
                    <p className="mt-3 font-mono text-xs text-[var(--muted-soft)]">
                      {relatedPost.readingTime}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
