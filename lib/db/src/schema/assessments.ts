import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const assessmentResultsTable = pgTable("assessment_results", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  educationLevel: text("education_level").notNull(),
  language: text("language").notNull().default("ar"),
  country: text("country").notNull().default("الأردن"),
  tawjihiStream: text("tawjihi_stream"),
  answers: jsonb("answers").notNull(),
  personalityProfile: jsonb("personality_profile").notNull(),
  recommendedMajors: jsonb("recommended_majors").notNull(),
  recommendedCareers: jsonb("recommended_careers").notNull(),
  skillRecommendations: jsonb("skill_recommendations").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResultsTable).omit({ id: true, createdAt: true });
export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResultsTable.$inferSelect;
