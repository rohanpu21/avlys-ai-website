import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI Automation Blog | Web Dev, E-commerce & AI Agents | Avlys AI",
  },
  description:
    "Practical insights on AI automation, web development, e-commerce, agentic AI apps, and landing page design for Indian SMBs and enterprises. Published by Avlys AI.",
  keywords: [
    "AI automation blog India",
    "web development blog India",
    "ecommerce development blog",
    "agentic AI blog",
    "AI agents blog India",
    "landing page design blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI Automation Blog | Avlys AI",
    description:
      "Practical insights on AI automation, web development, e-commerce, and agentic AI apps for Indian businesses.",
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
      name: "AI Automation Blog — Avlys AI",
      description:
        "Practical insights on AI automation, web development, e-commerce, agentic AI apps, and landing page design for Indian SMBs and enterprises.",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Blog",
      "@id": `${blogUrl}#blog`,
      name: "Avlys AI Blog",
      url: blogUrl,
      description:
        "Practical AI automation, web development, and e-commerce insights for Indian businesses.",
      publisher: { "@id": `${siteConfig.url}/#organization` },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        "@id": absoluteUrl(`/blog/${post.slug}#article`),
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
      })),
    },
  ],
};

const categoryColors: Record<string, string> = {
  "Web Development": "text-blue-400",
  "E-commerce Development": "text-green-400",
  "Agentic AI Apps": "text-purple-400",
  "Deep Tech AI": "text-orange-400",
  "Landing Pages": "text-pink-400",
  "AI Agents for Enterprises": "text-yellow-400",
};

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Avlys AI Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Insights for operators.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical articles on AI automation, web development, e-commerce,
              agentic AI apps, and landing page design — written for Indian SMB
              founders and enterprise teams.
            </p>
          </div>

          {/* Post grid */}
          <div className="mt-16 grid gap-px border border-[var(--border-subtle)] md:grid-cols-2">
            {sorted.map((post, index) => {
              const catColor = categoryColors[post.category] ?? "text-[var(--muted-strong)]";
              const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-6 border-b border-r border-[var(--border-subtle)] bg-[var(--background)] p-8 transition-colors hover:bg-[var(--surface-subtle)] last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className={`font-mono text-xs uppercase tracking-[0.15em] ${catColor}`}>
                      {post.category}
                    </p>
                    <p className="shrink-0 font-mono text-xs text-[var(--muted-soft)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                  </div>

                  <h2 className="text-xl font-light leading-snug">{post.title}</h2>

                  <p className="text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <p className="font-mono text-xs text-[var(--muted-soft)]">
                      {date} · {post.readingTime} min read
                    </p>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                      Read →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-20 border-t border-[var(--border-subtle)] pt-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Want results, not just reading?
            </p>
            <p className="mt-4 max-w-xl text-2xl font-light leading-snug">
              Book a strategy call and we'll map out your AI automation opportunity in 30 minutes.
            </p>
            <Link
              href="/#contact"
              className="mt-8 inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
            >
              Book Strategy Call
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
