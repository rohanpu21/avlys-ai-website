import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI, Web Development & E-Commerce Blog | Avlys AI",
  },
  description:
    "Practical guides on web development, e-commerce, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from the Avlys AI team.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI, Web Development & E-Commerce Blog | Avlys AI",
    description:
      "Practical guides on web development, e-commerce, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from the Avlys AI team.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI, Web Development & E-Commerce Blog | Avlys AI",
    description:
      "Practical guides on web development, e-commerce, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from the Avlys AI team.",
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
      name: "Avlys AI Blog",
      description:
        "Guides on web development, e-commerce, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#post-list`,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  ],
};

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
);

export default function BlogIndexPage() {
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
              Practical guides on web development, e-commerce, agentic AI apps, deep tech
              AI software, landing page design, and enterprise AI agents — written from
              projects we actually ship.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {sortedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                  <span>{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-5 text-2xl font-light leading-snug">{post.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-colors group-hover:text-[var(--foreground)]">
                  Read Article →
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
