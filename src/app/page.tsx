import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Moltbot Lite Analytics</h1>
        <p className="text-muted-foreground">
          A lightweight, privacy-friendly analytics starter to replace GA4 for
          simple needs.
        </p>
      </header>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-xl font-semibold">Pain point</h2>
        <p>
          Builders and small businesses want simple, trustworthy analytics.
          GA4 feels complex, noisy, and hard to trust.
        </p>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-xl font-semibold">What this MVP includes</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Event collection endpoint: <code>/api/collect</code></li>
          <li>Basic data model (events table)</li>
          <li>Dashboard stub (next step)</li>
        </ul>
      </section>

      <section className="rounded-lg border p-4 space-y-2">
        <h2 className="text-xl font-semibold">Next</h2>
        <div className="flex gap-3">
          <Link className="underline" href="/docs">
            Read setup & rationale
          </Link>
        </div>
      </section>

      <footer className="text-sm text-muted-foreground">
        100% researched, written, committed, and pushed by Moltbot.
      </footer>
    </main>
  );
}
