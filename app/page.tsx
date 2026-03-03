import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/home/HeroSection";
import MusicSection from "@/components/home/MusicSection";
import TofuSection from "@/components/home/TofuSection";
import HtcylSection from "@/components/home/HtcylSection";
import VideoGrid from "@/components/home/VideoGrid";
import BooksSection from "@/components/home/BooksSection";
import AboutSection from "@/components/home/AboutSection";
import EmailSignupSection from "@/components/home/EmailSignupSection";
import SiteFooter from "@/components/home/SiteFooter";
import type { Post } from "@/types";

export const revalidate = 60;

async function getLatestVideos(limit = 4): Promise<Post[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("platform", "youtube")
      .order("published_at", { ascending: false })
      .limit(limit);
    return (data as Post[]) || [];
  } catch {
    return [];
  }
}

async function getHtcylVideos(): Promise<
  { id: string; title: string; thumbnail: string }[]
> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = "PLB9--tMk57EH9QRxYiJ8xiPwDHtUn0RcZ";
  if (!apiKey) return [];

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=9&playlistId=${playlistId}&key=${apiKey}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const json = await res.json();

    return (json.items || [])
      .filter(
        (item: { snippet: { title: string } }) =>
          item.snippet.title !== "Private video" &&
          item.snippet.title !== "Deleted video"
      )
      .map(
        (item: {
          snippet: {
            resourceId: { videoId: string };
            title: string;
            thumbnails: { high?: { url: string }; medium?: { url: string } };
          };
        }) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          thumbnail:
            item.snippet.thumbnails.high?.url ||
            item.snippet.thumbnails.medium?.url ||
            "",
        })
      );
  } catch {
    return [];
  }
}

export default async function Home() {
  const [videos, htcylVideos] = await Promise.all([
    getLatestVideos(4),
    getHtcylVideos(),
  ]);

  return (
    <>
      <Navbar variant="transparent" />
      <HeroSection />
      <MusicSection />
      <TofuSection />
      <HtcylSection videos={htcylVideos} />
      <VideoGrid
        id="sermons"
        heading="Sermons"
        posts={videos}
        viewAllHref="https://youtube.com/playlist?list=PL6LyMjHR7ziBYXnds8GQIjGfCp0CiD0oX"
        viewAllLabel="View All Sermons"
      />
      <BooksSection />
      <VideoGrid
        id="videos"
        heading="Latest Videos"
        posts={videos}
        viewAllHref="https://youtube.com/@thepastor_b"
        viewAllLabel="Browse All Videos"
      />
      <AboutSection />
      <EmailSignupSection />
      <SiteFooter />
    </>
  );
}
