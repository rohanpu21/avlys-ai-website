import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "../../data/blog";

export const alt = "Avlys AI blog post";
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

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

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
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 7 }}>
          <div style={{ display: "flex" }}>AVLYS AI</div>
          <div style={{ display: "flex" }}>{(post?.category ?? "BLOG").toUpperCase()}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            {post?.title ?? "Avlys AI Blog"}
          </div>
          <div style={{ display: "flex", marginTop: 28, maxWidth: 800, color: "rgba(255,255,255,0.72)", fontSize: 25, lineHeight: 1.45 }}>
            {post?.excerpt ?? "Avlys AI blog"}
          </div>
        </div>
      </div>
    ),
    size
  );
}
