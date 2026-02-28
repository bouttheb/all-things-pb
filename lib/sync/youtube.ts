import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/types";

const API_BASE = "https://www.googleapis.com/youtube/v3";

interface YouTubeSearchItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string } };
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; maxres?: { url: string } };
  };
  contentDetails: { duration: string };
  statistics: {
    viewCount?: string;
    likeCount?: string;
  };
}

export async function syncYouTube(): Promise<SyncResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return { platform: "youtube", itemsAdded: 0, error: "Missing YouTube credentials" };
  }

  // Step 1: Search for latest videos
  const searchUrl = `${API_BASE}/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=20&key=${apiKey}`;
  const searchRes = await fetch(searchUrl);
  if (!searchRes.ok) {
    return { platform: "youtube", itemsAdded: 0, error: `YouTube search failed: ${searchRes.status}` };
  }

  const searchData = await searchRes.json();
  const items: YouTubeSearchItem[] = searchData.items || [];
  if (items.length === 0) {
    return { platform: "youtube", itemsAdded: 0 };
  }

  // Step 2: Get full video details
  const videoIds = items.map((i) => i.id.videoId).join(",");
  const videosUrl = `${API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
  const videosRes = await fetch(videosUrl);
  if (!videosRes.ok) {
    return { platform: "youtube", itemsAdded: 0, error: `YouTube videos fetch failed: ${videosRes.status}` };
  }

  const videosData = await videosRes.json();
  const videos: YouTubeVideoItem[] = videosData.items || [];

  // Step 3: Upsert into database
  const supabase = createServerClient();
  let itemsAdded = 0;

  for (const video of videos) {
    const thumbnail =
      video.snippet.thumbnails.maxres?.url ||
      video.snippet.thumbnails.high?.url ||
      null;

    const { error } = await supabase.from("posts").upsert(
      {
        platform: "youtube",
        platform_id: video.id,
        media_type: "video",
        title: video.snippet.title,
        description: video.snippet.description,
        thumbnail_url: thumbnail,
        content_url: `https://www.youtube.com/watch?v=${video.id}`,
        embed_url: `https://www.youtube.com/embed/${video.id}`,
        published_at: video.snippet.publishedAt,
        metadata: {
          duration: video.contentDetails.duration,
          view_count: Number(video.statistics.viewCount || 0),
          like_count: Number(video.statistics.likeCount || 0),
        },
      },
      { onConflict: "platform,platform_id" }
    );

    if (!error) itemsAdded++;
  }

  return { platform: "youtube", itemsAdded };
}
