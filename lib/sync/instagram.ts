import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult, MediaType } from "@/types";

const GRAPH_API = "https://graph.facebook.com/v21.0";

interface IGMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
  children?: {
    data: Array<{
      id: string;
      media_url: string;
      media_type: "IMAGE" | "VIDEO";
    }>;
  };
}

function mapMediaType(igType: string): MediaType {
  switch (igType) {
    case "VIDEO":
      return "reel";
    case "CAROUSEL_ALBUM":
      return "carousel";
    default:
      return "image";
  }
}

export async function syncInstagram(): Promise<SyncResult> {
  const userId = process.env.IG_USER_ID;
  const accessToken = process.env.IG_ACCESS_TOKEN;

  if (!userId || !accessToken) {
    return { platform: "instagram", itemsAdded: 0, error: "Missing Instagram credentials" };
  }

  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_url,media_type}";
  const url = `${GRAPH_API}/${userId}/media?fields=${fields}&limit=25&access_token=${accessToken}`;

  const res = await fetch(url);
  if (!res.ok) {
    const errText = await res.text();
    return { platform: "instagram", itemsAdded: 0, error: `IG API error ${res.status}: ${errText}` };
  }

  const data = await res.json();
  const items: IGMedia[] = data.data || [];

  const supabase = createServerClient();
  let itemsAdded = 0;

  for (const item of items) {
    const thumbnail = item.thumbnail_url || item.media_url || null;

    const { error } = await supabase.from("posts").upsert(
      {
        platform: "instagram",
        platform_id: item.id,
        media_type: mapMediaType(item.media_type),
        title: null,
        description: item.caption || null,
        thumbnail_url: thumbnail,
        content_url: item.permalink,
        embed_url: item.permalink,
        published_at: item.timestamp,
        metadata: {
          ig_media_type: item.media_type,
          permalink: item.permalink,
          media_url: item.media_url || null,
          children: item.children?.data || null,
        },
      },
      { onConflict: "platform,platform_id" }
    );

    if (!error) itemsAdded++;
  }

  return { platform: "instagram", itemsAdded };
}
