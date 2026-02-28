export default function FeedSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="content-card rounded-sm overflow-hidden"
        >
          {/* Header skeleton */}
          <div className="flex items-center justify-between px-5 pt-4 pb-3">
            <div className="w-16 h-3 rounded-sm bg-[var(--color-surface)] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            <div className="w-12 h-3 rounded-sm bg-[var(--color-surface)] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
          {/* Thumbnail skeleton */}
          <div className="mx-5">
            <div className="w-full aspect-video bg-[var(--color-surface)] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
          {/* Text skeleton */}
          <div className="px-5 pt-3 pb-5 space-y-2">
            <div className="w-3/4 h-3.5 rounded-sm bg-[var(--color-surface)] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
            <div className="w-1/2 h-3 rounded-sm bg-[var(--color-surface)] relative overflow-hidden">
              <div className="absolute inset-0 animate-shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
