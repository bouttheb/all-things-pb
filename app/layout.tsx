import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Robinson — Words. Music. Wisdom.",
  description:
    "Pastor, recording artist, author, and content creator. Sermons, music, books, and resources for growing in Christ.",
  openGraph: {
    title: "Benjamin Robinson — Words. Music. Wisdom.",
    description:
      "Pastor, recording artist, author, and content creator. Sermons, music, books, and resources for growing in Christ.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
