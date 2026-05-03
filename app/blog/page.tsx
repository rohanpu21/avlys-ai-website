import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { blogPosts, blogCategories } from "../data/blog";

export const metadata: Metadata = {
  title: "Blog | Avlys AI — Web Development, AI Agents & E-Commerce Insights",
  description:
    "Expert insights on web development, e-commerce, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from the Avlys AI team.",
  openGraph: {
    title: "Blog | Avlys AI",
    description:
      "Expert insights on web development, AI agents, e-commerce, and deep tech AI from the Avlys AI team.",
    type: "website",
  },
  alternates: {
    canonical: "https://avlysai.com/blog",
  },
};

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="border-b border-[var(--border-subtle)] px-6 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
              Avlys AI / Blog
            </p>
            <h1 className="mb-6 max-w-3xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              Insights on AI, Web, and E-Commerce
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
              Practical perspectives on web development, agentic AI, e-commerce architecture, and enterprise automation — written for founders and operators who want to understand the technology, not just the buzzwords.
            </p>
          </div>
        </section>

        {/* Category Pills — client filter handled via URL or static render */}
        <section className="border-b border-[var(--border-subtle)] px-6 py-5">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <span
                  key={cat}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs uppercase tracking-[0.12em] text-[var(--muted)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Post Grid */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <div key={post.slug} className="bg-[var(--background)]">
                  <BlogCard post={post} />
                </div>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs text-[var(--muted-soft)]">
              {sortedPosts.length} articles — updated daily
            </p>
          </div>
        </section>

        {/* Blog CTA */}
        <section className="border-t border-[var(--border-subtle)] px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  Ready to act on what you've read?
                </p>
                <h2 className="text-xl font-semibold md:text-2xl">
                  Let's talk about your business.
                </h2>
              </div>
              <a
                href="/#contact"
                className="inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
              >
                Book Strategy Call
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
