export type Platform = "youtube" | "instagram" | "podcast" | "spotify";

export type MediaType = "video" | "image" | "carousel" | "audio" | "reel";

export interface Post {
  id: string;
  platform: Platform;
  platform_id: string;
  media_type: MediaType;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  content_url: string;
  embed_url: string | null;
  published_at: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface Story {
  id: string;
  platform_id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  thumbnail_url: string | null;
  published_at: string;
  expires_at: string;
  is_expired: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface SyncResult {
  platform: Platform;
  itemsAdded: number;
  error?: string;
}

export interface FeedResponse {
  posts: Post[];
  nextCursor: string | null;
  hasMore: boolean;
}
