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
    "Insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents from the Avlys AI team.",
  keywords: [
    "AI automation blog",
    "web development blog India",
    "AI agents blog",
    "e-commerce development blog",
    "landing page design tips",
    "agentic AI insights",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteConfig.url}/blog#collection`,
      name: "Blog",
      description:
        "Insights on AI automation, web development, e-commerce, agentic AI, landing page design, and enterprise AI agents.",
      url: absoluteUrl("/blog"),
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${siteConfig.url}/blog#item-list`,
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
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl pb-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,5.5rem)] font-light leading-[0.95]">
              Insights on AI, development, and design.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical articles on AI automation, web development, e-commerce,
              agentic AI systems, landing page design, and enterprise AI agents.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-wrap gap-3 border-b border-[var(--border-subtle)] pb-6">
              {blogCategories.map((category) => (
                <span
                  key={category}
                  className="border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                    {post.category}
                  </p>
                  <h2 className="mt-3 text-lg font-light leading-snug">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
                    <time
                      dateTime={post.publishedAt}
                      className="font-mono text-xs text-[var(--muted-soft)]"
                    >
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-70">
                      Read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
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
