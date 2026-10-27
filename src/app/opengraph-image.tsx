import { ImageResponse } from "next/og";

export const alt = "מכון מקור חכמה — סופר סת״ם מוסמך · אלעד";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dedicated OG 1200×630 — Quiet Luxury parchment + gold rule + brand. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#F7F4EF",
          color: "#1A1814",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 22,
            letterSpacing: "0.12em",
            color: "#6B6560",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 36,
              height: 2,
              background: "#C9A962",
            }}
          />
          אלעד · סופר סת״ם
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: 900,
            }}
          >
            מכון מקור חכמה
          </div>
          <div
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#6B6560",
              maxWidth: 820,
            }}
          >
            32 שנות כתיבה · משמרת סת״ם · יד רפאל — שיחה ואז פגישה באלעד
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #E4DFD6",
            paddingTop: 28,
            fontSize: 20,
            color: "#6B6560",
          }}
        >
          <span>makor-chochma.vercel.app</span>
          <span style={{ color: "#C9A962", fontWeight: 600 }}>שיחת ייעוץ בלי התחייבות</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
