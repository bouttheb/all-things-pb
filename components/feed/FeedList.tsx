"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Post, Platform, FeedResponse } from "@/types";
import FeedCard from "./FeedCard";
import PlatformFilter from "./PlatformFilter";
import FeedSkeleton from "./FeedSkeleton";

interface FeedListProps {
  initialPosts: Post[];
  initialCursor: string | null;
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 px-6">
      {/* Gold accent line */}
      <div className="w-8 h-[1px] bg-[var(--color-gold)] mb-8" style={{ opacity: 0.5 }} />

      <h3
        className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-bone)] mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Coming Soon
      </h3>
      <p className="text-[13px] text-[var(--color-slate)] text-center max-w-xs leading-relaxed font-light">
        Fresh content is on the way.
      </p>
    </div>
  );
}

export default function FeedList({ initialPosts, initialCursor }: FeedListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [nextCursor, setNextCursor] = useState<string | null>(initialCursor);
  const [hasMore, setHasMore] = useState(initialCursor !== null);
  const [loading, setLoading] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | "all">("all");
  const sentinelRef = useRef<HTMLDivElement>(null);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const params = new URLSearchParams();
    if (nextCursor) params.set("cursor", nextCursor);
    if (selectedPlatform !== "all") params.set("platform", selectedPlatform);

    try {
      const res = await fetch(`/api/feed?${params}`);
      const data: FeedResponse = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {
      // Silently fail on network errors
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor, selectedPlatform]);

  const handlePlatformChange = useCallback(
    async (platform: Platform | "all") => {
      setSelectedPlatform(platform);
      setLoading(true);

      const params = new URLSearchParams();
      if (platform !== "all") params.set("platform", platform);

      try {
        const res = await fetch(`/api/feed?${params}`);
        const data: FeedResponse = await res.json();
        setPosts(data.posts);
        setNextCursor(data.nextCursor);
        setHasMore(data.hasMore);
      } catch {
        setPosts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchMore, hasMore, loading]);

  return (
    <>
      <PlatformFilter selected={selectedPlatform} onChange={handlePlatformChange} />

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {posts.length === 0 && !loading ? (
          <EmptyState />
        ) : (
          posts.map((post) => <FeedCard key={post.id} post={post} />)
        )}

        {loading && <FeedSkeleton />}

        <div ref={sentinelRef} className="h-1" />
      </div>
    </>
  );
}
