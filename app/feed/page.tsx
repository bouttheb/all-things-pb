import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InstallPrompt from "@/components/layout/InstallPrompt";
import StoriesCarousel from "@/components/stories/StoriesCarousel";
import FeedList from "@/components/feed/FeedList";
import type { Post, Story } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content Feed | thepastorb",
  description:
    "Videos, podcasts, music and more from thepastorb — all in one place.",
};

export const revalidate = 60;

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

export default async function FeedPage() {
  const [stories, { posts, nextCursor }] = await Promise.all([
    getStories(),
    getPosts(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar variant="solid" />
      {/* Spacer for fixed nav */}
      <div className="h-16" />

      {/* Feed header */}
      <header className="bg-[var(--color-ink)] text-white">
        <div className="max-w-3xl mx-auto px-6 pt-10 pb-8 text-center">
          <h1
            className="text-[clamp(1.8rem,5vw,3rem)] text-white tracking-[0.02em]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span className="italic">thepastor</span>B
          </h1>
          <p className="mt-3 text-[1rem] text-[var(--color-muted)] font-light tracking-[0.04em]">
            Resources for Growing in Christ &amp; Moving Forward in Life.
          </p>
        </div>
      </header>

      <StoriesCarousel stories={stories} />
      <main className="flex-1">
        <FeedList initialPosts={posts} initialCursor={nextCursor} />
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  );
}
