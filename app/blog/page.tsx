import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogCard from "../components/BlogCard";
import { blogPosts, blogCategories } from "../data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | AI Automation, Web Development & E-Commerce Insights | Avlys AI",
  description:
    "Expert insights on AI automation, web development, e-commerce, agentic AI apps, and enterprise AI — from the Avlys AI team.",
  openGraph: {
    title: "Blog | Avlys AI",
    description:
      "Expert insights on AI automation, web development, e-commerce, agentic AI apps, and enterprise AI.",
    type: "website",
    siteName: "Avlys AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Avlys AI",
    description:
      "Expert insights on AI automation, web development, e-commerce, agentic AI apps, and enterprise AI.",
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
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="border-b border-[var(--border-subtle)] px-6 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
              Avlys AI / Blog
            </p>
            <h1 className="mt-4 font-mono text-4xl font-light leading-tight sm:text-6xl">
              Insights
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)] sm:text-base">
              Practical thinking on AI automation, web development, e-commerce, and enterprise
              software — from the team building these systems daily.
            </p>
          </div>
        </section>

        {/* Category chips */}
        <section className="border-b border-[var(--border-subtle)] px-6 py-5">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-2">
              {blogCategories.map((cat) => (
                <span
                  key={cat}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Post grid */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border-subtle)] px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                  Ready to automate?
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                  Turn these insights into action. Book a free strategy call and get a concrete
                  automation plan for your business.
                </p>
              </div>
              <a
                href="/#contact"
                className="flex-shrink-0 border border-[var(--border-strong)] px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
              >
                Book Strategy Call
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
