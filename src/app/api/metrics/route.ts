import { NextResponse } from "next/server";
import { register, apiCounter } from "@/lib/metrics"; // from your metrics.ts

// Prevent Next.js from caching — Prometheus needs a fresh snapshot every scrape
export const dynamic = "force-dynamic";

export async function GET() {
  apiCounter.inc({ route: "/api/metrics" });

  const metrics = await register.metrics();

  return new NextResponse(metrics, {
    status: 200,
    headers: { "Content-Type": register.contentType },
  });
}