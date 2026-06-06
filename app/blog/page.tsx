import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blogs";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog — AI Automation, Web Development & Deep Tech Insights",
  description:
    "Practical guides on agentic AI apps, enterprise AI agents, e-commerce development, web development, and high-converting landing page design from the Avlys AI team.",
  keywords: [
    "AI automation blog",
    "agentic AI insights",
    "web development India blog",
    "enterprise AI agents",
    "e-commerce development 2025",
    "deep tech AI blog",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Practical guides on agentic AI apps, enterprise AI agents, e-commerce development, and web development from the Avlys AI team.",
    type: "website",
  },
};

const blogListSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${siteConfig.url}/blog#blog`,
  name: "Avlys AI Blog",
  description:
    "Practical guides on agentic AI, enterprise automation, web development, e-commerce, and deep tech software.",
  url: absoluteUrl("/blog"),
  publisher: {
    "@id": `${siteConfig.url}/#organization`,
  },
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.publishedAt,
    author: {
      "@id": `${siteConfig.url}/#organization`,
    },
  })),
};

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={blogListSchema} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl pb-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Avlys AI / Blog
            </p>
            <h1 className="mt-4 max-w-4xl font-mono text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[0.95]">
              Insights on AI, web development, and deep tech.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical guides for founders and operators building with AI, launching faster, and automating what slows them down.
            </p>
          </div>
        </section>

        <section className="px-6 pb-8">
          <div className="mx-auto w-full max-w-6xl">
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)]">
              {blogPosts.map((post, index) => (
                <article
                  key={post.slug}
                  className="group bg-[var(--background)] transition-colors hover:bg-[var(--surface-subtle)]"
                >
                  <Link href={`/blog/${post.slug}`} className="block p-6 sm:p-8">
                    <div className="grid gap-6 lg:grid-cols-[0.6fr_1fr_200px] lg:items-start">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                          {post.category}
                        </p>
                        <p className="mt-2 font-mono text-xs text-[var(--muted-soft)]">
                          {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-xl font-light leading-snug transition-opacity group-hover:opacity-80 sm:text-2xl">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex items-start lg:justify-end">
                        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                          {post.readingTime} →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-6xl">
            <div className="border border-[var(--border-subtle)] p-8 sm:p-12">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Strategy Call
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl">
                Ready to automate a workflow or launch a custom product?
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
                The strategy call is where we map your workflow, scope a solution, and tell you what is realistic to build in your timeline and budget.
              </p>
              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="inline-block bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  Book Strategy Call
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
