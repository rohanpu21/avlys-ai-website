import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CallToAction from "../../components/CallToAction";
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
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate ?? post.publishedDate,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.publishedDate,
        dateModified: post.updatedDate ?? post.publishedDate,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        inLanguage: "en-US",
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
            name: "Insights",
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
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <article className="px-6 pb-16 pt-20 sm:pt-24">
          <header className="mx-auto w-full max-w-3xl text-center">
            <p className="type-caption text-ink-faint">
              {formatDate(post.publishedDate)}
              {post.updatedDate && ` · Updated ${formatDate(post.updatedDate)}`}
            </p>
            <h1 className="type-display-lg mt-4 text-ink">{post.title}</h1>
            <p className="type-lead-airy mt-5 text-ink-muted">{post.excerpt}</p>
          </header>
          <div className="prose-avlys mx-auto mt-12 w-full max-w-3xl">
            <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
          </div>
          {post.sources && post.sources.length > 0 && (
            <footer className="mx-auto mt-12 w-full max-w-3xl rounded-[18px] border border-hairline bg-parchment p-6">
              <p className="type-caption-strong text-ink">Sources</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {post.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="type-caption text-primary transition-opacity hover:opacity-70"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </footer>
          )}
          <div className="mx-auto mt-10 w-full max-w-3xl text-center">
            <Link
              href="/blog"
              className="text-[15px] text-primary transition-opacity hover:opacity-70"
            >
              &larr; All insights
            </Link>
          </div>
        </article>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
