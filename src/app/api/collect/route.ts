import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { db } from "@/db";
import { events } from "@/db/schema";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));

    const site = String(body.site || "").trim();
    const path = String(body.path || "").trim();
    const referrer = body.referrer ? String(body.referrer) : null;
    const ua = req.headers.get("user-agent");
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;

    if (!site || !path) {
      return NextResponse.json({ ok: false, error: "site and path are required" }, { status: 400 });
    }

    const ipHash = ip ? sha256(ip) : null;
    const event = String(body.event || "pageview").slice(0, 64);
    const value = typeof body.value === "number" ? Math.trunc(body.value) : null;

    await db.insert(events).values({ site, path, referrer, ua, ipHash, event, value });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "unknown" }, { status: 500 });
  }
}
