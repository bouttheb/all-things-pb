import { createServerClient } from "@/lib/supabase/server";
import type { SyncResult } from "@/types";

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API_BASE = "https://api.spotify.com/v1";

async function getAccessToken(): Promise<string | null> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return null;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.access_token;
}

interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  images: Array<{ url: string; width: number }>;
  external_urls: { spotify: string };
  total_tracks: number;
}

interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  external_urls: { spotify: string };
  preview_url: string | null;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string }>;
  };
}

export async function syncSpotify(): Promise<SyncResult> {
  const artistId = process.env.SPOTIFY_ARTIST_ID;
  if (!artistId) {
    return { platform: "spotify", itemsAdded: 0, error: "Missing SPOTIFY_ARTIST_ID" };
  }

  const token = await getAccessToken();
  if (!token) {
    return { platform: "spotify", itemsAdded: 0, error: "Failed to get Spotify access token" };
  }

  const headers = { Authorization: `Bearer ${token}` };
  const supabase = createServerClient();
  let itemsAdded = 0;

  // Fetch albums and singles
  const albumsRes = await fetch(
    `${API_BASE}/artists/${artistId}/albums?include_groups=album,single&limit=20`,
    { headers }
  );

  if (albumsRes.ok) {
    const albumsData = await albumsRes.json();
    const albums: SpotifyAlbum[] = albumsData.items || [];

    for (const album of albums) {
      const thumbnail = album.images[0]?.url || null;
      // Parse release_date which can be YYYY, YYYY-MM, or YYYY-MM-DD
      const releaseDate = album.release_date.length === 4
        ? `${album.release_date}-01-01`
        : album.release_date.length === 7
          ? `${album.release_date}-01`
          : album.release_date;

      const { error } = await supabase.from("posts").upsert(
        {
          platform: "spotify",
          platform_id: `album_${album.id}`,
          media_type: "audio",
          title: album.name,
          description: `${album.album_type === "single" ? "Single" : "Album"} — ${album.total_tracks} track${album.total_tracks === 1 ? "" : "s"}`,
          thumbnail_url: thumbnail,
          content_url: album.external_urls.spotify,
          embed_url: `https://open.spotify.com/embed/album/${album.id}`,
          published_at: new Date(releaseDate).toISOString(),
          metadata: {
            spotify_uri: `spotify:album:${album.id}`,
            album_type: album.album_type,
            total_tracks: album.total_tracks,
            type: "album",
          },
        },
        { onConflict: "platform,platform_id" }
      );

      if (!error) itemsAdded++;
    }
  }

  // Fetch top tracks
  const tracksRes = await fetch(
    `${API_BASE}/artists/${artistId}/top-tracks`,
    { headers }
  );

  if (tracksRes.ok) {
    const tracksData = await tracksRes.json();
    const tracks: SpotifyTrack[] = tracksData.tracks || [];

    for (const track of tracks) {
      const thumbnail = track.album.images[0]?.url || null;

      const { error } = await supabase.from("posts").upsert(
        {
          platform: "spotify",
          platform_id: `track_${track.id}`,
          media_type: "audio",
          title: track.name,
          description: `From ${track.album.name}`,
          thumbnail_url: thumbnail,
          content_url: track.external_urls.spotify,
          embed_url: `https://open.spotify.com/embed/track/${track.id}`,
          published_at: new Date().toISOString(),
          metadata: {
            spotify_uri: `spotify:track:${track.id}`,
            album_name: track.album.name,
            duration_ms: track.duration_ms,
            preview_url: track.preview_url,
            type: "track",
          },
        },
        { onConflict: "platform,platform_id" }
      );

      if (!error) itemsAdded++;
    }
  }

  return { platform: "spotify", itemsAdded };
}
