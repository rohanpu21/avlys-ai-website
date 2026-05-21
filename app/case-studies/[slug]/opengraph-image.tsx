import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "../../data/caseStudies";

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
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

const visualPatternByKind = {
  website: ["Website", "SEO", "Lead Capture"],
  commerce: ["Catalog", "Checkout", "Trust"],
  marketplace: ["Client", "Vendor", "Admin"],
  "ai-system": ["Agents", "RAG", "HITL"],
  "voice-agent": ["Call", "Qualify", "WhatsApp"],
  automation: ["Capture", "Score", "Route"],
  maintenance: ["Backup", "Patch", "Report"],
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const pattern = visualPatternByKind[caseStudy.visualKind];

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
          padding: "48px",
          fontFamily: "Arial",
          border: "1px solid rgba(255,255,255,0.16)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17, letterSpacing: 7 }}>
          <div style={{ display: "flex" }}>AVLYS AI</div>
          <div style={{ display: "flex" }}>CASE STUDY</div>
        </div>
        <div style={{ display: "flex", gap: 44, alignItems: "stretch" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", color: "rgba(255,255,255,0.55)", fontSize: 18, letterSpacing: 6, marginBottom: 24 }}>
              {caseStudy.category.toUpperCase()}
            </div>
            <div style={{ display: "flex", fontSize: 72, lineHeight: 0.96, letterSpacing: -1 }}>
              {caseStudy.title}
            </div>
            <div style={{ display: "flex", marginTop: 26, maxWidth: 690, color: "rgba(255,255,255,0.72)", fontSize: 24, lineHeight: 1.38 }}>
              {caseStudy.headline}
            </div>
          </div>
          <div
            style={{
              width: 380,
              height: 360,
              display: "flex",
              flexDirection: "column",
              border: "1px solid rgba(255,255,255,0.16)",
              background: "rgba(255,255,255,0.035)",
            }}
          >
            <div style={{ display: "flex", gap: 8, padding: 18, borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
              <div style={{ width: 9, height: 9, background: "rgba(255,255,255,0.34)" }} />
              <div style={{ width: 9, height: 9, background: "rgba(255,255,255,0.22)" }} />
              <div style={{ width: 9, height: 9, background: "rgba(255,255,255,0.14)" }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 18, padding: 24 }}>
              {pattern.map((label, index) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      background: index === 1 ? "#ffffff" : "rgba(255,255,255,0.18)",
                    }}
                  />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", color: "rgba(255,255,255,0.86)", fontSize: 18 }}>{label}</div>
                    <div style={{ height: 8, width: "100%", background: "rgba(255,255,255,0.18)" }} />
                    <div style={{ height: 8, width: index === 2 ? "55%" : "76%", background: "rgba(255,255,255,0.12)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(255,255,255,0.56)", fontSize: 18 }}>
          <div style={{ display: "flex" }}>{caseStudy.type}</div>
          <div style={{ display: "flex" }}>{caseStudy.market}</div>
        </div>
      </div>
    ),
    size
  );
}
