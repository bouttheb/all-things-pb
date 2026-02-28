import { NextRequest, NextResponse } from "next/server";
import { validateCronSecret } from "@/lib/utils/auth-guard";
import { syncYouTube } from "@/lib/sync/youtube";
import { syncPodcast } from "@/lib/sync/podcast";
import { syncInstagram } from "@/lib/sync/instagram";
import { syncInstagramStories } from "@/lib/sync/instagram-stories";
import type { SyncResult } from "@/types";

export async function GET(request: NextRequest) {
  if (!validateCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: SyncResult[] = [];

  // Run syncs sequentially to stay within serverless time limits
  // Note: Music is synced via YouTube (YOUTUBE_MUSIC_CHANNEL_ID) — Spotify sync disabled
  const syncs = [
    syncYouTube,
    syncPodcast,
    syncInstagram,
    syncInstagramStories,
  ];

  for (const sync of syncs) {
    try {
      results.push(await sync());
    } catch (error) {
      results.push({
        platform: "youtube",
        itemsAdded: 0,
        error: String(error),
      });
    }
  }

  return NextResponse.json({ results });
}
