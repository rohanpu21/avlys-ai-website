import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.metaTitle,
      description: post.metaDescription,
      publishedTime: post.date,
      authors: [siteConfig.name],
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
        },
        isPartOf: {
          "@id": `${siteConfig.url}/#website`,
        },
        inLanguage: "en-IN",
        keywords: post.keywords.join(", "),
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
      <main className="px-6 py-20 sm:py-28">
        <article className="mx-auto w-full max-w-3xl">
          <div className="flex items-center gap-4 text-xs text-[var(--muted-strong)]">
            <Link
              href="/blog"
              className="font-mono uppercase tracking-[0.18em] transition-opacity hover:opacity-50"
            >
              ← Blog
            </Link>
            <span className="font-mono uppercase tracking-[0.18em]">
              {post.category}
            </span>
            <span>{post.date}</span>
            <span>{post.readTime} read</span>
          </div>

          <h1 className="mt-8 font-mono text-[clamp(2rem,5vw,3.5rem)] font-light leading-[1.1]">
            {post.title}
          </h1>

          <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
            {post.excerpt}
          </p>

          <div className="mt-12 border-t border-[var(--border-subtle)] pt-12">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-12">
                <h2 className="font-mono text-xl font-light leading-snug sm:text-2xl">
                  {section.heading}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="mt-6 text-base leading-8 text-[var(--muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-8 border-t border-[var(--border-subtle)] pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Ready to build?
            </p>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
              Book a strategy call with Avlys AI to discuss your project
              requirements and get a clear plan for execution.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
            >
              Book Strategy Call
            </Link>
          </div>

          <div className="mt-12 border-t border-[var(--border-subtle)] pt-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              More from the blog
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {blogPosts
                .filter((p) => p.slug !== post.slug)
                .slice(0, 2)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group border border-[var(--border-subtle)] p-5 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {related.category}
                    </p>
                    <p className="mt-3 text-sm font-light leading-snug">
                      {related.title}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
