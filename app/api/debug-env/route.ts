import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Show first 12 and last 6 chars to verify key matches
  const keyDebug = serviceKey.length > 18
    ? `${serviceKey.substring(0, 12)}...${serviceKey.substring(serviceKey.length - 6)}`
    : "TOO_SHORT";

  // Check each char code for hidden characters
  const charCodes = Array.from(serviceKey).map(c => c.charCodeAt(0));
  const hasNonAscii = charCodes.some(c => c > 127 || c < 32);
  const hasWhitespace = charCodes.some(c => c === 32 || c === 9 || c === 10 || c === 13);

  return NextResponse.json({
    urlLength: url.length,
    serviceKeyLength: serviceKey.length,
    keyDebug,
    hasNonAscii,
    hasWhitespace,
    firstFiveCharCodes: charCodes.slice(0, 5),
    lastFiveCharCodes: charCodes.slice(-5),
  });
}
