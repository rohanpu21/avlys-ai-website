import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "AI & Web Development Blog | Avlys AI",
  },
  description:
    "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise software from the Avlys AI team. Practical guides for founders and technical leaders.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "AI & Web Development Blog | Avlys AI",
    description:
      "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise software from the Avlys AI team.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI & Web Development Blog | Avlys AI",
    description:
      "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise software from the Avlys AI team.",
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
      name: "AI & Web Development Blog - Avlys AI",
      description:
        "Insights on AI automation, web development, e-commerce, agentic AI, and enterprise software from the Avlys AI team.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "ItemList",
      "@id": `${blogUrl}#blog-list`,
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
      })),
    },
  ],
};

const categoryColors: Record<string, string> = {
  "AI Automation": "text-blue-400",
  "Web Development": "text-emerald-400",
  "E-Commerce": "text-amber-400",
  "Agentic AI": "text-violet-400",
  "Deep Tech": "text-rose-400",
  "Landing Pages": "text-cyan-400",
  "Enterprise AI": "text-orange-400",
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
              Blog
            </p>
            <h1 className="mt-4 font-mono text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">
              Insights from the build floor.
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Practical thinking on AI automation, web development, e-commerce,
              and enterprise software. Written for founders and technical leaders
              who build.
            </p>
          </div>

          <div className="mt-6 border-t border-[var(--border-subtle)] pt-4">
            <p className="font-mono text-4xl font-light">{blogPosts.length}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Published articles
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group border border-[var(--border-subtle)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)] ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <p
                    className={`font-mono text-xs uppercase tracking-[0.18em] ${
                      categoryColors[post.category] ?? "text-[var(--muted-soft)]"
                    }`}
                  >
                    {post.category}
                  </p>
                  <span className="text-[var(--muted-soft)]">/</span>
                  <p className="font-mono text-xs tracking-[0.18em] text-[var(--muted-soft)]">
                    {post.readTime}
                  </p>
                </div>
                <h2
                  className={`mt-5 font-light leading-snug ${
                    index === 0 ? "text-3xl" : "text-2xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                  {post.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-5 text-xs text-[var(--muted-strong)]">
                  <span>{post.author}</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
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
