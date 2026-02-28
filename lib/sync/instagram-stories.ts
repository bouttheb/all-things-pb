import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/types";

const GRAPH_API = "https://graph.facebook.com/v21.0";

interface IGStory {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  timestamp: string;
  thumbnail_url?: string;
}

export async function syncInstagramStories(): Promise<SyncResult> {
  const userId = process.env.IG_USER_ID;
  const accessToken = process.env.IG_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    return { platform: "instagram", itemsAdded: 0, error: "Missing Instagram credentials" };
  }

  const supabase = createServerClient();

  // Mark expired stories
  await supabase
    .from("stories")
    .update({ is_expired: true })
    .lt("expires_at", new Date().toISOString())
    .eq("is_expired", false);

  // Fetch current live stories
  const url = `${GRAPH_API}/${userId}/stories?fields=id,media_type,media_url,timestamp,thumbnail_url&access_token=${accessToken}`;
  const res = await fetch(url);

  if (!res.ok) {
    const errText = await res.text();
    return { platform: "instagram", itemsAdded: 0, error: `IG Stories API error ${res.status}: ${errText}` };
  }

  const data = await res.json();
  const stories: IGStory[] = data.data || [];

  let itemsAdded = 0;

  for (const story of stories) {
    const publishedAt = new Date(story.timestamp);
    const expiresAt = new Date(publishedAt.getTime() + 24 * 60 * 60 * 1000);

    const { error } = await supabase.from("stories").upsert(
      {
        platform_id: story.id,
        media_type: story.media_type,
        media_url: story.media_url,
        thumbnail_url: story.thumbnail_url || null,
        published_at: story.timestamp,
        expires_at: expiresAt.toISOString(),
        is_expired: false,
      },
      { onConflict: "platform_id" }
    );

    if (!error) itemsAdded++;
  }

  return { platform: "instagram", itemsAdded };
}
