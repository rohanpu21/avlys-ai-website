import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogCategories, blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, agentic AI systems, web development, e-commerce, and enterprise AI solutions for Indian businesses.",
  keywords: [
    "AI automation blog",
    "agentic AI insights",
    "web development India",
    "e-commerce automation",
    "AI agents for business",
    "enterprise AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Insights on AI automation, agentic AI systems, web development, e-commerce, and enterprise AI solutions for Indian businesses.",
    type: "website",
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Avlys AI Blog",
  description: metadata.description,
  url: absoluteUrl("/blog"),
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: blogPosts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  },
};

export default function BlogPage() {
  return (
    <>
      <StructuredData data={blogListSchema} />
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
            Blog
          </p>
          <h1 className="mt-4 font-mono text-3xl font-normal tracking-tight md:text-4xl">
            Insights on AI automation and software development.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            Practical guides, cost analyses, and implementation playbooks for Indian businesses
            building with AI.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          <span className="border border-[var(--border-strong)] bg-[var(--surface-hover)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em]">
            All
          </span>
          {blogCategories.map((category) => (
            <span
              key={category}
              className="border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="grid gap-0">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group border-b border-[var(--border-subtle)] py-8 transition-colors first:border-t hover:bg-[var(--surface-subtle)]"
            >
              <div className="flex flex-col gap-3 px-2">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                    {post.category}
                  </span>
                  <span className="text-[var(--muted-soft)]">/</span>
                  <span className="font-mono text-xs tracking-wide text-[var(--muted-strong)]">
                    {post.readingTime}
                  </span>
                  <span className="text-[var(--muted-soft)]">/</span>
                  <time
                    dateTime={post.publishedAt}
                    className="font-mono text-xs tracking-wide text-[var(--muted-strong)]"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="font-mono text-lg font-normal tracking-tight transition-opacity group-hover:opacity-70 md:text-xl">
                  {post.title}
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
