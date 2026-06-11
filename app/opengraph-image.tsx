import { ImageResponse } from "next/og";

export const alt = "Avlys AI - Enterprise AI Development & Custom Software";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#1d1d1f",
          padding: "64px",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex" }}>Avlys AI</div>
          <div style={{ display: "flex", color: "#7a7a7a", fontSize: 18 }}>
            avlysai.com
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            Custom software and AI, built into the systems you already run.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              color: "#333333",
              fontSize: 27,
              lineHeight: 1.4,
              maxWidth: 880,
            }}
          >
            Fixed-scope pilots in 4-6 weeks. Senior engineers on every call.
            US + India delivery.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#0066cc",
              color: "#ffffff",
              borderRadius: 9999,
              padding: "16px 34px",
              fontSize: 24,
            }}
          >
            Book a strategy call
          </div>
          <div style={{ display: "flex", color: "#7a7a7a", fontSize: 20 }}>
            AI Integration · Custom Software · AI Agents
          </div>
        </div>
      </div>
    ),
    size
  );
}
