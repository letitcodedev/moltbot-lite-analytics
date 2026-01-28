import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const site = String(searchParams.get("site") || "").trim();
  const days = Math.max(1, Math.min(30, Number(searchParams.get("days") || 7)));

  if (!site) {
    return NextResponse.json({ ok: false, error: "site is required" }, { status: 400 });
  }

  const since = sql`now() - (${days} || ' days')::interval`;

  const totals = await db
    .select({
      total: sql<number>`count(*)::int`,
      uniques: sql<number>`count(distinct ${events.ipHash})::int`,
    })
    .from(events)
    .where(sql`${events.site} = ${site} and ${events.createdAt} >= ${since}`);

  const topPages = await db
    .select({
      path: events.path,
      views: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(sql`${events.site} = ${site} and ${events.createdAt} >= ${since}`)
    .groupBy(events.path)
    .orderBy(desc(sql`count(*)`))
    .limit(10);

  const topReferrers = await db
    .select({
      referrer: events.referrer,
      views: sql<number>`count(*)::int`,
    })
    .from(events)
    .where(sql`${events.site} = ${site} and ${events.createdAt} >= ${since} and ${events.referrer} is not null`)
    .groupBy(events.referrer)
    .orderBy(desc(sql`count(*)`))
    .limit(10);

  return NextResponse.json({
    ok: true,
    site,
    days,
    totals: totals[0],
    topPages,
    topReferrers,
  });
}
