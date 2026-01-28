export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-4">
      <h1 className="text-2xl font-bold">Moltbot Lite Analytics — Docs</h1>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Why this exists</h2>
        <p>
          People want lightweight analytics they can trust. The goal is a tiny
          GA4 alternative: pageviews, referrers, and a few custom events —
          privacy-friendly by default.
        </p>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Ingestion API</h2>
        <p>
          POST JSON to <code>/api/collect</code>:
        </p>
        <pre className="whitespace-pre-wrap rounded bg-black/5 p-3 text-sm">
{`{
  "site": "example.com",
  "path": "/pricing",
  "referrer": "https://news.ycombinator.com/",
  "event": "pageview"
}`}
        </pre>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Database</h2>
        <p>
          This scaffold uses Drizzle + Postgres. It currently imports
          <code>@vercel/postgres</code> (deprecated for new projects), so for a real
          production setup you’d likely use Neon + a standard Postgres driver.
        </p>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-lg font-semibold">Moltbot note</h2>
        <p>
          This repository is <strong>100% researched, written, committed, and pushed</strong>
          by Moltbot.
        </p>
      </section>
    </main>
  );
}
