import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost } from "../../data/blog";
import { getCaseStudy } from "../../data/caseStudies";
import { getServicePage } from "../../data/services";
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
  const imageUrl = `${path}/opengraph-image`;

  return {
    title: {
      absolute: `${post.title} | Avlys AI`,
    },
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: absoluteUrl(path),
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: [
        {
          url: absoluteUrl(imageUrl),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [absoluteUrl(imageUrl)],
    },
  };
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
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
  const relatedCaseStudy = post.relatedCaseStudySlug
    ? getCaseStudy(post.relatedCaseStudySlug)
    : undefined;
  const relatedService = post.relatedServiceSlug
    ? getServicePage(post.relatedServiceSlug)
    : undefined;

  const morePosts = blogPosts
    .filter((item) => item.slug !== post.slug)
    .filter((item) => item.category === post.category)
    .slice(0, 3);

  const fallbackMorePosts =
    morePosts.length > 0
      ? morePosts
      : blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        image: `${postUrl}/opengraph-image`,
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
      {
        "@type": "FAQPage",
        "@id": `${postUrl}#faq`,
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="px-6 pt-20 sm:pt-28">
          <div className="mx-auto w-full max-w-3xl pb-16">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              {post.category}
            </p>
            <h1 className="mt-4 font-mono text-[clamp(2.25rem,7vw,4.5rem)] font-light leading-[1.05]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              <span>{formatDate(post.date)}</span>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime}</span>
            </div>
            <div className="mt-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Quick Answer
              </p>
              <p className="mt-4 text-base leading-7 text-[var(--foreground)]">
                {post.quickAnswer}
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto w-full max-w-3xl">
            <div className="grid gap-6 text-base leading-7 text-[var(--muted)]">
              {post.intro.map((paragraph, index) => (
                <p key={`intro-${index}`}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-14 grid gap-14">
              {post.sections.map((section) => (
                <article key={section.heading}>
                  <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="mt-5 grid gap-5 text-base leading-7 text-[var(--muted)]">
                    {section.paragraphs.map((paragraph, index) => (
                      <p key={`${section.heading}-${index}`}>{paragraph}</p>
                    ))}
                  </div>
                  {section.list && (
                    <div className="mt-6 border border-[var(--border-subtle)]">
                      {section.listTitle && (
                        <p className="border-b border-[var(--border-subtle)] p-4 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                          {section.listTitle}
                        </p>
                      )}
                      {section.list.map((item, index) => (
                        <div
                          key={item}
                          className="grid gap-4 border-b border-[var(--border-subtle)] p-4 last:border-b-0 sm:grid-cols-[60px_1fr] sm:p-5"
                        >
                          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                            {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="text-sm leading-6 text-[var(--muted)]">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              FAQ
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
            <div className="mt-10 grid border border-[var(--border-subtle)]">
              {post.faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="border-b border-[var(--border-subtle)] p-6 last:border-b-0"
                >
                  <p className="text-lg font-light leading-snug">{faq.question}</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {(relatedCaseStudy || relatedService) && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-3xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Related
              </p>
              <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                See how this works in practice.
              </h2>
              <div className="mt-10 grid gap-6 sm:grid-cols-2">
                {relatedCaseStudy && (
                  <Link
                    href={`/case-studies/${relatedCaseStudy.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Case Study
                    </p>
                    <h3 className="mt-4 text-xl font-light leading-snug">
                      {relatedCaseStudy.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {relatedCaseStudy.headline}
                    </p>
                  </Link>
                )}
                {relatedService && (
                  <Link
                    href={`/services/${relatedService.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      Service
                    </p>
                    <h3 className="mt-4 text-xl font-light leading-snug">
                      {relatedService.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {relatedService.description}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {fallbackMorePosts.length > 0 && (
          <section className="px-6 py-20 sm:py-28">
            <div className="mx-auto w-full max-w-6xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    More Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More from the Avlys AI blog.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Posts
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {fallbackMorePosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </p>
                    <h3 className="mt-4 text-lg font-light leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {item.description}
                    </p>
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
                Want this built for your business?
              </h2>
            </div>
            <Link
              href="/#contact"
              className="w-fit bg-[var(--foreground)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Book a Strategy Call
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
