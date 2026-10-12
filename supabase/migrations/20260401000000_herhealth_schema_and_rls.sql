-- ==============================================================================
-- HerHealth Production Database Schema & Row-Level Security (RLS) Policies
-- Migration: 20260401000000_herhealth_schema_and_rls.sql
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT NOT NULL DEFAULT 'Valued User',
    timezone TEXT NOT NULL DEFAULT 'Asia/Kolkata',
    role TEXT NOT NULL DEFAULT 'registered_user' CHECK (role IN ('registered_user', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. PERIOD RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.period_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE,
    flow TEXT CHECK (flow IN ('spotting', 'light', 'medium', 'heavy', 'very_heavy')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT check_valid_date_range CHECK (end_date IS NULL OR end_date >= start_date)
);

CREATE INDEX IF NOT EXISTS idx_period_records_user_start ON public.period_records(user_id, start_date DESC);

-- 3. SYMPTOM ENTRIES TABLE
CREATE TABLE IF NOT EXISTS public.symptom_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    period_record_id UUID REFERENCES public.period_records(id) ON DELETE SET NULL,
    symptom_type TEXT NOT NULL,
    severity TEXT CHECK (severity IN ('mild', 'moderate', 'severe')),
    entry_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_symptom_entries_user_date ON public.symptom_entries(user_id, entry_date DESC);

-- 4. WELLNESS ENTRIES TABLE (Habits & Daily tracking)
CREATE TABLE IF NOT EXISTS public.wellness_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    habit_type TEXT NOT NULL,
    completion_status BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    CONSTRAINT unique_user_date_habit UNIQUE (user_id, entry_date, habit_type)
);

CREATE INDEX IF NOT EXISTS idx_wellness_entries_user_date ON public.wellness_entries(user_id, entry_date DESC);

-- 5. CONSENT RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.consent_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    consent_type TEXT NOT NULL,
    policy_version TEXT NOT NULL,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    revoked_at TIMESTAMPTZ,
    CONSTRAINT unique_user_consent_type UNIQUE (user_id, consent_type)
);

-- 6. HEALTH ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.health_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    publication_status TEXT NOT NULL DEFAULT 'published' CHECK (publication_status IN ('draft', 'published', 'archived')),
    reviewer_name TEXT,
    reviewer_title TEXT,
    reviewed_at TIMESTAMPTZ,
    reference_sources JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_health_articles_slug ON public.health_articles(slug);
CREATE INDEX IF NOT EXISTS idx_health_articles_category ON public.health_articles(category);

-- 7. AUDIT EVENTS TABLE (Privileged & Account actions)
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    reason TEXT,
    timestamp TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_audit_events_timestamp ON public.audit_events(timestamp DESC);

-- 8. DATA DELETION / EXPORT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.data_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    request_type TEXT NOT NULL CHECK (request_type IN ('export', 'deletion')),
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
    requested_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    processed_at TIMESTAMPTZ,
    notes TEXT
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.period_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.symptom_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consent_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_requests ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- --- PROFILES POLICIES ---
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- --- PERIOD RECORDS POLICIES (STRICT PRIVATE ISOLATION) ---
CREATE POLICY "Users can view only their own period records"
    ON public.period_records FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own period records"
    ON public.period_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own period records"
    ON public.period_records FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own period records"
    ON public.period_records FOR DELETE
    USING (auth.uid() = user_id);

-- --- SYMPTOM ENTRIES POLICIES ---
CREATE POLICY "Users can view only their own symptom entries"
    ON public.symptom_entries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own symptom entries"
    ON public.symptom_entries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own symptom entries"
    ON public.symptom_entries FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own symptom entries"
    ON public.symptom_entries FOR DELETE
    USING (auth.uid() = user_id);

-- --- WELLNESS ENTRIES POLICIES ---
CREATE POLICY "Users can view only their own wellness entries"
    ON public.wellness_entries FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wellness entries"
    ON public.wellness_entries FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wellness entries"
    ON public.wellness_entries FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wellness entries"
    ON public.wellness_entries FOR DELETE
    USING (auth.uid() = user_id);

-- --- CONSENT RECORDS POLICIES ---
CREATE POLICY "Users can view own consent records"
    ON public.consent_records FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can insert or update own consent records"
    ON public.consent_records FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own consent records"
    ON public.consent_records FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- --- HEALTH ARTICLES POLICIES ---
-- Public can read published articles
CREATE POLICY "Anyone can view published articles"
    ON public.health_articles FOR SELECT
    USING (publication_status = 'published' OR public.is_admin());

-- Only admins can insert, update, delete articles
CREATE POLICY "Admins can insert health articles"
    ON public.health_articles FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update health articles"
    ON public.health_articles FOR UPDATE
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete health articles"
    ON public.health_articles FOR DELETE
    USING (public.is_admin());

-- --- AUDIT EVENTS POLICIES ---
CREATE POLICY "Only admins can view audit events"
    ON public.audit_events FOR SELECT
    USING (public.is_admin());

CREATE POLICY "Authenticated users can create audit log for actions"
    ON public.audit_events FOR INSERT
    WITH CHECK (auth.uid() = actor_user_id OR auth.uid() IS NULL);

-- --- DATA REQUESTS POLICIES ---
CREATE POLICY "Users can view own data requests"
    ON public.data_requests FOR SELECT
    USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can create data requests"
    ON public.data_requests FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update data requests"
    ON public.data_requests FOR UPDATE
    USING (public.is_admin());

-- Automatic trigger for user profile on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, timezone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'display_name', 'Valued User'),
    COALESCE(new.raw_user_meta_data->>'timezone', 'Asia/Kolkata'),
    'registered_user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
