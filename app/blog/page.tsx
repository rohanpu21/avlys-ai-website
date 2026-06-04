import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blogPosts";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Blog | Insights on Agentic AI, Web Development & E-Commerce | Avlys AI",
  },
  description:
    "Expert insights on agentic AI apps, enterprise AI agents, e-commerce development, web development, deep tech AI software, and high-converting landing page design — from the Avlys AI team in Hyderabad.",
  keywords: [
    "AI automation blog",
    "agentic AI insights",
    "web development blog India",
    "e-commerce development tips",
    "enterprise AI agents",
    "deep tech AI blog",
    "landing page design tips",
    "AI software development",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI Automation Blog | Avlys AI",
    description:
      "Expert insights on agentic AI, enterprise agents, web development, e-commerce, deep tech AI software, and high-converting landing pages.",
    images: [
      {
        url: absoluteUrl("/blog/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Avlys AI Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Blog | Avlys AI",
    description:
      "Expert insights on agentic AI, enterprise agents, web development, e-commerce, deep tech AI software, and high-converting landing pages.",
    images: [absoluteUrl("/blog/opengraph-image")],
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
      name: "AI Automation Blog — Avlys AI",
      description:
        "Insights on agentic AI apps, enterprise agents, web development, e-commerce, deep tech AI software, and landing page design.",
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

const categoryColors: Record<string, string> = {
  "Agentic AI": "text-[var(--foreground)]",
  "E-Commerce Development": "text-[var(--foreground)]",
  "Landing Page Design": "text-[var(--foreground)]",
  "Enterprise AI": "text-[var(--foreground)]",
  "Web Development": "text-[var(--foreground)]",
  "Deep Tech AI": "text-[var(--foreground)]",
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6rem)] font-light leading-[0.95]">
              Insights from the AI frontier.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical writing on agentic AI apps, enterprise automation, web development, e-commerce, deep tech software, and high-converting design — from the team building these systems for businesses every day.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mt-16">
            <Link
              href={`/blog/${featured.slug}`}
              className="group block border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-4">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  {featured.category}
                </p>
                <span className="h-px w-4 bg-[var(--border-subtle)]" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  {featured.readingTime}
                </p>
                <span className="h-px w-4 bg-[var(--border-subtle)]" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  {new Date(featured.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <h2 className="mt-6 text-2xl font-light leading-snug sm:text-3xl lg:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)]">
                {featured.excerpt}
              </p>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                Read Article →
              </p>
            </Link>
          </div>

          {/* Post Grid */}
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className={`font-mono text-xs uppercase tracking-[0.15em] ${categoryColors[post.category] ?? "text-[var(--muted-strong)]"} opacity-50`}>
                    {post.category}
                  </p>
                  <span className="h-px w-3 bg-[var(--border-subtle)]" />
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                    {post.readingTime}
                  </p>
                </div>
                <h2 className="mt-5 flex-1 text-lg font-light leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)] line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                  Read →
                </p>
              </Link>
            ))}
          </div>

          {/* Post count */}
          <div className="mt-10 border-t border-[var(--border-subtle)] pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
              {blogPosts.length} articles published
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
