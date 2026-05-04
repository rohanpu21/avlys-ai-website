"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { blogCategories, blogPosts } from "../data/blog-posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [filtered],
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Header */}
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
            <div className="max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Avlys AI / Insights
              </p>
              <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-none">
                The blog.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
                Practical writing on AI automation, web development, e-commerce, agentic systems,
                and the design decisions that drive real business outcomes.
              </p>
            </div>
            <div className="border border-[var(--border-subtle)] p-6">
              <p className="font-mono text-4xl font-light">{sorted.length}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {activeCategory === "All" ? "Published articles" : `Articles in ${activeCategory}`}
              </p>
            </div>
          </div>

          {/* Category filters */}
          <div className="mt-12 flex flex-wrap gap-3">
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`border px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
                  activeCategory === cat
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                    : "border-[var(--border-subtle)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Post grid */}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sorted.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-right text-xs uppercase tracking-[0.14em] text-[var(--muted-strong)]">
                    {post.category}
                  </p>
                </div>

                <h2
                  className={`mt-8 font-light leading-snug ${
                    index === 0 ? "max-w-3xl text-3xl" : "text-xl"
                  }`}
                >
                  {post.title}
                </h2>

                <div className="mt-5 flex items-center gap-6 border-y border-[var(--border-subtle)] py-4 text-xs text-[var(--muted-strong)]">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime} min read</span>
                </div>

                <p
                  className={`mt-5 leading-6 text-[var(--muted)] ${
                    index === 0 ? "max-w-4xl text-base" : "text-sm"
                  }`}
                >
                  {post.excerpt}
                </p>

                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--foreground)] opacity-0 transition-opacity group-hover:opacity-100">
                  Read article →
                </p>
              </Link>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="mt-12 border border-[var(--border-subtle)] p-12 text-center">
              <p className="text-[var(--muted)]">No articles in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
