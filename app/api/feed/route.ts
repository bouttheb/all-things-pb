import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const cursor = searchParams.get("cursor");
  const limit = Math.min(Number(searchParams.get("limit") || 20), 50);

  const supabase = createServerClient();

  let query = supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (platform && platform !== "all") {
    query = query.eq("platform", platform);
  }

  if (cursor) {
    query = query.lt("published_at", cursor);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const posts = data || [];
  const nextCursor =
    posts.length === limit ? posts[posts.length - 1].published_at : null;

  return NextResponse.json({
    posts,
    nextCursor,
    hasMore: posts.length === limit,
  });
}
