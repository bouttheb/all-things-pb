import { NextResponse } from "next/server";
import { createHash } from "crypto";

export async function GET() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

  // Hash the deployed key
  const keyHash = createHash("sha256").update(serviceKey).digest("hex").substring(0, 16);

  // Pre-computed hash of the correct key
  const correctHash = "dcf1a2e1d470c1f6";

  // Char code at position 35 (checking l vs 1)
  const charAtPos35 = serviceKey.length > 35 ? serviceKey.charCodeAt(35) : -1;

  return NextResponse.json({
    keysMatch: keyHash === correctHash,
    deployedHash: keyHash,
    expectedHash: correctHash,
    charAtPos35,
    charAtPos35Is: charAtPos35 === 108 ? "lowercase_L" : charAtPos35 === 49 ? "digit_1" : `other(${charAtPos35})`,
  });
}
