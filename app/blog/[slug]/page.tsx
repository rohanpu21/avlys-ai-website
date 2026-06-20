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
      absolute: `${post.metaTitle} | Avlys AI`,
    },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: `${post.metaTitle} | Avlys AI`,
      description: post.metaDescription,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.metaTitle} | Avlys AI`,
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
        "@type": "BlogPosting",
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
        keywords: post.keywords.join(", "),
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
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-4 text-xs text-[var(--muted-strong)]">
              <Link
                href="/blog"
                className="font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
              >
                Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <span className="font-mono uppercase tracking-[0.18em]">
                {post.category}
              </span>
            </div>
            <h1 className="mt-6 font-mono text-[clamp(2rem,6vw,4rem)] font-light leading-[1.05]">
              {post.title}
            </h1>
            <div className="mt-6 flex items-center gap-6 border-b border-[var(--border-subtle)] pb-8 text-sm text-[var(--muted-strong)]">
              <span>{post.readingTime}</span>
              <span className="text-[var(--muted-soft)]">|</span>
              <span>By Avlys AI</span>
              <span className="text-[var(--muted-soft)]">|</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <p className="text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>

            {post.sections.map((section) => (
              <div key={section.heading} className="mt-12">
                <h2 className="text-2xl font-light leading-snug">
                  {section.heading}
                </h2>
                <p className="mt-5 text-base leading-8 text-[var(--muted)]">
                  {section.body}
                </p>
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
                    <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--muted-soft)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Posts
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More on {post.category}.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Posts
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </span>
                    <h3 className="mt-4 text-lg font-light leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {item.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Ready to automate your business workflows?
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
