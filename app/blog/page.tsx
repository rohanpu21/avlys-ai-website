import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI & Web Development Blog | Avlys AI",
  },
  description:
    "Insights on AI automation, agentic apps, e-commerce development, web development, and enterprise AI from Avlys AI — a Hyderabad-based AI automation agency.",
  keywords: [
    "AI automation blog India",
    "AI agents blog",
    "agentic AI articles",
    "web development blog India",
    "e-commerce development India blog",
    "enterprise AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI & Web Development Blog | Avlys AI",
    description:
      "Insights on AI automation, agentic apps, e-commerce development, and enterprise AI from Avlys AI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Web Development Blog | Avlys AI",
    description:
      "Insights on AI automation, agentic apps, e-commerce development, and enterprise AI from Avlys AI.",
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
        "Insights on AI automation, agentic apps, web development, e-commerce, and enterprise AI from Avlys AI.",
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#post-list`,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/blog/${post.slug}`),
        name: post.title,
      })),
    },
  ],
};

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7rem)] font-light leading-[0.95]">
              Thinking out loud on AI.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, agentic systems, web development, and
              e-commerce — written for founders and operators who want to move fast.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)]"
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="mt-16 grid gap-px border border-[var(--border-subtle)]">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-6 border-b border-[var(--border-subtle)] p-8 transition-colors last:border-b-0 hover:bg-[var(--surface-subtle)] lg:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {post.category}
                    </p>
                    <span className="text-[var(--border-strong)]">·</span>
                    <p className="font-mono text-xs text-[var(--muted-soft)]">
                      {post.readTime} min read
                    </p>
                  </div>
                  <h2 className="mt-4 text-xl font-light leading-snug transition-opacity group-hover:opacity-70 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-start lg:items-center lg:justify-end">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-soft)] transition-colors group-hover:text-[var(--foreground)]">
                    Read →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-[var(--border-subtle)] pt-8">
            <p className="font-mono text-xs text-[var(--muted-soft)]">
              {blogPosts.length} articles published
            </p>
            <p className="font-mono text-xs text-[var(--muted-soft)]">
              New posts added weekly
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
