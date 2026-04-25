import { NextResponse } from "next/server";
import { pageViewCounter } from "@/lib/metrics"; // from your metrics.ts

// GET /api/track?type=signin  →  pageViewCounter.inc({ page: "signin" })
// GET /api/track?type=signup  →  pageViewCounter.inc({ page: "signup" })
// GET /api/track?type=home    →  pageViewCounter.inc({ page: "home" })
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") || "unknown";

  pageViewCounter.inc({ page: type });

  return NextResponse.json({ ok: true });
}