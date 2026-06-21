import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogCategories, blogPosts } from "../data/blogPosts";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise AI agents from Avlys AI. Practical guides for business owners and technical leaders.",
  keywords: [
    "AI automation blog",
    "web development blog",
    "e-commerce development insights",
    "agentic AI articles",
    "AI agents for business blog",
    "Avlys AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise AI agents from Avlys AI.",
    type: "website",
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      name: "Avlys AI Blog",
      description:
        "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise AI agents.",
      url: absoluteUrl("/blog"),
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      inLanguage: "en-IN",
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.url}/blog#breadcrumb`,
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
      ],
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={blogListSchema} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Insights
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.95]">
              Blog
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, web development, e-commerce, and
              enterprise AI — written for business owners and technical leaders.
            </p>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-wrap gap-3 border-b border-[var(--border-subtle)] pb-6">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Categories:
              </span>
              {blogCategories.map((category) => (
                <span
                  key={category}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-6xl gap-6">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-4 border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="border border-[var(--border-subtle)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {post.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-4 text-xl font-light leading-snug sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-end">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Ready to Build?
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Turn these insights into action for your business.
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
