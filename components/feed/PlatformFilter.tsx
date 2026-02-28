"use client";

import type { Platform } from "@/types";
import { PLATFORM_LIST } from "@/lib/utils/platforms";

interface PlatformFilterProps {
  selected: Platform | "all";
  onChange: (platform: Platform | "all") => void;
}

const PLATFORM_LABELS: Record<string, string> = {
  youtube: "YOUTUBE",
  instagram: "INSTAGRAM",
  podcast: "PODCASTS",
  spotify: "MUSIC",
};

export default function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="sticky top-0 z-40 bg-[var(--color-ink)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar py-4">
          {/* All button */}
          <button
            onClick={() => onChange("all")}
            className={`filter-pill shrink-0 px-5 py-2 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase transition-all ${
              selected === "all" ? "active" : "text-[var(--color-muted)]"
            }`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All
          </button>

          {/* Platform pills */}
          {PLATFORM_LIST.map((platform) => {
            const label = PLATFORM_LABELS[platform];
            if (!label) return null;
            return (
              <button
                key={platform}
                onClick={() => onChange(platform)}
                className={`filter-pill shrink-0 px-5 py-2 rounded-sm text-[11px] font-semibold tracking-[0.12em] uppercase transition-all ${
                  selected === platform ? "active" : "text-[var(--color-muted)]"
                }`}
                style={{ fontFamily: "var(--font-heading)" }}
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
