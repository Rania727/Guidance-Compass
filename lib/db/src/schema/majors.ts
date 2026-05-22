import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const majorsTable = pgTable("majors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  faculty: text("faculty").notNull(),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  requiredSkills: text("required_skills").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMajorSchema = createInsertSchema(majorsTable).omit({ id: true, createdAt: true });
export type InsertMajor = z.infer<typeof insertMajorSchema>;
export type Major = typeof majorsTable.$inferSelect;
