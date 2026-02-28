"use client";

import { useState } from "react";
import type { Post } from "@/types";
import { PLATFORMS } from "@/lib/utils/platforms";
import { timeAgo } from "@/lib/utils/date";
import YouTubePlayer from "@/components/players/YouTubePlayer";
import SpotifyPlayer from "@/components/players/SpotifyPlayer";
import PodcastPlayer from "@/components/players/PodcastPlayer";
import InstagramEmbed from "@/components/players/InstagramEmbed";

function extractYouTubeId(embedUrl: string): string {
  const match = embedUrl.match(/embed\/([^?]+)/);
  return match?.[1] || "";
}

function PlatformLabel({ platform }: { platform: Post["platform"] }) {
  const config = PLATFORMS[platform];
  return (
    <span
      className="text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: config.color, fontFamily: "var(--font-heading)" }}
    >
      {config.name}
    </span>
  );
}

export default function FeedCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const metadata = post.metadata as Record<string, unknown>;

  const renderPlayer = () => {
    switch (post.platform) {
      case "youtube":
        return <YouTubePlayer videoId={extractYouTubeId(post.embed_url || "")} />;
      case "spotify":
        return (
          <SpotifyPlayer
            embedUrl={post.embed_url || ""}
            isAlbum={(metadata.type as string) === "album"}
          />
        );
      case "podcast":
        return (
          <PodcastPlayer
            audioUrl={(metadata.enclosure_url as string) || post.embed_url || ""}
            title={post.title || "Episode"}
            showTitle={(metadata.show_title as string) || undefined}
            imageUrl={(metadata.itunes_image as string) || post.thumbnail_url || undefined}
          />
        );
      case "instagram":
        return <InstagramEmbed permalink={post.content_url} />;
      default:
        return null;
    }
  };

  return (
    <article className="feed-card content-card rounded-sm overflow-hidden animate-fade-in-up">
      {/* Header row — platform + time */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <PlatformLabel platform={post.platform} />
        <span className="text-[10px] font-medium text-[var(--color-muted)] tracking-wide">
          {timeAgo(post.published_at)}
        </span>
      </div>

      {/* Thumbnail or player */}
      <div className="px-5">
        {expanded ? (
          <div className="mb-1">{renderPlayer()}</div>
        ) : post.thumbnail_url ? (
          <button
            onClick={() => setExpanded(true)}
            className="relative w-full aspect-video overflow-hidden bg-[var(--color-surface)] group"
          >
            <img
              src={post.thumbnail_url}
              alt={post.title || ""}
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
              loading="lazy"
            />
            {/* Play button overlay */}
            {(post.media_type === "video" ||
              post.media_type === "audio" ||
              post.media_type === "reel") && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="play-btn w-12 h-12 rounded-full flex items-center justify-center">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="var(--color-ink)"
                    className="ml-0.5"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </button>
        ) : (
          <button onClick={() => setExpanded(true)} className="w-full text-left">
            {renderPlayer()}
          </button>
        )}
      </div>

      {/* Title and description */}
      <div className="px-5 pt-3 pb-5">
        {post.title && (
          <h3 className="text-[14px] font-medium text-[var(--color-bone)] leading-snug line-clamp-2">
            {post.title}
          </h3>
        )}
        {post.description && (
          <p className="text-[12px] text-[var(--color-muted)] mt-1.5 line-clamp-2 leading-relaxed font-light">
            {post.description}
          </p>
        )}
      </div>
    </article>
  );
}
