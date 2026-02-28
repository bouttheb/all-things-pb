"use client";

import { useState } from "react";
import type { Story } from "@/types";
import StoryBubble from "./StoryBubble";
import StoryViewer from "./StoryViewer";

interface StoriesCarouselProps {
  stories: Story[];
}

export default function StoriesCarousel({ stories }: StoriesCarouselProps) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  if (stories.length === 0) return null;

  return (
    <>
      <div className="border-b border-[var(--color-border)]">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Stories
          </p>
          <div className="flex gap-5 overflow-x-auto hide-scrollbar">
            {stories.map((story, index) => (
              <StoryBubble
                key={story.id}
                story={story}
                onClick={() => setViewerIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {viewerIndex !== null && (
        <StoryViewer
          stories={stories}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  );
}
