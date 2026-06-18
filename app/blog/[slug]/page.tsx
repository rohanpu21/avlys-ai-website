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
      modifiedTime: post.updatedAt,
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
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
        url: postUrl,
        inLanguage: "en-IN",
        keywords: post.keywords.join(", "),
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

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <article className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {post.category}
              </p>
            </div>

            <h1 className="mt-8 text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
              {post.title}
            </h1>

            <p className="mt-6 text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-6 border-t border-b border-[var(--border-subtle)] py-4">
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {post.author}
              </p>
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {post.publishedAt}
              </p>
              <p className="font-mono text-xs text-[var(--muted-soft)]">
                {post.readingTime}
              </p>
            </div>

            <div className="mt-12 grid gap-12">
              {post.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-2xl font-light leading-snug">
                    {section.heading}
                  </h2>
                  <div className="mt-4 grid gap-4">
                    {section.body.split("\n\n").map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-base leading-7 text-[var(--muted)]"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 border-t border-[var(--border-subtle)] pt-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Ready to build?
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Avlys AI builds custom AI systems, web platforms, and
                e-commerce solutions for growing businesses.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/#contact"
                  className="bg-[var(--foreground)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
                >
                  Book Strategy Call
                </Link>
                <Link
                  href="/blog"
                  className="border border-[var(--border-strong)] px-6 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  More Articles
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
