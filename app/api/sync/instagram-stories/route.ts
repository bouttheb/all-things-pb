import { NextRequest, NextResponse } from "next/server";
import { validateCronSecret } from "@/lib/utils/auth-guard";
import { syncInstagramStories } from "@/lib/sync/instagram-stories";

export async function GET(request: NextRequest) {
  if (!validateCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncInstagramStories();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { platform: "instagram", itemsAdded: 0, error: String(error) },
      { status: 500 }
    );
  }
}
