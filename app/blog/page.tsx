import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | Avlys AI",
  },
  description:
    "Guides on web development, e-commerce, agentic AI, deep tech AI software, landing page design, and AI agents for enterprises from the Avlys AI team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Guides on web development, e-commerce, agentic AI, deep tech AI software, landing page design, and AI agents for enterprises from the Avlys AI team.",
    type: "website",
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
    title: "Blog | Avlys AI",
    description:
      "Guides on web development, e-commerce, agentic AI, deep tech AI software, landing page design, and AI agents for enterprises from the Avlys AI team.",
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
        "Guides on web development, e-commerce, agentic AI, deep tech AI software, landing page design, and AI agents for enterprises.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#post-list`,
      itemListElement: sortedPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  ],
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
              Notes on building AI-ready businesses.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on web development, e-commerce, agentic AI apps,
              deep tech AI software, landing page design, and AI agents for
              enterprises - written from real project work.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sortedPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] sm:p-8 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  <span className="font-mono">{post.category}</span>
                  <span aria-hidden="true">/</span>
                  <span className="font-mono">{formatDate(post.date)}</span>
                  <span aria-hidden="true">/</span>
                  <span className="font-mono">{post.readingTime}</span>
                </div>
                <h2 className="mt-4 text-2xl font-light leading-snug sm:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                  {post.description}
                </p>
                <span className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-[var(--foreground)] opacity-70 transition-opacity group-hover:opacity-100">
                  Read Article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
