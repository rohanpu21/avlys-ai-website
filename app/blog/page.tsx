import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog — AI, Web Development & E-Commerce Insights | Avlys AI",
  },
  description:
    "Expert insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents. Practical guides for business owners and CTOs.",
  keywords: [
    "AI blog",
    "web development blog India",
    "e-commerce development blog",
    "agentic AI insights",
    "AI agents for business blog",
    "landing page design tips",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog — AI, Web Development & E-Commerce Insights | Avlys AI",
    description:
      "Expert insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents.",
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
      name: "Blog — AI, Web Development & E-Commerce Insights | Avlys AI",
      description:
        "Expert insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents.",
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
              Insights for builders.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, web development, e-commerce,
              agentic AI, landing page design, and enterprise AI agents — written
              for business owners and technical leaders.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3 text-xs text-[var(--muted-soft)]">
                  <span className="font-mono uppercase tracking-[0.18em]">
                    {post.category}
                  </span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  <span>·</span>
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                </div>
                <h2 className="mt-5 text-2xl font-light leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                  Read Article
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
