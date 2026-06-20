import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Blog | AI Automation, Web Development & E-Commerce Insights | Avlys AI",
  },
  description:
    "Read expert insights on AI automation, agentic AI apps, web development, e-commerce, landing page design, and enterprise AI agents from the Avlys AI team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title:
      "Blog | AI Automation, Web Development & E-Commerce Insights | Avlys AI",
    description:
      "Read expert insights on AI automation, agentic AI apps, web development, e-commerce, landing page design, and enterprise AI agents from the Avlys AI team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avlys AI Blog | AI Automation & Web Development Insights",
    description:
      "Expert insights on AI automation, agentic AI, web development, e-commerce, and enterprise AI agents.",
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
      name: "Blog - AI Automation, Web Development & E-Commerce Insights",
      description:
        "Expert insights on AI automation, agentic AI apps, web development, e-commerce, landing page design, and enterprise AI agents.",
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

const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

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
              landing page design, and enterprise AI agents from the team
              building these systems every day.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {categories.map((category) => (
              <span
                key={category}
                className="border border-[var(--border-subtle)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-4 text-xs text-[var(--muted-strong)]">
                  <span className="font-mono uppercase tracking-[0.18em]">
                    {post.category}
                  </span>
                  <span className="text-[var(--muted-soft)]">/</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2
                  className={`mt-5 font-light leading-snug ${
                    index === 0 ? "text-3xl sm:text-4xl" : "text-2xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.keywords.slice(0, 3).map((keyword) => (
                    <span
                      key={keyword}
                      className="border border-[var(--border-subtle)] px-3 py-1 text-xs text-[var(--muted-soft)]"
                    >
                      {keyword}
                    </span>
                  ))}
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
