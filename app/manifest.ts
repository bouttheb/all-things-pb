import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "All Things PB",
    short_name: "All Things PB",
    description:
      "Spiritual formation, financial intelligence, and creative excellence — all in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1A2A",
    theme_color: "#0B1A2A",
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
