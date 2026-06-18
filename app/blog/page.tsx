import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogCategories, blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Blog | AI, Web Development, E-Commerce & Design Insights | Avlys AI",
  },
  description:
    "Read the Avlys AI blog for expert insights on AI agents, web development, e-commerce platforms, landing page design, and deep tech AI software development.",
  keywords: [
    "AI blog",
    "web development blog",
    "e-commerce development blog",
    "AI agent insights",
    "landing page design tips",
    "deep tech AI blog",
    "AI automation blog India",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | AI, Web Development & Design Insights | Avlys AI",
    description:
      "Expert insights on AI agents, web development, e-commerce, and design from the Avlys AI team.",
    type: "website",
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
      name: "Avlys AI Blog - AI, Web Development & Design Insights",
      description:
        "Expert insights on AI agents, web development, e-commerce platforms, landing page design, and deep tech AI software.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#posts`,
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
              Avlys AI Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Insights on AI, development & design.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on building AI agents, custom web platforms,
              e-commerce systems, and high-converting landing pages for growing
              businesses.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <span
                key={category}
                className="border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {post.readingTime}
                  </p>
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {post.category}
                </p>
                <h2 className="mt-3 text-xl font-light leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-mono text-xs text-[var(--muted-soft)]">
                    {post.publishedAt}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                    Read Article
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
