import type { Metadata } from "next";
import Link from "next/link";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical guides on AI integration, custom software costs, AI agents, and pilots - written for CTOs and operators at enterprise and mid-market companies.",
  alternates: {
    canonical: "/blog",
  },
};

const blogUrl = absoluteUrl("/blog");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${blogUrl}#webpage`,
  url: blogUrl,
  name: "Insights - Avlys AI",
  isPartOf: {
    "@id": `${siteConfig.url}/#website`,
  },
  inLanguage: "en-US",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StructuredData data={structuredData} />
      <Navbar />
      <main>
        <section className="bg-canvas px-6 pb-16 pt-20 sm:pt-24">
          <div className="mx-auto w-full max-w-4xl text-center">
            <h1 className="type-hero text-ink">Insights.</h1>
            <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-muted">
              Practical guides on AI integration, software costs, and pilots -
              written for the people who have to make the build decision.
            </p>
          </div>
        </section>
        <section className="bg-parchment px-6 py-16">
          <div className="mx-auto w-full max-w-4xl">
            {posts.length === 0 ? (
              <p className="text-center text-[17px] text-ink-muted">
                First guides are on the way.
              </p>
            ) : (
              <div className="flex flex-col gap-5">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="rounded-[18px] border border-hairline bg-canvas p-7 transition-colors hover:border-ink-faint"
                  >
                    <p className="type-caption text-ink-faint">
                      {formatDate(post.publishedDate)}
                    </p>
                    <h2 className="mt-2 text-[21px] font-semibold leading-snug text-ink">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-block text-[15px] text-primary">
                      Read &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
