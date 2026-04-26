-- ============================================================
--  RAI PORTAL — SUPABASE DATABASE SCHEMA
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. USER PROFILES (auto-created after signup)
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT,
  email       TEXT,
  usn         TEXT,
  semester    INT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 2. COURSE ENROLLMENTS
CREATE TABLE IF NOT EXISTS enrollments (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id   INT NOT NULL,
  progress    INT DEFAULT 0,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 3. EXAM RESULTS
CREATE TABLE IF NOT EXISTS exam_results (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id  INT NOT NULL,
  score      INT NOT NULL,
  passed     BOOLEAN DEFAULT FALSE,
  taken_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

-- 4. CHAT LOGS (optional — for analytics)
CREATE TABLE IF NOT EXISTS chat_logs (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID REFERENCES profiles(id) ON DELETE CASCADE,
  question   TEXT,
  answer     TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ROW LEVEL SECURITY
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results  ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_logs     ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Own profile" ON profiles
  USING (auth.uid() = id);

-- Enrollments: users can read/write their own
CREATE POLICY "Own enrollments" ON enrollments
  USING (auth.uid() = user_id);

-- Exam results: users can read/write their own
CREATE POLICY "Own exam results" ON exam_results
  USING (auth.uid() = user_id);

-- Chat logs: users can insert and read their own
CREATE POLICY "Own chat logs" ON chat_logs
  USING (auth.uid() = user_id);

-- ============================================================
--  DONE. Your database is ready!
--  Next: copy your Supabase URL & anon key into supabase.js
-- ============================================================
