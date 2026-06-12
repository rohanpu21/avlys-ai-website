"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategories, blogPosts } from "../data/blog";

const ALL = "All";

const BlogClient = () => {
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL) {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Avlys AI Blog
          </p>
          <h1 className="mt-4 font-mono text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-none">
            Notes on AI, web, and growth.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Practical guides on web development, e-commerce, agentic AI apps, deep
            tech AI software, landing page design, and enterprise AI agents from
            the team building these systems.
          </p>
        </div>
        <div className="border border-[var(--border-subtle)] p-6">
          <p className="font-mono text-4xl font-light">{filteredPosts.length}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
            Published posts
          </p>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        {[ALL, ...blogCategories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={`border px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.16em] transition-colors ${
              activeCategory === category
                ? "border-[var(--foreground)] bg-[var(--foreground)] text-[var(--background)]"
                : "border-[var(--border-subtle)] text-[var(--muted)] hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {post.category}
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {post.readingTime}
              </p>
            </div>
            <h2 className="mt-6 text-2xl font-light leading-snug">{post.title}</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{post.excerpt}</p>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
              Read Post
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogClient;
