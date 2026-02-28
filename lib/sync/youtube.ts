import { createServerClient } from "@/lib/supabase/server";
import type { Platform, SyncResult } from "@/types";

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

async function syncChannel(
  channelId: string,
  apiKey: string,
  platform: Platform,
  mediaType: "video" | "audio",
  supabase: ReturnType<typeof createServerClient>
): Promise<number> {
  // Convert channel ID to uploads playlist ID (UC... -> UU...)
  const uploadsPlaylistId = "UU" + channelId.substring(2);

  // Step 1: Get video IDs from uploads playlist (more reliable than search API)
  const allVideoIds: string[] = [];

  // Fetch up to 50 videos per channel (one page)
  const playlistUrl = `${API_BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=50&key=${apiKey}`;
  const playlistRes = await fetch(playlistUrl);
  if (!playlistRes.ok) {
    console.error(`YouTube playlist fetch failed for ${channelId}: ${playlistRes.status}`);
    return 0;
  }

  const playlistData = await playlistRes.json();
  const playlistItems: PlaylistItem[] = playlistData.items || [];

  // Filter out deleted/private videos
  for (const item of playlistItems) {
    if (item.snippet.title !== "Deleted video" && item.snippet.title !== "Private video") {
      allVideoIds.push(item.snippet.resourceId.videoId);
    }
  }

  if (allVideoIds.length === 0) return 0;

  let totalAdded = 0;

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

      // Clean up auto-generated YouTube Music descriptions
      let description = video.snippet.description;
      if (platform === "spotify" && description.startsWith("Provided to YouTube by")) {
        // Extract just the artist and release info
        const releasedMatch = description.match(/Released on: (\d{4}-\d{2}-\d{2})/);
        const releaseDate = releasedMatch ? releasedMatch[1] : null;
        description = releaseDate
          ? `Benjamin Robinson · Released ${releaseDate}`
          : "Benjamin Robinson";
      }

      const { error } = await supabase.from("posts").upsert(
        {
          platform,
          platform_id: video.id,
          media_type: mediaType,
          title: video.snippet.title,
          description,
          thumbnail_url: thumbnail,
          content_url: `https://www.youtube.com/watch?v=${video.id}`,
          embed_url: `https://www.youtube.com/embed/${video.id}`,
          published_at: video.snippet.publishedAt,
          metadata: {
            duration: video.contentDetails.duration,
            view_count: Number(video.statistics.viewCount || 0),
            like_count: Number(video.statistics.likeCount || 0),
            channel: video.snippet.channelTitle,
            source: platform === "spotify" ? "youtube_music" : "youtube",
          },
        },
        { onConflict: "platform,platform_id" }
      );

      if (!error) totalAdded++;
    }
  }

  return totalAdded;
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

  // Sync regular YouTube channels (sermons, Bible studies, talks)
  for (const channelId of channelIds) {
    totalAdded += await syncChannel(channelId, apiKey, "youtube", "video", supabase);
  }

  // Sync music channel as "spotify" platform (uses YouTube player for full playback)
  const musicChannelId = process.env.YOUTUBE_MUSIC_CHANNEL_ID;
  if (musicChannelId) {
    totalAdded += await syncChannel(musicChannelId, apiKey, "spotify", "audio", supabase);
  }

  return { platform: "youtube", itemsAdded: totalAdded };
}
