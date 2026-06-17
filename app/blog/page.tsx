import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
  },
  description:
    "Read the latest insights on AI automation, agentic AI, web development, e-commerce, landing page design, and enterprise AI agents from Avlys AI.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
    description:
      "Read the latest insights on AI automation, agentic AI, web development, e-commerce, landing page design, and enterprise AI agents from Avlys AI.",
  },
  twitter: {
    card: "summary",
    title: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
    description:
      "Read the latest insights on AI automation, agentic AI, web development, e-commerce, landing page design, and enterprise AI agents from Avlys AI.",
  },
};

const blogUrl = absoluteUrl("/blog");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${blogUrl}#webpage`,
      url: blogUrl,
      name: "Blog - Avlys AI",
      description:
        "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise AI agents from Avlys AI.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#blog-list`,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Insights on AI, code, and growth.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, web development, e-commerce,
              agentic AI systems, and enterprise AI agents. Written for founders
              and operators building with technology.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4 border-b border-[var(--border-subtle)] pb-6">
            <p className="font-mono text-4xl font-light">{blogPosts.length}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Published articles
            </p>
          </div>

          <div className="mt-10 grid gap-6">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group grid gap-6 border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] sm:p-8 ${
                  index === 0 ? "lg:grid-cols-[1fr_auto]" : "lg:grid-cols-[1fr_auto]"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <span className="font-mono uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {post.category}
                    </span>
                    <span className="text-[var(--muted-soft)]">/</span>
                    <span className="text-[var(--muted-soft)]">
                      {post.publishedAt}
                    </span>
                    <span className="text-[var(--muted-soft)]">/</span>
                    <span className="text-[var(--muted-soft)]">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-light leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {post.keywords.slice(0, 3).map((keyword) => (
                      <span
                        key={keyword}
                        className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="hidden items-center lg:flex">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)] transition-colors group-hover:text-[var(--foreground)]">
                    Read
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <section className="mt-20 sm:mt-28">
            <div className="grid gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Build With Avlys
                </p>
                <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                  Ready to automate your business with AI?
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
