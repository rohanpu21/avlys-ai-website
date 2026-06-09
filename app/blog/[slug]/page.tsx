import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost, type BlogCategory, type BlogSection } from "../../data/blog";
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
  const imageUrl = absoluteUrl(path + "/opengraph-image");

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [imageUrl],
    },
  };
}

const categoryColors: Record<BlogCategory, string> = {
  "Web Development": "text-blue-400",
  "E-Commerce": "text-emerald-400",
  "Agentic AI": "text-violet-400",
  "Deep Tech AI": "text-amber-400",
  "Landing Pages": "text-rose-400",
  "Enterprise AI": "text-cyan-400",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function RenderSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "intro":
      return (
        <p className="text-lg leading-8 text-[var(--muted)] [&:not(:first-child)]:mt-8">
          {section.content}
        </p>
      );

    case "h2":
      return (
        <div className="mt-14">
          <h2 className="text-2xl font-light leading-snug sm:text-3xl">{section.heading}</h2>
          {section.content && (
            <p className="mt-5 text-base leading-7 text-[var(--muted)]">{section.content}</p>
          )}
        </div>
      );

    case "h3":
      return (
        <div className="mt-10">
          <h3 className="text-xl font-light leading-snug">{section.heading}</h3>
          {section.content && (
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{section.content}</p>
          )}
        </div>
      );

    case "paragraph":
      return (
        <p className="mt-6 text-base leading-7 text-[var(--muted)]">{section.content}</p>
      );

    case "list":
      return (
        <ul className="mt-6 grid gap-3">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-4 text-sm leading-6 text-[var(--muted)]">
              <span className="mt-0.5 shrink-0 font-mono text-xs text-[var(--muted-soft)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div className="mt-10 border-l-2 border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6">
          <p className="text-sm leading-7 text-[var(--muted)]">{section.content}</p>
        </div>
      );

    case "cta":
      return (
        <div className="mt-14 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-8">
          <h3 className="text-xl font-light leading-snug">{section.heading}</h3>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{section.content}</p>
          <Link
            href="/#contact"
            className="mt-6 inline-block bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Book Strategy Call
          </Link>
        </div>
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
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        author: {
          "@type": "Organization",
          name: post.author,
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        inLanguage: "en-IN",
        timeRequired: `PT${post.readTime}M`,
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
                  className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-60"
                >
                  ← Blog
                </Link>
                <span className="text-[var(--border-subtle)]">/</span>
                <p
                  className={`font-mono text-xs uppercase tracking-[0.18em] ${
                    categoryColors[post.category]
                  }`}
                >
                  {post.category}
                </p>
              </div>
              <h1 className="mt-6 font-mono text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05]">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-6 border-y border-[var(--border-subtle)] py-5 text-xs text-[var(--muted-strong)]">
                <span>By {post.author}</span>
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* Main content */}
            <article className="min-w-0">
              {post.sections.map((section, index) => (
                <RenderSection key={index} section={section} />
              ))}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 grid gap-8">
                {/* Tags */}
                <div className="border border-[var(--border-subtle)] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Tags
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-[var(--border-subtle)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--muted-strong)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA sidebar */}
                <div className="border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Build With Avlys AI
                  </p>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
                    Ready to implement what you're reading? Book a free strategy call.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-6 block bg-[var(--foreground)] px-4 py-3 text-center font-mono text-xs uppercase tracking-[0.18em] text-[var(--background)] transition-opacity hover:opacity-90"
                  >
                    Book Strategy Call
                  </Link>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="border border-[var(--border-subtle)] p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                      Related
                    </p>
                    <div className="mt-4 grid gap-4">
                      {related.map((relPost) => (
                        <Link
                          key={relPost.slug}
                          href={`/blog/${relPost.slug}`}
                          className="group"
                        >
                          <p
                            className={`font-mono text-[10px] uppercase tracking-[0.12em] ${
                              categoryColors[relPost.category]
                            }`}
                          >
                            {relPost.category}
                          </p>
                          <p className="mt-1 text-sm font-light leading-snug transition-opacity group-hover:opacity-60">
                            {relPost.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* More articles */}
        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Keep Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More on this topic.
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
                {related.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group flex flex-col border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p
                      className={`font-mono text-xs uppercase tracking-[0.15em] ${
                        categoryColors[relPost.category]
                      }`}
                    >
                      {relPost.category}
                    </p>
                    <h3 className="mt-4 flex-1 text-lg font-light leading-snug transition-opacity group-hover:opacity-80">
                      {relPost.title}
                    </h3>
                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs text-[var(--muted-strong)]">
                      <span>{formatDate(relPost.date)}</span>
                      <span>{relPost.readTime} min read</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
