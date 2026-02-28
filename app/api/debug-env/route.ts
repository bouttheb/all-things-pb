import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Try a direct fetch to Supabase REST API
  let directFetchResult = "not tested";
  try {
    const res = await fetch(`${url}/rest/v1/posts?select=id&limit=1`, {
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
    });
    directFetchResult = `status=${res.status}, ok=${res.ok}`;
    if (!res.ok) {
      const body = await res.text();
      directFetchResult += `, body=${body.substring(0, 200)}`;
    }
  } catch (e: unknown) {
    directFetchResult = `error: ${e instanceof Error ? e.message : String(e)}`;
  }

  // Try with supabase-js client
  let clientResult = "not tested";
  try {
    const supabase = createClient(url, serviceKey);
    const { data, error } = await supabase.from("posts").select("id").limit(1);
    if (error) {
      clientResult = `error: ${error.message} (code: ${error.code})`;
    } else {
      clientResult = `success, rows=${data?.length || 0}`;
    }
  } catch (e: unknown) {
    clientResult = `exception: ${e instanceof Error ? e.message : String(e)}`;
  }

  return NextResponse.json({
    urlLength: url.length,
    serviceKeyLength: serviceKey.length,
    directFetchResult,
    clientResult,
  });
}
