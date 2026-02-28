import Parser from "rss-parser";
import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/types";

const parser = new Parser({
  customFields: {
    item: [
      ["itunes:duration", "itunesDuration"],
      ["itunes:image", "itunesImage", { keepArray: false }],
    ],
  },
});

export async function syncPodcast(): Promise<SyncResult> {
  const feedUrl = process.env.PODCAST_RSS_URL;

  if (!feedUrl) {
    return { platform: "podcast", itemsAdded: 0, error: "Missing PODCAST_RSS_URL" };
  }

  const feed = await parser.parseURL(feedUrl);
  const supabase = createServerClient();
  let itemsAdded = 0;

  for (const item of feed.items.slice(0, 30)) {
    const guid = item.guid || item.link || item.title || "";
    if (!guid) continue;

    const enclosureUrl = item.enclosure?.url || "";
    if (!enclosureUrl) continue;

    const itunesImage =
      (item as unknown as Record<string, unknown>).itunesImage;
    const imageUrl =
      typeof itunesImage === "object" && itunesImage !== null
        ? (itunesImage as Record<string, string>).href || (itunesImage as Record<string, string>).url
        : typeof itunesImage === "string"
          ? itunesImage
          : feed.image?.url || null;

    const { error } = await supabase.from("posts").upsert(
      {
        platform: "podcast",
        platform_id: guid,
        media_type: "audio",
        title: item.title || null,
        description: item.contentSnippet || item.content || null,
        thumbnail_url: imageUrl || null,
        content_url: item.link || enclosureUrl,
        embed_url: enclosureUrl,
        published_at: item.pubDate
          ? new Date(item.pubDate).toISOString()
          : new Date().toISOString(),
        metadata: {
          show_title: feed.title || null,
          enclosure_url: enclosureUrl,
          enclosure_type: item.enclosure?.type || "audio/mpeg",
          duration: (item as unknown as Record<string, unknown>).itunesDuration || null,
          itunes_image: imageUrl,
        },
      },
      { onConflict: "platform,platform_id" }
    );

    if (!error) itemsAdded++;
  }

  return { platform: "podcast", itemsAdded };
}
