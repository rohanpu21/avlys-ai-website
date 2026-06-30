import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { type ContentBlock, blogPosts } from "../../data/blog";
import { absoluteUrl, siteConfig } from "../../lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  return {
    title: { absolute: post.metaTitle },
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      url: absoluteUrl(`/blog/${post.slug}`),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

function renderBlock(block: ContentBlock, index: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="mt-12 font-mono text-2xl font-light leading-snug first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="mt-8 text-lg font-light text-[var(--foreground)]">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="mt-6 text-base leading-8 text-[var(--muted)]">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="mt-6 space-y-3 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-7 text-[var(--muted)]">
              <span className="mt-1 shrink-0 font-mono text-xs text-[var(--muted-soft)]">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="mt-6 space-y-3 pl-0">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-base leading-7 text-[var(--muted)]">
              <span className="mt-0.5 shrink-0 font-mono text-xs text-[var(--muted-strong)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div
          key={index}
          className="my-10 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6"
        >
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
            Work with Avlys AI
          </p>
          <p className="mt-3 text-base leading-7 text-[var(--foreground)]">{block.text}</p>
          <Link
            href="/#contact"
            className="mt-5 inline-block border border-[var(--border-strong)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
          >
            Book Strategy Call
          </Link>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const postUrl = absoluteUrl(`/blog/${post.slug}`);
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        url: postUrl,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Organization",
          "@id": `${siteConfig.url}/#organization`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        publisher: { "@id": `${siteConfig.url}/#organization` },
        mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
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

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={articleSchema} />
      <Navbar />

      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
            <Link href="/" className="transition-opacity hover:opacity-50">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-opacity hover:opacity-50">
              Blog
            </Link>
            <span>/</span>
            <span className="text-[var(--muted-strong)]">{post.category}</span>
          </nav>

          {/* Article header */}
          <div className="mt-10 max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
              {post.category}
            </p>
            <h1 className="mt-4 font-mono text-[clamp(1.75rem,5vw,3.5rem)] font-light leading-[1.1]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--muted-soft)]">
              <span>{date}</span>
              <span>·</span>
              <span>{post.readingTime} min read</span>
              <span>·</span>
              <span>Avlys AI</span>
            </div>
            <p className="mt-8 text-lg leading-8 text-[var(--muted)]">{post.excerpt}</p>
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-[var(--border-subtle)]" />

          {/* Article body */}
          <div className="grid gap-0 lg:grid-cols-[1fr_280px] lg:gap-16">
            <article className="min-w-0">
              {post.content.map((block, i) => renderBlock(block, i))}
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-8">
                {/* Keywords */}
                <div className="border border-[var(--border-subtle)] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                    Topics
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="border border-[var(--border-subtle)] px-2 py-1 font-mono text-xs text-[var(--muted)]"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="border border-[var(--border-strong)] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                    Ready to automate?
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                    Book a 30-min strategy call. We'll identify your highest-ROI automation
                    opportunity.
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-5 inline-block w-full border border-[var(--border-strong)] px-4 py-2.5 text-center font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
                  >
                    Book Strategy Call
                  </Link>
                </div>

                {/* Services */}
                <div className="border border-[var(--border-subtle)] p-5">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                    Our Services
                  </p>
                  <div className="mt-4 space-y-2">
                    {[
                      "AI Calling Agents",
                      "WhatsApp Chatbots",
                      "Web Development",
                      "E-commerce Development",
                      "Landing Pages",
                      "Enterprise AI Agents",
                    ].map((service) => (
                      <Link
                        key={service}
                        href="/services"
                        className="block text-sm text-[var(--muted)] transition-opacity hover:opacity-50"
                      >
                        → {service}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 border border-[var(--border-strong)] p-6 lg:hidden">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
              Ready to automate?
            </p>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
              Book a 30-min strategy call. We'll identify your highest-ROI automation opportunity.
            </p>
            <Link
              href="/#contact"
              className="mt-5 inline-block border border-[var(--border-strong)] px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
            >
              Book Strategy Call
            </Link>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <div className="mt-20 border-t border-[var(--border-subtle)] pt-16">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Related Articles
              </p>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-soft)]">
                      {rel.category}
                    </p>
                    <h3 className="mt-4 text-lg font-light leading-snug">{rel.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{rel.excerpt}</p>
                    <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                      Read →
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog */}
          <div className="mt-16 border-t border-[var(--border-subtle)] pt-12">
            <Link
              href="/blog"
              className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)] transition-opacity hover:opacity-50"
            >
              ← All articles
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
