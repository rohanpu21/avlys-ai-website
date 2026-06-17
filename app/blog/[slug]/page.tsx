import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";
import { notFound } from "next/navigation";

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
      section: post.category,
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

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        wordCount: post.sections.reduce(
          (acc, section) => acc + section.body.split(/\s+/).length,
          0
        ),
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
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <Link
                href="/blog"
                className="font-mono uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
              >
                Blog
              </Link>
              <span className="text-[var(--muted-soft)]">/</span>
              <span className="font-mono uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                {post.category}
              </span>
            </div>
            <h1 className="mt-6 font-mono text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1]">
              {post.title}
            </h1>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-[var(--border-subtle)] py-5 text-xs text-[var(--muted-strong)]">
              <span>{post.author}</span>
              <span>{post.publishedAt}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 sm:py-20">
          <article className="mx-auto w-full max-w-4xl">
            {post.sections.map((section, index) => (
              <div
                key={section.heading}
                className={index > 0 ? "mt-12 sm:mt-16" : ""}
              >
                <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-6 space-y-5 text-[15px] leading-8 text-[var(--muted)]">
                  {section.body.split("\n\n").map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </article>
        </section>

        <section className="px-6 py-10">
          <div className="mx-auto w-full max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="border border-[var(--border-subtle)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-strong)]"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Articles
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More on {post.category}.
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
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </p>
                    <h3 className="mt-4 text-lg font-light leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {item.excerpt.slice(0, 120)}...
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-4xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Ready to build your AI-powered system?
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
