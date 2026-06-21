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
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [siteConfig.name],
      section: post.category,
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
  const relatedPosts = post.relatedSlugs
    .map((s) => getBlogPost(s))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        image: `${postUrl}/opengraph-image`,
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
          <header className="px-6 pt-20 sm:pt-28">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/blog"
                  className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
                >
                  Blog
                </Link>
                <span className="text-[var(--muted-soft)]">/</span>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {post.category}
                </span>
              </div>
              <h1 className="mt-6 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
                {post.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4 border-y border-[var(--border-subtle)] py-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                <span>{post.readingTime}</span>
                <span className="text-[var(--muted-soft)]">|</span>
                <span>{post.publishedAt}</span>
                <span className="text-[var(--muted-soft)]">|</span>
                <span>By Avlys AI</span>
              </div>
            </div>
          </header>

          <div className="px-6 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-3xl">
              {post.sections.map((section) => (
                <section key={section.heading} className="mb-12 last:mb-0">
                  <h2 className="text-2xl font-light leading-tight sm:text-3xl">
                    {section.heading}
                  </h2>
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="mt-6 text-base leading-8 text-[var(--muted)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>

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
        </article>

        {relatedPosts.length > 0 && (
          <section className="px-6 py-16 sm:py-20">
            <div className="mx-auto w-full max-w-3xl">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Articles
                  </p>
                  <h2 className="mt-4 text-2xl font-light leading-tight sm:text-3xl">
                    Continue reading.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden border border-[var(--border-strong)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)] sm:block"
                >
                  All Posts
                </Link>
              </div>
              <div className="mt-8 grid gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      {related.category}
                    </span>
                    <h3 className="mt-2 text-lg font-light leading-snug">
                      {related.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-3xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 text-2xl font-light leading-tight sm:text-3xl">
                Ready to implement this for your business?
              </h2>
              <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                Avlys AI turns strategy into production systems. Book a call to
                map your workflow and get a concrete plan.
              </p>
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
