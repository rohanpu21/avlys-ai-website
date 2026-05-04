import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { type ContentBlock, blogPosts } from "../../data/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: `${post.title} | Avlys AI Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["Avlys AI"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 font-mono text-xl font-light leading-snug text-[var(--foreground)] first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 font-mono text-base font-light uppercase tracking-[0.12em] text-[var(--muted)]"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mt-5 text-base leading-7 text-[var(--muted)]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mt-5 space-y-3 border-l border-[var(--border-subtle)] pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm leading-6 text-[var(--muted)]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mt-5 space-y-3 border-l border-[var(--border-subtle)] pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm leading-6 text-[var(--muted)]">
              <span className="mr-3 font-mono text-xs text-[var(--muted-soft)]">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "cta":
      return (
        <div key={index} className="mt-12 border border-[var(--border-strong)] p-6">
          <Link
            href={block.href}
            className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] transition-opacity hover:opacity-60"
          >
            <span>{block.label}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Avlys AI",
      url: "https://avlysai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Avlys AI",
      url: "https://avlysai.com",
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://avlysai.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-12">
            <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              <li>
                <Link href="/" className="transition-opacity hover:opacity-50">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-opacity hover:opacity-50">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-[var(--muted-soft)]" aria-current="page">
                {post.category}
              </li>
            </ol>
          </nav>

          <div className="grid gap-16 lg:grid-cols-[1fr_300px]">
            {/* Article */}
            <article>
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime} min read</span>
              </div>

              {/* Title */}
              <h1 className="mt-6 text-[clamp(1.75rem,5vw,3.25rem)] font-light leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="mt-6 text-base leading-7 text-[var(--muted)] opacity-80">
                {post.excerpt}
              </p>

              {/* Divider */}
              <div className="mt-10 border-t border-[var(--border-subtle)]" />

              {/* Content */}
              <div className="mt-10">{post.content.map((block, i) => renderBlock(block, i))}</div>

              {/* Tags */}
              <div className="mt-14 border-t border-[var(--border-subtle)] pt-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted-strong)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:pt-16">
              {/* Author card */}
              <div className="border border-[var(--border-subtle)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Written by
                </p>
                <p className="mt-3 font-mono text-sm text-[var(--foreground)]">Avlys AI</p>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  We build AI automation, agentic apps, custom web platforms, and conversion-focused
                  design for businesses in India and globally.
                </p>
              </div>

              {/* CTA card */}
              <div className="border border-[var(--border-strong)] p-6">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Ready to start?
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  Book a free 30-minute strategy call. No commitment, no pitch deck — just a
                  practical conversation about what you need.
                </p>
                <Link
                  href="/#contact"
                  className="mt-5 block border border-[var(--foreground)] px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--foreground)] hover:text-[var(--background)]"
                >
                  Book strategy call
                </Link>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div>
                  <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related articles
                  </p>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/blog/${related.slug}`}
                        className="block border border-[var(--border-subtle)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                      >
                        <p className="text-sm font-light leading-snug text-[var(--foreground)]">
                          {related.title}
                        </p>
                        <p className="mt-2 font-mono text-xs text-[var(--muted-soft)]">
                          {related.readingTime} min read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to blog */}
              <Link
                href="/blog"
                className="block font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                ← All articles
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
