import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Pastor B — Teaching, Faith, and Spiritual Formation",
  description:
    "Benjamin Robinson (The Pastor B) teaches on identity in Christ, devotion, and spiritual growth through sermons, music, books, and resources.",
  metadataBase: new URL("https://www.thepastorb.com"),
  alternates: {
    canonical: "https://www.thepastorb.com",
  },
  openGraph: {
    title: "The Pastor B",
    description:
      "Teaching on identity in Christ, devotion, and spiritual growth through sermons, music, books, and resources.",
    url: "https://www.thepastorb.com",
    type: "website",
    images: [
      {
        url: "/images/og-hero.png",
        width: 1200,
        height: 425,
        alt: "Benjamin Robinson — Words. Music. Wisdom.",
      },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#111111",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Benjamin Robinson",
  alternateName: "The Pastor B",
  url: "https://www.thepastorb.com",
  sameAs: [
    "https://youtube.com/@thepastorb",
    "https://instagram.com/thepastorb",
    "https://open.spotify.com/artist/6TGMhfePhsRwof6b7odQEC",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
