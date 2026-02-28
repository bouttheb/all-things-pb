"use client";

import type { Story } from "@/types";
import { timeAgo } from "@/lib/utils/date";

interface StoryBubbleProps {
  story: Story;
  onClick: () => void;
}

export default function StoryBubble({ story, onClick }: StoryBubbleProps) {
  const thumbnail = story.thumbnail_url || story.media_url;

  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 shrink-0 group">
      <div className="story-ring">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-surface)] border-2 border-[var(--color-ink)]">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt="Story"
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)]">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth={1.5}>
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <span
        className="text-[9px] uppercase tracking-[0.1em] text-[var(--color-muted)] group-hover:text-[var(--color-bone)] transition-colors"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {timeAgo(story.published_at)}
      </span>
    </button>
  );
}
