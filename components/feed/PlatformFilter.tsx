"use client";

import type { Platform } from "@/types";
import { PLATFORM_LIST } from "@/lib/utils/platforms";

interface PlatformFilterProps {
  selected: Platform | "all";
  onChange: (platform: Platform | "all") => void;
}

const PLATFORM_LABELS: Record<string, string> = {
  youtube: "VIDEOS",
  instagram: "SOCIAL MEDIA",
  podcast: "PODCASTS",
  spotify: "MUSIC",
};

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="sticky top-0 z-40 bg-[var(--color-cream)]/95 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-2.5 overflow-x-auto hide-scrollbar py-4">
          {/* All button */}
          <button
            onClick={() => onChange("all")}
            className={`filter-pill shrink-0 px-5 py-2 text-[0.76rem] font-medium tracking-[0.05em] uppercase transition-all ${
              selected === "all" ? "active" : "text-[var(--color-ink)]"
            }`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            All
          </button>

          {/* Platform buttons */}
          {PLATFORM_LIST.map((platform) => {
            const label = PLATFORM_LABELS[platform];
            if (!label) return null;
            return (
              <button
                key={platform}
                onClick={() => onChange(platform)}
                className={`filter-pill shrink-0 px-5 py-2 text-[0.76rem] font-medium tracking-[0.05em] uppercase transition-all ${
                  selected === platform ? "active" : "text-[var(--color-ink)]"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
