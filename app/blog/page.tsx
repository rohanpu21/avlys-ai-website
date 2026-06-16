import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogCategories, blogPosts, type BlogCategory } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog — AI, Web Development & E-Commerce Insights | Avlys AI",
  },
  description:
    "Expert guides on agentic AI apps, web development, e-commerce development, enterprise AI agents, and high-converting landing page design from the Avlys AI team.",
  keywords: [
    "agentic AI apps",
    "web development blog",
    "e-commerce development",
    "enterprise AI agents",
    "AI automation blog",
    "landing page design",
    "deep tech AI software",
    "AI blog India",
    "Avlys AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog — AI, Web Development & E-Commerce Insights | Avlys AI",
    description:
      "Expert guides on agentic AI apps, web development, e-commerce, and enterprise AI from the Avlys AI team.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blog | Avlys AI",
    description: "Expert guides on agentic AI, web development, e-commerce, and enterprise AI.",
  },
};

const categoryColors: Record<BlogCategory, string> = {
  "Agentic AI Apps": "text-blue-400",
  "Web Development": "text-emerald-400",
  "E-Commerce Development": "text-orange-400",
  "Landing Page Design": "text-purple-400",
  "Enterprise AI": "text-red-400",
  "Deep Tech AI": "text-cyan-400",
};

export default function BlogPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    name: "Avlys AI Blog",
    description:
      "Expert guides on agentic AI apps, web development, e-commerce development, enterprise AI agents, and high-converting landing page design.",
    url: absoluteUrl("/blog"),
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.publishedAt,
      url: absoluteUrl(`/blog/${post.slug}`),
    })),
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 pb-16 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Avlys AI
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Blog
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides on agentic AI, web development, e-commerce, and enterprise automation — written for founders who want to move fast.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-wrap gap-3 border-y border-[var(--border-subtle)] py-5">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)] self-center mr-2">
                Topics:
              </span>
              {blogCategories.map((cat) => (
                <span
                  key={cat}
                  className={`font-mono text-xs uppercase tracking-[0.15em] ${categoryColors[cat]}`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-10 sm:py-16">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-5 bg-[var(--background)] p-8 transition-colors hover:bg-[var(--surface-subtle)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${categoryColors[post.category]}`}
                    >
                      {post.category}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--muted-soft)]">
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h2 className="text-base font-light leading-snug group-hover:text-[var(--foreground)] text-[var(--muted)]">
                    {post.title}
                  </h2>
                  <p className="mt-auto text-xs leading-6 text-[var(--muted-soft)] line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
                    <span className="font-mono text-[10px] text-[var(--muted-soft)]">
                      {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-100 opacity-0">
                      Read →
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
                Ready to Build?
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Stop reading about AI and automation. Start building it.
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
