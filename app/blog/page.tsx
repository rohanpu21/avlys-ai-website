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
    "Insights on AI automation, agentic AI applications, web development, e-commerce, landing page design, and enterprise AI agents. Practical guides for growing businesses.",
  keywords: [
    "AI automation blog",
    "web development blog",
    "AI agents blog",
    "e-commerce development blog",
    "AI automation agency blog India",
    "deep tech AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
    description:
      "Insights on AI automation, agentic AI applications, web development, e-commerce, landing page design, and enterprise AI agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
    description:
      "Insights on AI automation, agentic AI applications, web development, e-commerce, landing page design, and enterprise AI agents.",
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
        "Insights on AI automation, web development, e-commerce, and enterprise AI agents from Avlys AI.",
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
              Insights from the build floor.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, web development, e-commerce,
              agentic AI, and enterprise technology — written for founders and
              operators building modern businesses.
            </p>
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
                <div className="flex items-center gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {post.category}
                  </p>
                  <span className="text-[var(--muted-soft)]">/</span>
                  <p className="font-mono text-xs tracking-[0.18em] text-[var(--muted-soft)]">
                    {post.readTime}
                  </p>
                </div>
                <h2 className="mt-5 text-2xl font-light leading-snug">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {post.description}
                </p>
                <div className="mt-6 border-t border-[var(--border-subtle)] pt-5">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    {post.date}
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
