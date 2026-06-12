import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import StructuredData from "../../components/StructuredData";
import { blogPosts, getBlogPost, getRelatedPosts } from "../../data/blog";
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
      title: post.metaTitle,
      description: post.metaDescription,
      images: [absoluteUrl(imageUrl)],
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
  const related = getRelatedPosts(post.slug, 3);
  const relatedServices = post.relatedServiceSlugs
    .map((serviceSlug) => getServicePage(serviceSlug))
    .filter((service): service is NonNullable<typeof service> => Boolean(service));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        headline: post.title,
        description: post.metaDescription,
        author: {
          "@id": `${siteConfig.url}/#organization`,
        },
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
        mainEntityOfPage: postUrl,
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
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
          <div className="mx-auto w-full max-w-4xl pb-16">
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              <Link href="/blog" className="transition-opacity hover:opacity-50">
                Blog
              </Link>
              <span aria-hidden="true">/</span>
              <span>{post.category}</span>
              <span aria-hidden="true">/</span>
              <span>{post.readingTime}</span>
            </div>
            <h1 className="mt-4 font-mono text-[clamp(2.25rem,7vw,4.75rem)] font-light leading-[1.05]">
              {post.title}
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              {post.excerpt}
            </p>

            <div className="mt-10 border border-[var(--border-subtle)] bg-[var(--surface-subtle)] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Key Takeaways
              </p>
              <ul className="mt-6 grid gap-4">
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-4 text-sm leading-6 text-[var(--muted)]">
                    <span aria-hidden="true" className="text-[var(--muted-soft)]">
                      —
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 grid gap-5">
              {post.intro.map((paragraph, index) => (
                <p key={index} className="text-base leading-7 text-[var(--muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-4xl gap-12">
            {post.sections.map((section) => (
              <article key={section.heading}>
                <h2 className="text-2xl font-light leading-snug sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 grid gap-4">
                  {section.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-base leading-7 text-[var(--muted)]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list && section.list.length > 0 && (
                  <ul className="mt-5 grid gap-3 border-l border-[var(--border-subtle)] pl-6">
                    {section.list.map((item) => (
                      <li key={item} className="text-sm leading-6 text-[var(--muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto w-full max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
              Questions
            </p>
            <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
              Frequently asked questions.
            </h2>
            <div className="mt-10 grid border border-[var(--border-subtle)]">
              {post.faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className="grid gap-5 border-b border-[var(--border-subtle)] p-6 last:border-b-0 lg:grid-cols-[160px_1fr]"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-xl font-light">{faq.question}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedServices.length > 0 && (
          <section className="px-6 pb-20 sm:pb-28">
            <div className="mx-auto w-full max-w-4xl">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Related Services
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {relatedServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <h3 className="text-lg font-light leading-snug">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                      {service.metaDescription}
                    </p>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)] transition-opacity group-hover:opacity-50">
                      Open Service
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="px-6 pb-20 sm:pb-28">
            <div className="mx-auto w-full max-w-4xl">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                    Further Reading
                  </p>
                  <h2 className="mt-4 text-3xl font-light leading-tight sm:text-4xl">
                    More from the blog.
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="w-fit border border-[var(--border-strong)] px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[var(--surface-hover)]"
                >
                  View All Posts
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="group border border-[var(--border-subtle)] p-6 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-subtle)]"
                  >
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-soft)]">
                      {item.category}
                    </p>
                    <h3 className="mt-4 text-lg font-light leading-snug">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid w-full max-w-4xl gap-8 border border-[var(--border-strong)] bg-[var(--surface-subtle)] p-10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted-strong)]">
                Build With Avlys
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight sm:text-4xl">
                Want a system like this for your business?
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
