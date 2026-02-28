import { NextRequest, NextResponse } from "next/server";
import { validateCronSecret } from "@/lib/utils/auth-guard";
import { syncSpotify } from "@/lib/sync/spotify";

export async function GET(request: NextRequest) {
  if (!validateCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await syncSpotify();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { platform: "spotify", itemsAdded: 0, error: String(error) },
      { status: 500 }
    );
  }
}
