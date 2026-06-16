import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost, type BlogSection } from "../../data/blog";
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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  const path = `/blog/${post.slug}`;

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: path },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 mb-4 text-2xl font-light leading-snug sm:text-3xl"
        >
          {section.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="mt-8 mb-3 text-lg font-light leading-snug text-[var(--foreground)]"
        >
          {section.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mb-5 text-sm leading-7 text-[var(--muted)]">
          {section.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mb-5 space-y-2 pl-0">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm leading-7 text-[var(--muted)]"
            >
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--muted-strong)]" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mb-5 space-y-3 pl-0">
          {section.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-4 text-sm leading-7 text-[var(--muted)]"
            >
              <span className="shrink-0 font-mono text-xs text-[var(--muted-soft)] mt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={index}
          className="my-10 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-8"
        >
          <p className="text-sm leading-7 text-[var(--muted)]">{section.text}</p>
          <Link
            href="/#contact"
            className="mt-5 inline-block bg-[var(--foreground)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--background)] transition-opacity hover:opacity-90"
          >
            Book Strategy Call
          </Link>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || post.tags.some((t) => p.tags.includes(t)))
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
        keywords: post.tags.join(", "),
        inLanguage: "en-IN",
        timeRequired: `PT${post.readingTimeMinutes}M`,
      },
      ...(post.faq
        ? [
            {
              "@type": "FAQPage",
              "@id": `${postUrl}#faq`,
              mainEntity: post.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
          ]
        : []),
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
        <section className="px-6 pt-20 pb-12 sm:pt-28">
          <div className="mx-auto w-full max-w-3xl">
            <nav className="mb-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-soft)]">
              <Link href="/" className="hover:text-[var(--muted)]">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[var(--muted)]">Blog</Link>
              <span>/</span>
              <span className="text-[var(--muted-strong)]">{post.category}</span>
            </nav>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              {post.category}
            </p>
            <h1 className="mt-4 font-mono text-[clamp(1.9rem,5vw,3.5rem)] font-light leading-[1.05]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-[var(--border-subtle)] py-4 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-soft)]">
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span>·</span>
              <span>{post.readingTimeMinutes} min read</span>
              <span>·</span>
              <span>{siteConfig.name}</span>
            </div>
            <p className="mt-8 text-base leading-8 text-[var(--muted)]">{post.excerpt}</p>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto w-full max-w-3xl">
            <article>
              {post.sections.map((section, i) => renderSection(section, i))}
            </article>

            {post.faq && post.faq.length > 0 && (
              <div className="mt-16 border-t border-[var(--border-subtle)] pt-12">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-4 text-2xl font-light sm:text-3xl">
                  Common questions about {post.category.toLowerCase()}.
                </h2>
                <div className="mt-8 divide-y divide-[var(--border-subtle)]">
                  {post.faq.map((item, i) => (
                    <div key={i} className="py-6">
                      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-base font-light leading-snug">{item.question}</h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-[var(--border-subtle)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Related Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More on this topic.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  All Posts
                </Link>
              </div>
              <div className="mt-10 grid gap-px border border-[var(--border-subtle)] bg-[var(--border-subtle)] md:grid-cols-3">
                {related.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}`}
                    className="group flex flex-col gap-4 bg-[var(--background)] p-8 transition-colors hover:bg-[var(--surface-subtle)]"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                      {relPost.category}
                    </span>
                    <h3 className="text-sm font-light leading-snug text-[var(--muted)] group-hover:text-[var(--foreground)]">
                      {relPost.title}
                    </h3>
                    <span className="mt-auto font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                      {relPost.readingTimeMinutes} min read
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid w-full max-w-6xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-light leading-tight sm:text-4xl">
                Ready to build what you just read about?
              </h2>
            </div>
            <Link
              href="/#contact"
              className="w-fit bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Map My Workflow
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
