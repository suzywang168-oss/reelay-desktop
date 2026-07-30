import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  language: text("language").notNull().default("zh"),
  createdAt: text("created_at").notNull(),
});

export const bookingRequests = sqliteTable("booking_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  preferredDate: text("preferred_date").notNull(),
  timezone: text("timezone").notNull(),
  topic: text("topic").notNull(),
  notes: text("notes").notNull().default(""),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});
