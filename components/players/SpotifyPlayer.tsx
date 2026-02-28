"use client";

interface SpotifyPlayerProps {
  embedUrl: string;
  isAlbum?: boolean;
}

export default function SpotifyPlayer({ embedUrl, isAlbum }: SpotifyPlayerProps) {
  return (
    <div className="w-full rounded-lg overflow-hidden">
      <iframe
        src={embedUrl}
        allow="encrypted-media"
        className="w-full border-0"
        style={{ height: isAlbum ? 380 : 80 }}
        loading="lazy"
      />
    </div>
  );
}
