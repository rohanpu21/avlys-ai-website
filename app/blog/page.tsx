import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogCategories, blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI, Web Development & E-Commerce Blog | Avlys AI",
  },
  description:
    "Practical guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from Avlys AI.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI, Web Development & E-Commerce Blog | Avlys AI",
    description:
      "Practical guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents.",
    images: [
      {
        url: absoluteUrl("/blog/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Avlys AI blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI, Web Development & E-Commerce Blog | Avlys AI",
    description:
      "Practical guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents.",
    images: [absoluteUrl("/blog/opengraph-image")],
  },
};

const blogUrl = absoluteUrl("/blog");

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${blogUrl}#webpage`,
      url: blogUrl,
      name: "Avlys AI Blog",
      description:
        "Guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Blog",
      "@id": `${blogUrl}#blog`,
      name: "Avlys AI Blog",
      url: blogUrl,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      blogPost: sortedPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.date,
        description: post.excerpt,
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
              Notes on building AI-ready businesses.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on web development, e-commerce, agentic AI apps,
              deep tech AI software, landing page design, and AI agents for
              enterprises — written from work we actually ship.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <span
                key={category}
                className="border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)]"
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sortedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  <span>{post.category}</span>
                  <span aria-hidden="true">/</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-6 text-2xl font-light leading-snug">
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
