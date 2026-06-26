CREATE TABLE IF NOT EXISTS assessment_results (
  id SERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  education_level TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'ar',
  country TEXT NOT NULL DEFAULT 'الأردن',
  tawjihi_stream TEXT,
  answers JSONB NOT NULL,
  personality_profile JSONB NOT NULL,
  recommended_majors JSONB NOT NULL,
  recommended_careers JSONB NOT NULL,
  skill_recommendations JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
