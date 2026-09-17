import { ImageResponse } from "next/og";

import { copy, profile } from "@/content/site";

export const alt = `${profile.name} — Machine Learning Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card: name and subtitle on the dark background, over a single orange
 * court line. Generated at build time, so there is no image file to keep in
 * sync with the content.
 */
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
          backgroundColor: "#0B0B0B",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Court line across the lower third. */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 160,
            height: 3,
            backgroundColor: "#FF6B00",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 80,
            bottom: 100,
            width: 3,
            height: 120,
            backgroundColor: "#FF6B00",
            opacity: 0.35,
          }}
        />

        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            color: "#F8F8F8",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#FF8C42",
            letterSpacing: "0.06em",
          }}
        >
          {copy.hero.subtitle}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 26,
            color: "#9CA3AF",
            maxWidth: 880,
          }}
        >
          {copy.hero.tagline}
        </div>
      </div>
    ),
    size,
  );
}
