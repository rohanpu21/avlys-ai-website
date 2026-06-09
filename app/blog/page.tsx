import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts, type BlogCategory } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation & Web Development Blog | Avlys AI",
  },
  description:
    "Expert insights on agentic AI apps, custom web development, e-commerce, deep tech AI software, landing page design, and enterprise AI automation from the Avlys AI team.",
  keywords: [
    "AI automation blog",
    "web development blog India",
    "agentic AI insights",
    "e-commerce AI blog",
    "enterprise AI blog",
    "deep tech AI blog",
    "landing page design tips",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI Automation & Web Development Blog | Avlys AI",
    description:
      "Expert insights on agentic AI apps, custom web development, e-commerce, deep tech AI software, landing page design, and enterprise AI automation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation & Web Development Blog | Avlys AI",
    description:
      "Expert insights on agentic AI apps, custom web development, e-commerce, deep tech AI software, landing page design, and enterprise AI automation.",
  },
};

const blogUrl = absoluteUrl("/blog");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${blogUrl}#blog`,
      url: blogUrl,
      name: "Avlys AI Blog",
      description:
        "Expert insights on agentic AI apps, custom web development, e-commerce, deep tech AI software, and enterprise AI automation.",
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${blogUrl}#breadcrumb`,
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
          item: blogUrl,
        },
      ],
    },
  ],
};

const categoryColors: Record<BlogCategory, string> = {
  "Web Development": "text-blue-400",
  "E-Commerce": "text-emerald-400",
  "Agentic AI": "text-violet-400",
  "Deep Tech AI": "text-amber-400",
  "Landing Pages": "text-rose-400",
  "Enterprise AI": "text-cyan-400",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Avlys AI Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Insights.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Expert writing on agentic AI, custom web development, e-commerce automation,
              deep tech AI software, and landing page design — from the team that ships these systems.
            </p>
          </div>

          {/* Stats bar */}
          <div className="mt-12 flex flex-wrap gap-8 border-y border-[var(--border-subtle)] py-6">
            <div>
              <p className="font-mono text-3xl font-light">{blogPosts.length}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                Articles
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl font-light">6</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                Categories
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl font-light">
                {blogPosts.reduce((sum, p) => sum + p.readTime, 0)}
              </p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                Minutes of reading
              </p>
            </div>
          </div>

          {/* Featured posts */}
          {featured.length > 0 && (
            <section className="mt-16">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Featured
              </p>
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featured.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.15em] ${
                        categoryColors[post.category]
                      }`}
                    >
                      {post.category}
                    </p>
                    <h2 className="mt-4 text-xl font-light leading-snug transition-opacity group-hover:opacity-80">
                      {post.title}
                    </h2>
                    <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs text-[var(--muted-strong)]">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* All posts */}
          <section className="mt-20">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              All Articles
            </p>
            <div className="mt-6 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 bg-[var(--background)] p-6 transition-colors hover:bg-[var(--surface-subtle)] sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.15em] ${
                        categoryColors[post.category]
                      }`}
                    >
                      {post.category}
                    </p>
                    <h2 className="mt-3 text-lg font-light leading-snug transition-opacity group-hover:opacity-80">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)] line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="border border-[var(--border-subtle)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-strong)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between gap-4 text-right text-xs text-[var(--muted-strong)] sm:min-w-[140px]">
                    <span>{formatDate(post.date)}</span>
                    <span className="font-mono">{post.readTime} min read</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-20">
            <div className="grid gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Work With Avlys AI
                </p>
                <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl">
                  Ready to build the systems you've been reading about?
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
