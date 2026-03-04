import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 96,
          background: "#111111",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F5F5F5",
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          letterSpacing: "-2px",
          borderRadius: 24,
        }}
      >
        PB
      </div>
    ),
    {
      ...size,
    }
  );
}
