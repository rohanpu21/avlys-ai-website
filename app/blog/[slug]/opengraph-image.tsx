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

const ink = "#ffffff";
const bg = "#1f2228";
const muted = "rgba(255,255,255,0.66)";
const soft = "rgba(255,255,255,0.42)";
const border = "1px solid rgba(255,255,255,0.14)";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

const headlineSize = (title: string) => {
  if (title.length > 90) return 44;
  if (title.length > 70) return 52;
  if (title.length > 50) return 60;
  return 68;
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
          background: bg,
          color: ink,
          padding: "48px 56px",
          fontFamily: "Arial",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 7 }}>AVLYS AI</div>
          <div
            style={{
              display: "flex",
              padding: "8px 14px",
              border,
              fontSize: 16,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: muted,
            }}
          >
            {post.category}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1040 }}>
          <div style={{ display: "flex", fontSize: headlineSize(post.title), lineHeight: 1.08, fontWeight: 300 }}>
            {post.title}
          </div>
          <div style={{ display: "flex", fontSize: 22, lineHeight: 1.4, color: muted, maxWidth: 880 }}>
            {post.description}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: soft, fontSize: 18 }}>
          <div style={{ display: "flex" }}>avlysai.com/blog</div>
          <div style={{ display: "flex" }}>{post.readingTime}</div>
        </div>
      </div>
    ),
    size
  );
}
