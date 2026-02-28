"use client";

interface PodcastPlayerProps {
  audioUrl: string;
  title: string;
  showTitle?: string;
  imageUrl?: string;
}

export default function PodcastPlayer({
  audioUrl,
  title,
  showTitle,
  imageUrl,
}: PodcastPlayerProps) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-4 flex gap-4 items-start">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-14 h-14 rounded-sm object-cover shrink-0"
        />
      )}
      <div className="flex-1 min-w-0">
        {showTitle && (
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-podcast)] truncate"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {showTitle}
          </p>
        )}
        <p className="text-[13px] font-medium text-[var(--color-bone)] truncate mt-0.5">
          {title}
        </p>
        <audio controls preload="metadata" className="w-full mt-2.5 h-8">
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      </div>
    </div>
  );
}
