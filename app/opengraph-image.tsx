/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Benjamin Robinson — Words. Music. Wisdom.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const photoPath = join(
    process.cwd(),
    "public/images/benjamin-no-bg.png"
  );
  const photoData = await readFile(photoPath);
  const photoBase64 = `data:image/png;base64,${photoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#111111",
          overflow: "hidden",
        }}
      >
        {/* Photo centered at top */}
        <img
          src={photoBase64}
          alt=""
          width={340}
          height={380}
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            marginTop: 20,
          }}
        />

        {/* Name overlapping the photo bottom */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontFamily: "Georgia, serif",
            marginTop: -50,
            textAlign: "center",
          }}
        >
          Benjamin Robinson
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: "#999999",
            letterSpacing: "0.04em",
            fontWeight: 300,
            marginTop: 16,
            fontFamily: "Georgia, serif",
          }}
        >
          Words. Music. Wisdom.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
