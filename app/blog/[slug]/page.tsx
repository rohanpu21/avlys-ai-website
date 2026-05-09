import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { blogPosts, getBlogPost, type ContentBlock } from "../../data/blog-posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      siteName: "Avlys AI",
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
    },
    alternates: {
      canonical: `https://avlysai.com/blog/${post.slug}`,
    },
  };
}

function renderBlock(block: ContentBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={idx}
          className="mt-10 mb-4 font-mono text-xl font-light leading-snug text-[var(--foreground)] sm:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={idx}
          className="mt-7 mb-3 text-base font-medium text-[var(--foreground)] sm:text-lg"
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="mb-5 text-sm leading-7 text-[var(--muted)] sm:text-base">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="mb-5 space-y-2 pl-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm leading-6 text-[var(--muted)] sm:text-base">
              <span className="mt-2.5 h-1 w-1 flex-shrink-0 bg-[var(--muted-strong)]" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="mb-5 space-y-2 pl-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-6 text-[var(--muted)] sm:text-base">
              <span className="flex-shrink-0 font-mono text-xs text-[var(--muted-strong)] pt-0.5">
                {String(i + 1).padStart(2, "0")}.
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={idx}
          className="my-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6"
        >
          <p className="text-sm leading-7 text-[var(--foreground)] sm:text-base">{block.text}</p>
          <a
            href="/#contact"
            className="mt-4 inline-block border border-[var(--border-strong)] px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
          >
            Book Strategy Call →
          </a>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Schema.org BlogPosting structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://avlysai.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Avlys AI",
      url: "https://avlysai.com",
      logo: {
        "@type": "ImageObject",
        url: "https://avlysai.com/favicon.ico",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://avlysai.com/blog/${post.slug}`,
    },
    keywords: post.seo.keywords.join(", "),
    articleSection: post.category,
  };

  // Related posts (same category, excluding current)
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        {/* Breadcrumb */}
        <div className="border-b border-[var(--border-subtle)] px-6 py-4">
          <div className="mx-auto max-w-6xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
              <Link href="/" className="transition-opacity hover:opacity-50">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="transition-opacity hover:opacity-50">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[var(--muted)]">{post.category}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="border border-[var(--border-subtle)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                {post.category}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                {post.readTime} min read
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                {formattedDate}
              </span>
            </div>

            {/* Title */}
            <h1 className="mb-6 font-mono text-2xl font-light leading-tight text-[var(--foreground)] sm:text-4xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="mb-10 border-l-2 border-[var(--border-strong)] pl-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
              {post.excerpt}
            </p>

            {/* Divider */}
            <div className="mb-10 h-px bg-[var(--border-subtle)]" />

            {/* Content */}
            <div>{post.content.map((block, idx) => renderBlock(block, idx))}</div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[var(--border-subtle)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-strong)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author */}
            <div className="mt-8 border-t border-[var(--border-subtle)] pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                Written by
              </p>
              <p className="mt-1 text-sm text-[var(--foreground)]">{post.author}</p>
              <p className="mt-1 text-xs text-[var(--muted)]">
                Building AI automation, web development, and enterprise software systems for
                businesses globally.
              </p>
            </div>
          </div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <section className="border-t border-[var(--border-subtle)] px-6 py-14 sm:py-20">
            <div className="mx-auto max-w-6xl">
              <p className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                Related Posts
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      {relPost.readTime} min read
                    </span>
                    <p className="mt-2 text-sm font-medium leading-snug text-[var(--foreground)] group-hover:opacity-80">
                      {relPost.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="border-t border-[var(--border-subtle)] px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
                  Ready to act on this?
                </p>
                <p className="mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">
                  Book a free strategy call with Avlys AI and get a concrete plan for your
                  business in 48 hours.
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
