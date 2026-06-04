import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost, type ContentBlock } from "../../data/blogPosts";
import { absoluteUrl, siteConfig } from "../../lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: {
      absolute: `${post.title} | Avlys AI`,
    },
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl(path),
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
      images: [
        {
          url: absoluteUrl(`${path}/opengraph-image`),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [absoluteUrl(`${path}/opengraph-image`)],
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "heading":
      if (block.level === 2) {
        return (
          <h2
            key={index}
            className="mt-12 text-2xl font-light leading-snug text-[var(--foreground)] sm:text-3xl"
          >
            {block.text}
          </h2>
        );
      }
      return (
        <h3
          key={index}
          className="mt-8 text-xl font-light leading-snug text-[var(--foreground)]"
        >
          {block.text}
        </h3>
      );

    case "paragraph":
      return (
        <p key={index} className="mt-6 text-base leading-8 text-[var(--muted)]">
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="mt-6 space-y-3 border-l border-[var(--border-subtle)] pl-6">
          {block.items.map((item, i) => (
            <li key={i} className="text-sm leading-7 text-[var(--muted)]">
              {item}
            </li>
          ))}
        </ul>
      );

    case "numbered-list":
      return (
        <ol key={index} className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="grid grid-cols-[40px_1fr] gap-4 text-sm leading-7">
              <span className="font-mono text-xs text-[var(--muted-soft)] pt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[var(--muted)]">{item}</span>
            </li>
          ))}
        </ol>
      );

    case "callout":
      return (
        <blockquote
          key={index}
          className="mt-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6 sm:p-8"
        >
          <p className="text-base leading-8 text-[var(--foreground)]">{block.text}</p>
        </blockquote>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const otherRelated = blogPosts
    .filter((p) => p.slug !== post.slug && p.category !== post.category)
    .slice(0, 3 - related.length);
  const relatedPosts = [...related, ...otherRelated].slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-6xl pb-16">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/blog"
                  className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
                >
                  ← Blog
                </Link>
                <span className="h-px w-4 bg-[var(--border-subtle)]" />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  {post.category}
                </p>
              </div>
              <h1 className="mt-6 font-mono text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05]">
                {post.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--muted)]">
                {post.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-6 border-t border-[var(--border-subtle)] pt-6 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                <span>Avlys AI</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
              {/* Content */}
              <article className="max-w-3xl">
                {post.content.map((block, i) => renderBlock(block, i))}
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28 space-y-6">
                  <div className="border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      About
                    </p>
                    <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                      Avlys AI is a Hyderabad-based agency building AI automation, agentic apps, e-commerce stores, web applications, and high-converting landing pages for businesses in India and globally.
                    </p>
                    <Link
                      href="/#contact"
                      className="mt-6 block w-full border border-[var(--border-strong)] px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
                    >
                      Book Strategy Call
                    </Link>
                  </div>

                  {post.keywords.slice(0, 5).length > 0 && (
                    <div className="border border-[var(--border-subtle)] p-6">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                        Topics
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.keywords.slice(0, 5).map((kw) => (
                          <span
                            key={kw}
                            className="border border-[var(--border-subtle)] px-2 py-1 font-mono text-xs text-[var(--muted-soft)]"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Keep Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More from the blog.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  All Articles
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                      {related.category}
                    </p>
                    <h3 className="mt-4 flex-1 text-lg font-light leading-snug">{related.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)] line-clamp-2">
                      {related.excerpt}
                    </p>
                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                      Read →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Work With Avlys AI
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Ready to build what you just read about?
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
