import { ImageResponse } from "next/og";
import { caseStudies } from "../data/caseStudies";

export const alt = "Avlys AI case studies";
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
          background: "#1f2228",
          color: "#ffffff",
          padding: "56px",
          fontFamily: "Arial",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, letterSpacing: 7 }}>
          <div style={{ display: "flex" }}>AVLYS AI</div>
          <div style={{ display: "flex" }}>{`${caseStudies.length} CASE STUDIES`}</div>
        </div>
        <div style={{ display: "flex", gap: 42, alignItems: "flex-end" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 86, lineHeight: 0.95, letterSpacing: -2 }}>
              Proof from shipped systems.
            </div>
            <div style={{ display: "flex", marginTop: 28, maxWidth: 680, color: "rgba(255,255,255,0.72)", fontSize: 25, lineHeight: 1.45 }}>
              AI calling agents, WhatsApp automation, marketplaces, ecommerce builds, websites, and agentic systems.
            </div>
          </div>
          <div style={{ width: 345, display: "flex", flexDirection: "column", gap: 14 }}>
            {caseStudies.slice(0, 4).map((item, index) => (
              <div
                key={item.slug}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: 18,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.035)",
                }}
              >
                <div style={{ display: "flex", color: "rgba(255,255,255,0.45)", fontSize: 17 }}>
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div style={{ display: "flex", fontSize: 18, lineHeight: 1.25 }}>{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size
  );
}
