import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getBlogPost, blogPosts } from "../../data/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Avlys AI Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: ["Avlys AI"],
      tags: post.tags,
    },
    alternates: {
      canonical: `https://avlysai.com/blog/${post.slug}`,
    },
  };
}

const categoryColors: Record<string, string> = {
  "Web Development": "text-blue-400",
  "E-Commerce Development": "text-emerald-400",
  "Agentic AI": "text-purple-400",
  "Deep Tech AI": "text-orange-400",
  "Landing Pages": "text-pink-400",
  "Enterprise AI": "text-cyan-400",
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const categoryColor = categoryColors[post.category] ?? "text-[var(--muted)]";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    author: {
      "@type": "Organization",
      name: "Avlys AI",
      url: "https://avlysai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Avlys AI",
      url: "https://avlysai.com",
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://avlysai.com/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border-subtle)] px-6 py-4">
          <div className="mx-auto max-w-3xl">
            <nav className="flex items-center gap-2 font-mono text-xs text-[var(--muted-soft)]">
              <Link href="/" className="transition-opacity hover:opacity-70">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="transition-opacity hover:opacity-70">
                Blog
              </Link>
              <span>/</span>
              <span className="truncate text-[var(--muted)]">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Header */}
        <header className="border-b border-[var(--border-subtle)] px-6 py-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-4">
              <span className={`font-mono text-xs uppercase tracking-[0.15em] ${categoryColor}`}>
                {post.category}
              </span>
              <time
                dateTime={post.date}
                className="font-mono text-xs text-[var(--muted-soft)]"
              >
                {new Date(post.date).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="font-mono text-xs text-[var(--muted-soft)]">{post.readTime}</span>
            </div>

            <h1 className="mb-6 text-2xl font-semibold leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h1>

            <p className="text-base leading-relaxed text-[var(--muted)] md:text-lg">
              {post.excerpt}
            </p>
          </div>
        </header>

        {/* Article Body */}
        <article className="px-6 py-12 md:py-16">
          <div
            className="prose-blog mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Tags */}
        <section className="border-t border-[var(--border-subtle)] px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-xs text-[var(--muted-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-[var(--border-subtle)] px-6 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                Avlys AI
              </p>
              <h2 className="mb-3 text-xl font-semibold md:text-2xl">
                Ready to build what you just read about?
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-[var(--muted)]">
                We turn strategy into shipped product — custom web apps, AI agents, e-commerce platforms, and deep tech software. Book a free 30-minute strategy call to discuss your project.
              </p>
              <a
                href="/#contact"
                className="inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
              >
                Book Strategy Call
              </a>
            </div>
          </div>
        </section>

        {/* Back to Blog */}
        <div className="border-t border-[var(--border-subtle)] px-6 py-8">
          <div className="mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-opacity hover:opacity-70"
            >
              ← All Articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
