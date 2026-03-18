-- ─────────────────────────────────────────────────────────────────────────────
-- Lumière Travel · Newsletter Subscribers
-- Requires is_admin() from setup_inquiries.sql to be run first.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only admins can read the subscriber list
CREATE POLICY "Admins can read newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (public.is_admin());
