import { createServerClient } from "@/lib/supabase/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InstallPrompt from "@/components/layout/InstallPrompt";
import StoriesCarousel from "@/components/stories/StoriesCarousel";
import FeedList from "@/components/feed/FeedList";
import type { Post, Story } from "@/types";

export const revalidate = 60; // Revalidate page data every 60 seconds

async function getStories(): Promise<Story[]> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("stories")
      .select("*")
      .eq("is_expired", false)
      .gt("expires_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    return (data as Story[]) || [];
  } catch {
    return [];
  }
}

async function getPosts(): Promise<{ posts: Post[]; nextCursor: string | null }> {
  try {
    const supabase = createServerClient();
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(20);

    const posts = (data as Post[]) || [];
    const nextCursor = posts.length === 20 ? posts[posts.length - 1].published_at : null;
    return { posts, nextCursor };
  } catch {
    return { posts: [], nextCursor: null };
  }
}

export default async function Home() {
  const [stories, { posts, nextCursor }] = await Promise.all([
    getStories(),
    getPosts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <StoriesCarousel stories={stories} />
      <main className="flex-1">
        <FeedList initialPosts={posts} initialCursor={nextCursor} />
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  );
}
