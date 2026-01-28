import { pgTable, text, timestamp, uuid, varchar, integer } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),

  // Minimal event fields
  site: varchar("site", { length: 255 }).notNull(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  ua: text("ua"),
  ipHash: varchar("ip_hash", { length: 64 }),

  // Custom events (optional)
  event: varchar("event", { length: 64 }).default("pageview").notNull(),
  value: integer("value"),
});
