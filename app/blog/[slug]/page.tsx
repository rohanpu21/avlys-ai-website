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

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inTable = false;
  let tableRows: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ");
      if (text.trim()) {
        elements.push(
          <p
            key={`p-${elements.length}`}
            className="text-sm leading-7 text-[var(--muted)]"
          >
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushTable = () => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(2);
      const headers = headerRow
        .split("|")
        .map((h) => h.trim())
        .filter(Boolean);

      elements.push(
        <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[var(--border-strong)]">
                {headers.map((header, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.15em] text-[var(--foreground)]"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIndex) => {
                const cells = row
                  .split("|")
                  .map((c) => c.trim())
                  .filter(Boolean);
                return (
                  <tr
                    key={rowIndex}
                    className="border-b border-[var(--border-subtle)]"
                  >
                    {cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-[var(--muted)]"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith("## ")) {
      flushParagraph();
      flushTable();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="mt-12 mb-4 font-mono text-xl font-normal tracking-tight"
        >
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushParagraph();
      flushTable();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="mt-8 mb-3 font-mono text-base font-normal tracking-tight"
        >
          {line.replace("### ", "")}
        </h3>
      );
    } else if (line.startsWith("- **") || line.startsWith("- ")) {
      flushParagraph();
      flushTable();
      const text = line.replace(/^- /, "");
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <div
          key={`li-${elements.length}`}
          className="flex gap-3 py-1 pl-2 text-sm leading-7 text-[var(--muted)]"
        >
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-[var(--muted-strong)]" />
          <span>
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="font-medium text-[var(--foreground)]">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                part
              )
            )}
          </span>
        </div>
      );
    } else if (/^\d+\. /.test(line)) {
      flushParagraph();
      flushTable();
      const text = line.replace(/^\d+\. /, "");
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      elements.push(
        <div
          key={`ol-${elements.length}`}
          className="flex gap-3 py-1 pl-2 text-sm leading-7 text-[var(--muted)]"
        >
          <span className="shrink-0 font-mono text-xs text-[var(--muted-strong)]">
            {line.match(/^(\d+)\./)?.[1]}.
          </span>
          <span>
            {parts.map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={i} className="font-medium text-[var(--foreground)]">
                  {part.replace(/\*\*/g, "")}
                </strong>
              ) : (
                part
              )
            )}
          </span>
        </div>
      );
    } else if (line.startsWith("|") && !inTable) {
      flushParagraph();
      inTable = true;
      tableRows.push(line);
    } else if (line.startsWith("|") && inTable) {
      tableRows.push(line);
    } else if (!line.startsWith("|") && inTable) {
      flushTable();
      if (line.trim()) {
        currentParagraph.push(line);
      } else {
        flushParagraph();
      }
    } else if (line.trim() === "") {
      flushParagraph();
    } else {
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  flushTable();

  return elements;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const path = `/blog/${post.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/avlys-icon-512.png"),
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    url: absoluteUrl(path),
    keywords: post.keywords.join(", "),
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        item: absoluteUrl(path),
      },
    ],
  };

  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <nav className="mb-12">
          <Link
            href="/blog"
            className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)] transition-opacity hover:opacity-50"
          >
            &larr; All Posts
          </Link>
        </nav>

        <header className="mb-12">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
              {post.category}
            </span>
            <span className="text-[var(--muted-soft)]">/</span>
            <span className="font-mono text-xs tracking-wide text-[var(--muted-strong)]">
              {post.readingTime}
            </span>
          </div>
          <h1 className="mt-6 font-mono text-2xl font-normal leading-tight tracking-tight md:text-3xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-[var(--muted-strong)]">
            <span>{post.author}</span>
            <span className="text-[var(--muted-soft)]">/</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </div>
        </header>

        <article className="space-y-4">{renderContent(post.content)}</article>

        <div className="mt-16 border-t border-[var(--border-subtle)] pt-12">
          <Link
            href="/#contact"
            className="inline-block border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] transition-colors hover:bg-[var(--surface-hover)]"
          >
            Book Strategy Call
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div className="mt-16 border-t border-[var(--border-subtle)] pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted-strong)]">
              Related Posts
            </p>
            <div className="mt-6 grid gap-0">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group border-b border-[var(--border-subtle)] py-6 transition-colors first:border-t hover:bg-[var(--surface-subtle)]"
                >
                  <div className="px-2">
                    <span className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--muted-strong)]">
                      {related.category}
                    </span>
                    <h3 className="mt-2 font-mono text-sm font-normal tracking-tight transition-opacity group-hover:opacity-70">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
