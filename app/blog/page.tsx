import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blogPosts";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
  },
  description:
    "Insights on AI automation, agentic AI apps, e-commerce development, web development, landing page design, and enterprise AI agents. Practical guides for business owners.",
  keywords: [
    "AI automation blog",
    "AI development blog India",
    "web development insights",
    "e-commerce AI blog",
    "agentic AI guides",
    "enterprise AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | AI Automation, Web Development & Deep Tech | Avlys AI",
    description:
      "Insights on AI automation, agentic AI apps, e-commerce development, web development, landing page design, and enterprise AI agents.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | Avlys AI",
    description:
      "Insights on AI automation, agentic AI, web development, and e-commerce for business owners.",
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
        "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise AI agents for business owners.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#blog-posts`,
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
              Insights for operators building with AI.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on AI automation, web development, e-commerce,
              agentic AI, and enterprise AI agents. Written for business owners
              who want results, not hype.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
              >
                <div className="flex items-center gap-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {post.category}
                  </p>
                </div>
                <h2 className="mt-6 text-xl font-light leading-snug sm:text-2xl">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <p className="font-mono text-xs text-[var(--muted-soft)]">
                    {post.readingTime}
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
