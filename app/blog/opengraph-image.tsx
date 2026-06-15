import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const ink = "#ffffff";
const bg = "#1f2228";
const muted = "rgba(255,255,255,0.66)";
const border = "1px solid rgba(255,255,255,0.14)";

export default async function Image() {
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
            Blog
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 920 }}>
          <div style={{ display: "flex", fontSize: 66, lineHeight: 1.08, fontWeight: 300 }}>
            Notes on building AI-ready businesses.
          </div>
          <div style={{ display: "flex", fontSize: 24, lineHeight: 1.4, color: muted }}>
            Web development, e-commerce, agentic AI, deep tech AI software, landing pages, and AI agents for enterprises.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: muted, fontSize: 18 }}>
          <div style={{ display: "flex" }}>avlysai.com</div>
          <div style={{ display: "flex" }}>AI Automation Agency</div>
        </div>
      </div>
    ),
    size
  );
}
