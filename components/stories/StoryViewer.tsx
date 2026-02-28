"use client";

import { useState, useEffect, useCallback } from "react";
import type { Story } from "@/types";

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
}

export default function StoryViewer({
  stories,
  initialIndex,
  onClose,
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const story = stories[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((i) => i + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  // Auto-advance timer for images (5 seconds)
  useEffect(() => {
    if (story.media_type !== "IMAGE") return;

    const duration = 5000;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);
      if (elapsed >= duration) {
        goNext();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, story.media_type, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, onClose]);

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) {
      goPrev();
    } else {
      goNext();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-100"
              style={{
                width:
                  i < currentIndex
                    ? "100%"
                    : i === currentIndex
                      ? `${progress}%`
                      : "0%",
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-8 right-4 z-10 text-white text-2xl w-8 h-8 flex items-center justify-center"
      >
        &times;
      </button>

      {/* Story content */}
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onClick={handleTap}
      >
        {story.media_type === "VIDEO" ? (
          <video
            key={story.id}
            src={story.media_url}
            autoPlay
            playsInline
            className="max-w-full max-h-full object-contain"
            onEnded={goNext}
            onTimeUpdate={(e) => {
              const video = e.currentTarget;
              if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
              }
            }}
          />
        ) : (
          <img
            key={story.id}
            src={story.media_url}
            alt="Story"
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
