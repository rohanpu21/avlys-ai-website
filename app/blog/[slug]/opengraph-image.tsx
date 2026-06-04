import { ImageResponse } from "next/og";
import { getBlogPost } from "../../data/blogPosts";

export const runtime = "edge";
export const alt = "Avlys AI Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  const title = post?.title ?? "Avlys AI Blog";
  const category = post?.category ?? "Insights";
  const readingTime = post?.readingTime ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1f2228",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", gap: 24, alignItems: "center", color: "rgba(255,255,255,0.4)", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace" }}>
          <span>AVLYS AI · BLOG</span>
          <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
          <span>{category.toUpperCase()}</span>
          {readingTime && (
            <>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <span>{readingTime.toUpperCase()}</span>
            </>
          )}
        </div>
        <div style={{ color: "#ffffff", fontSize: 52, fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.01em", maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.3)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>
          AVLYSAI.COM
        </div>
      </div>
    ),
    size,
  );
}
