"use client";

import { useEffect } from "react";

interface InstagramEmbedProps {
  permalink: string;
}

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

export default function InstagramEmbed({ permalink }: InstagramEmbedProps) {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      window.instgrm?.Embeds.process();
    }
  }, [permalink]);

  return (
    <div className="w-full flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={permalink}
        style={{
          maxWidth: "100%",
          width: "100%",
          minWidth: 280,
          background: "#0a0a0a",
          border: 0,
          borderRadius: 12,
        }}
      />
    </div>
  );
}
