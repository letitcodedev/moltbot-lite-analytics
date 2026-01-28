import Link from "next/link";

type Stats = {
  ok: boolean;
  site: string;
  days: number;
  totals: { total: number; uniques: number };
  topPages: { path: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  error?: string;
};

async function getStats(site: string): Promise<Stats> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/stats?site=${encodeURIComponent(site)}&days=7`,
    { cache: "no-store" }
  );
  return res.json();
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ site?: string }>;
}) {
  const sp = await searchParams;
  const site = sp.site || "example.com";

  let data: Stats | null = null;
  let error: string | null = null;
  try {
    data = await getStats(site);
    if (!data.ok) error = data.error || "Unknown error";
  } catch (e: any) {
    error = e?.message || String(e);
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Simple analytics for <span className="font-mono">{site}</span> (last 7
          days)
        </p>
        <div className="flex gap-3 text-sm">
          <Link className="underline" href="/docs">
            Setup
          </Link>
          <Link className="underline" href="/">
            Home
          </Link>
        </div>
      </header>

      <section className="rounded-lg border p-4">
        <form className="flex gap-2" action="/dashboard" method="get">
          <input
            className="flex-1 rounded border px-3 py-2"
            name="site"
            defaultValue={site}
            placeholder="example.com"
          />
          <button className="rounded bg-black px-4 py-2 text-white" type="submit">
            Load
          </button>
        </form>
      </section>

      {error ? (
        <section className="rounded-lg border border-red-300 bg-red-50 p-4">
          <p className="font-semibold">Error</p>
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
          <p className="text-sm text-muted-foreground mt-2">
            Hint: set <code>DATABASE_URL</code> and run migrations.
          </p>
        </section>
      ) : (
        data && (
          <>
            <section className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Pageviews</div>
                <div className="text-3xl font-bold">{data.totals.total}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Uniques</div>
                <div className="text-3xl font-bold">{data.totals.uniques}</div>
              </div>
            </section>

            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Top pages</h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {data.topPages.map((p) => (
                    <li key={p.path} className="flex justify-between gap-2">
                      <span className="font-mono truncate">{p.path}</span>
                      <span className="tabular-nums">{p.views}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border p-4">
                <h2 className="font-semibold">Top referrers</h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {data.topReferrers.map((r) => (
                    <li key={r.referrer} className="flex justify-between gap-2">
                      <span className="truncate">{r.referrer}</span>
                      <span className="tabular-nums">{r.views}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )
      )}

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="font-semibold">Tracking snippet (GET)</h2>
        <pre className="whitespace-pre-wrap rounded bg-black/5 p-3 text-sm">{`<script>
  fetch('https://YOUR_DOMAIN/api/collect?site=${site}&path=' + encodeURIComponent(location.pathname) + '&referrer=' + encodeURIComponent(document.referrer));
</script>`}</pre>
      </section>
    </main>
  );
}
