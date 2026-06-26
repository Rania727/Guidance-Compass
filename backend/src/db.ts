import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import { pgTable, text, serial, timestamp, jsonb } from "drizzle-orm/pg-core";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set.");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool);

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
