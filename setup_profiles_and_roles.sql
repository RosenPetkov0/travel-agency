-- ─────────────────────────────────────────────────────────────────────────────
-- Lumière Travel · User Profiles & Roles
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 1. PROFILES TABLE ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT        NOT NULL,
  role        TEXT        NOT NULL DEFAULT 'user'
                          CHECK (role IN ('user', 'admin')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ── 2. ROW LEVEL SECURITY ────────────────────────────────────────────────────

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Users can read only their own profile row
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update only their own profile row
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);


-- ── 3. AUTO-CREATE PROFILE ON SIGN-UP ────────────────────────────────────────

-- Function: called by the trigger below
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER                          -- runs with owner privileges to bypass RLS
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    'user'                                -- every new account starts as a regular user
  );
  RETURN NEW;
END;
$$;

-- Trigger: fires after a new row is inserted into auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ── 4. PROMOTE A USER TO ADMIN (run manually as needed) ──────────────────────
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'you@example.com';
