import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Pastor B — Teaching, Faith, and Spiritual Formation",
  description:
    "Benjamin Robinson (The Pastor B) teaches on identity in Christ, devotion, and spiritual growth through sermons, music, books, and resources.",
  metadataBase: new URL("https://www.thepastorb.com"),
  alternates: {
    canonical: "https://www.thepastorb.com",
  },
  verification: {
    google: "u7waQ3PWFHNOg0bpSpxu5GSY85piDb8K8QRJueDFKkE",
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
      <head>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '679336948573529');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=679336948573529&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-963948091"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-963948091');
          `}
        </Script>
      </head>
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
