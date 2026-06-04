import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Avlys AI Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
        <div style={{ display: "flex", color: "rgba(255,255,255,0.4)", fontSize: 14, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "monospace" }}>
          AVLYS AI · BLOG
        </div>
        <div>
          <div style={{ color: "#ffffff", fontSize: 72, fontWeight: 300, lineHeight: 1, letterSpacing: "-0.02em", maxWidth: 900 }}>
            Insights from the AI frontier.
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 22, marginTop: 28, maxWidth: 720, lineHeight: 1.6 }}>
            Agentic AI · Enterprise Agents · Web Development · E-Commerce · Deep Tech AI · Landing Page Design
          </div>
        </div>
        <div style={{ display: "flex", color: "rgba(255,255,255,0.3)", fontSize: 13, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "monospace" }}>
          AVLYSAI.COM
        </div>
      </div>
    ),
    size,
  );
}
