import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const workspaces = sqliteTable("reelay_workspaces", {
  id: text("id").primaryKey(),
  projectName: text("project_name").notNull(),
  activeCanvasId: text("active_canvas_id").notNull(),
  payload: text("payload").notNull(),
  revision: integer("revision").notNull().default(1),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
