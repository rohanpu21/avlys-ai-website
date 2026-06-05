import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
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
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@id": `${siteConfig.url}/#organization` },
        publisher: { "@id": `${siteConfig.url}/#organization` },
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
        <section className="px-6 pt-20 pb-16 sm:pt-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/blog"
                className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                ← Blog
              </Link>
              <span className="text-[var(--border-strong)]">·</span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {post.category}
              </span>
              <span className="text-[var(--border-strong)]">·</span>
              <span className="font-mono text-xs text-[var(--muted-soft)]">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="mt-8 font-mono text-[clamp(2rem,6vw,3.5rem)] font-light leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border-subtle)] pt-6">
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
        </section>

        <section className="px-6 pb-24">
          <div className="mx-auto w-full max-w-3xl">
            <article className="prose-custom">
              {post.content.map((block, i) => {
                if (block.type === "paragraph") {
                  return (
                    <p key={i} className="mt-6 text-base leading-8 text-[var(--muted)]">
                      {block.text}
                    </p>
                  );
                }
                if (block.type === "heading2") {
                  return (
                    <h2
                      key={i}
                      className="mt-12 mb-2 font-mono text-xl font-light leading-tight text-[var(--foreground)] sm:text-2xl"
                    >
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === "heading3") {
                  return (
                    <h3
                      key={i}
                      className="mt-8 mb-2 font-mono text-lg font-light text-[var(--foreground)]"
                    >
                      {block.text}
                    </h3>
                  );
                }
                if (block.type === "list") {
                  return (
                    <ul key={i} className="mt-4 space-y-3">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[var(--muted-soft)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === "ordered-list") {
                  return (
                    <ol key={i} className="mt-4 space-y-3">
                      {block.items.map((item, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
                          <span className="font-mono text-xs text-[var(--muted-soft)] mt-0.5 shrink-0">
                            {String(j + 1).padStart(2, "0")}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ol>
                  );
                }
                if (block.type === "callout") {
                  return (
                    <div
                      key={i}
                      className="mt-10 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6"
                    >
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                        Avlys AI
                      </p>
                      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{block.text}</p>
                      <Link
                        href="/#contact"
                        className="mt-5 inline-block bg-[var(--foreground)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
                      >
                        Book Strategy Call
                      </Link>
                    </div>
                  );
                }
                return null;
              })}
            </article>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-24">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Articles
                  </p>
                  <h2 className="mt-4 text-2xl font-light leading-tight sm:text-3xl">
                    More on {post.category}
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
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </p>
                    <h3 className="mt-4 text-base font-light leading-snug transition-opacity group-hover:opacity-70">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-xs leading-5 text-[var(--muted)]">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-2xl text-2xl font-light leading-tight sm:text-3xl">
                Ready to build an AI system for your business?
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
