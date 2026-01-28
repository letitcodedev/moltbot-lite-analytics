import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

let _db: ReturnType<typeof drizzle> | null = null;

export function getDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    // Don't throw during build-time evaluation; throw only when called at runtime.
    throw new Error("DATABASE_URL is required");
  }

  // Disable prepared statements for serverless-like environments.
  const client = postgres(databaseUrl, { prepare: false });
  _db = drizzle(client);
  return _db;
}
