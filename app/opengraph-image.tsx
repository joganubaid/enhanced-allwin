import { ImageResponse } from "next/og";

// Static, deterministic OG image — no time/random APIs. Auto-wires OG + Twitter previews.
export const runtime = "nodejs";

export const alt = "Allwin Marbles — Premium Makrana Marble Since 1985";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "90px",
          background: "linear-gradient(135deg, #15181C 0%, #1E2A38 60%, #2C5070 100%)",
          color: "#ECEEF1",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6F9FC2",
            marginBottom: 28,
          }}
        >
          Allwin Marbles
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Premium Makrana Marble Since 1985
        </div>
        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 4,
            background: "#3E6E96",
          }}
        />
        <div
          style={{
            marginTop: 32,
            fontSize: 26,
            color: "#B8C4D0",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Marble · Granite · Handicrafts · Export
        </div>
      </div>
    ),
    { ...size }
  );
}
