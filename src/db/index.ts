import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";

// Note: @vercel/postgres is deprecated for new setups.
// For a production build, consider Neon + `postgres` driver.

export const db = drizzle(sql);
