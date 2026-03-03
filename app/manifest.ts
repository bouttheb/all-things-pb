import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Benjamin Robinson",
    short_name: "BR",
    description:
      "Pastor, recording artist, author. Sermons, music, books, and resources for growing in Christ.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F5",
    theme_color: "#111111",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
