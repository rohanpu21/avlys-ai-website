import type { Metadata } from "next";
import BlogClient from "../components/BlogClient";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StructuredData from "../components/StructuredData";
import { blogPosts } from "../data/blog";
import { absoluteUrl, siteConfig } from "../lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Blog | Avlys AI",
  },
  description:
    "Guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from Avlys AI.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    url: absoluteUrl("/blog"),
    title: "Blog | Avlys AI",
    description:
      "Guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from Avlys AI.",
    images: [
      {
        url: absoluteUrl("/blog/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "Avlys AI blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Avlys AI",
    description:
      "Guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents from Avlys AI.",
    images: [absoluteUrl("/blog/opengraph-image")],
  },
};

const blogUrl = absoluteUrl("/blog");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${blogUrl}#webpage`,
      url: blogUrl,
      name: "Avlys AI Blog",
      description:
        "Guides on web development, e-commerce development, agentic AI apps, deep tech AI software, landing page design, and enterprise AI agents.",
      isPartOf: {
        "@id": `${siteConfig.url}/#website`,
      },
      inLanguage: "en-IN",
    },
    {
      "@type": "Blog",
      "@id": `${blogUrl}#blog`,
      name: "Avlys AI Blog",
      url: blogUrl,
      publisher: {
        "@id": `${siteConfig.url}/#organization`,
      },
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: absoluteUrl(`/blog/${post.slug}`),
        datePublished: post.publishedAt,
      })),
    },
  ],
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <StructuredData data={structuredData} />
      <Navbar />
      <main className="px-6 py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl">
          <BlogClient />
        </div>
      </main>
      <Footer />
    </div>
  );
}
