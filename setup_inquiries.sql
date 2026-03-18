-- ─────────────────────────────────────────────────────────────────────────────
-- Lumière Travel · Inquiries + Admin Policies
-- Run in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- ─────────────────────────────────────────────────────────────────────────────


-- ── 0. HELPER: is_admin() ────────────────────────────────────────────────────
-- SECURITY DEFINER avoids infinite recursion when RLS policies on `profiles`
-- call back into the same table.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;


-- ── 1. INQUIRIES TABLE ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.inquiries (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  message     TEXT        NOT NULL,
  location    TEXT,
  status      TEXT        NOT NULL DEFAULT 'new'
                          CHECK (status IN ('new', 'read', 'replied')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── RLS for inquiries ──────────────────────────────────────────────────────

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Admins can read all inquiries
CREATE POLICY "Admins can read all inquiries"
  ON public.inquiries
  FOR SELECT
  USING (public.is_admin());

-- Admins can update inquiry status
CREATE POLICY "Admins can update inquiries"
  ON public.inquiries
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Anyone (incl. anonymous visitors) can submit a contact enquiry
CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries
  FOR INSERT
  WITH CHECK (true);


-- ── 2. PROFILES — add admin read-all policy ──────────────────────────────────
-- The existing policy lets users see only their own row.
-- Admins additionally need to count all rows for the dashboard stats.

CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  USING (public.is_admin());


-- ── 3. DESTINATIONS — enable RLS + policies ──────────────────────────────────
-- Public read (anyone can browse destinations).
-- Only admins can INSERT / UPDATE / DELETE.

ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read destinations"
  ON public.destinations
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert destinations"
  ON public.destinations
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update destinations"
  ON public.destinations
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete destinations"
  ON public.destinations
  FOR DELETE
  USING (public.is_admin());

-- Add optional description column (idempotent)
ALTER TABLE public.destinations
  ADD COLUMN IF NOT EXISTS description TEXT;


-- ── 4. HOTELS — same pattern as destinations ─────────────────────────────────

ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read hotels"
  ON public.hotels
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert hotels"
  ON public.hotels
  FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update hotels"
  ON public.hotels
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete hotels"
  ON public.hotels
  FOR DELETE
  USING (public.is_admin());
