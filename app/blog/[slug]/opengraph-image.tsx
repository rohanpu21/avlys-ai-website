import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "../../data/blog";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type ImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const headlineSize = (title: string) => {
  if (title.length > 70) return 44;
  if (title.length > 55) return 52;
  return 60;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1f2228",
          color: "#ffffff",
          padding: "56px",
          fontFamily: "Arial",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 17, letterSpacing: 6 }}>
          <div style={{ display: "flex" }}>AVLYS AI</div>
          <div
            style={{
              display: "flex",
              padding: "8px 14px",
              border: "1px solid rgba(255,255,255,0.22)",
              fontSize: 15,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {post.category}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: headlineSize(post.title),
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {post.title}
          </div>
          <div style={{ display: "flex", maxWidth: 780, color: "rgba(255,255,255,0.68)", fontSize: 24, lineHeight: 1.4 }}>
            {post.excerpt}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.42)", fontSize: 18 }}>
          <div style={{ display: "flex" }}>{post.readingTime}</div>
          <div style={{ display: "flex" }}>avlysai.com/blog</div>
        </div>
      </div>
    ),
    size
  );
}
