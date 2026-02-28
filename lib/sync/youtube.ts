import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/types";

const API_BASE = "https://www.googleapis.com/youtube/v3";

interface PlaylistItem {
  snippet: {
    resourceId: { videoId: string };
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; maxres?: { url: string } };
    channelTitle: string;
  };
}

interface YouTubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: { high?: { url: string }; maxres?: { url: string } };
    channelTitle: string;
  };
  contentDetails: { duration: string };
  statistics: {
    viewCount?: string;
    likeCount?: string;
  };
}

export async function syncYouTube(): Promise<SyncResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;

  // Support both single channel (YOUTUBE_CHANNEL_ID) and multiple (YOUTUBE_CHANNEL_IDS)
  const channelIds: string[] = [];
  if (process.env.YOUTUBE_CHANNEL_IDS) {
    channelIds.push(...process.env.YOUTUBE_CHANNEL_IDS.split(",").map((id) => id.trim()));
  } else if (process.env.YOUTUBE_CHANNEL_ID) {
    channelIds.push(process.env.YOUTUBE_CHANNEL_ID);
  }

  if (!apiKey || channelIds.length === 0) {
    return { platform: "youtube", itemsAdded: 0, error: "Missing YouTube credentials" };
  }

  const supabase = createServerClient();
  let totalAdded = 0;

  for (const channelId of channelIds) {
    // Convert channel ID to uploads playlist ID (UC... -> UU...)
    const uploadsPlaylistId = "UU" + channelId.substring(2);

    // Step 1: Get video IDs from uploads playlist (more reliable than search API)
    const allVideoIds: string[] = [];
    let pageToken: string | undefined;

    // Fetch up to 50 videos per channel (one page)
    const playlistUrl = `${API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}${pageToken ? `&pageToken=${pageToken}` : ""}`;
    const playlistRes = await fetch(playlistUrl);
    if (!playlistRes.ok) {
      console.error(`YouTube playlist fetch failed for ${channelId}: ${playlistRes.status}`);
      continue;
    }

    const playlistData = await playlistRes.json();
    const playlistItems: PlaylistItem[] = playlistData.items || [];

    // Filter out deleted/private videos
    for (const item of playlistItems) {
      if (item.snippet.title !== "Deleted video" && item.snippet.title !== "Private video") {
        allVideoIds.push(item.snippet.resourceId.videoId);
      }
    }

    if (allVideoIds.length === 0) continue;

    // Step 2: Get full video details in batches of 50
    for (let i = 0; i < allVideoIds.length; i += 50) {
      const batch = allVideoIds.slice(i, i + 50);
      const videoIds = batch.join(",");
      const videosUrl = `${API_BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${apiKey}`;
      const videosRes = await fetch(videosUrl);
      if (!videosRes.ok) {
        console.error(`YouTube videos fetch failed: ${videosRes.status}`);
        continue;
      }

      const videosData = await videosRes.json();
      const videos: YouTubeVideoItem[] = videosData.items || [];

      // Step 3: Upsert into database
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
              channel: video.snippet.channelTitle,
            },
          },
          { onConflict: "platform,platform_id" }
        );

        if (!error) totalAdded++;
      }
    }
  }

  return { platform: "youtube", itemsAdded: totalAdded };
}
