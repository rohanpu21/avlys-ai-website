import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const path = `/blog/${post.slug}`;

  return {
    title: {
      absolute: post.metaTitle,
    },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;
  const postUrl = absoluteUrl(path);

  const wordCount = post.content
    .map((s) => (s.text || (s.items || []).join(" ")))
    .join(" ")
    .split(/\s+/).length;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: post.author,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: {
          "@id": `${postUrl}#webpage`,
        },
        wordCount,
        articleSection: post.category,
        inLanguage: "en-IN",
        url: postUrl,
      },
      {
        "@type": "WebPage",
        "@id": `${postUrl}#webpage`,
        url: postUrl,
        name: post.metaTitle,
        description: post.metaDescription,
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: absoluteUrl("/blog"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <article className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-3">
              <Link
                href="/blog"
                className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                {post.category}
              </span>
            </div>

            <h1 className="mt-8 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-[var(--border-subtle)] pb-8 text-xs text-[var(--muted-strong)]">
              <span>{post.author}</span>
              <span className="text-[var(--muted-soft)]">/</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-[var(--muted-soft)]">/</span>
              <span>{post.readingTime}</span>
            </div>

            <div className="mt-10">
              {post.content.map((section, index) => {
                if (section.type === "heading") {
                  return (
                    <h2
                      key={index}
                      className="mb-4 mt-10 text-xl font-light first:mt-0 sm:text-2xl"
                    >
                      {section.text}
                    </h2>
                  );
                }

                if (section.type === "list") {
                  return (
                    <ul
                      key={index}
                      className="my-6 grid gap-3 border-l border-[var(--border-subtle)] pl-6"
                    >
                      {section.items?.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm leading-7 text-[var(--muted)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="mb-5 text-sm leading-7 text-[var(--muted)]"
                  >
                    {section.text}
                  </p>
                );
              })}
            </div>

            <div className="mt-16 border-t border-[var(--border-subtle)] pt-8">
              <Link
                href="/#contact"
                className="inline-block bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
              >
                Book a Strategy Call
              </Link>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                More Insights
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                Continue reading.
              </h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {related.category}
                    </span>
                    <h3 className="mt-3 text-lg font-light leading-snug">
                      {related.title}
                    </h3>
                    <p className="mt-3 text-xs text-[var(--muted-strong)]">
                      {related.readingTime}
                    </p>
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
