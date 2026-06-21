import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "../../data/blogPosts";

export const alt = "Avlys AI Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1f2228",
            color: "#ffffff",
            fontSize: 48,
            fontFamily: "monospace",
          }}
        >
          Avlys AI Blog
        </div>
      ),
      size,
    );
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
          backgroundColor: "#1f2228",
          color: "#ffffff",
          padding: "64px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {post.category}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 300,
              lineHeight: 1.15,
              maxWidth: "900px",
            }}
          >
            {post.title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
            }}
          >
            Avlys AI
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: "monospace",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            avlysai.com/blog
          </div>
        </div>
      </div>
    ),
    size,
  );
}
