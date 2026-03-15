-- ============================================================
-- Travel Agency – Database Setup
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- -------------------------
-- Table: destinations
-- -------------------------
CREATE TABLE IF NOT EXISTS destinations (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  location    TEXT NOT NULL,
  image_url   TEXT,
  rating      NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
  price       NUMERIC(10, 2) NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------
-- Table: hotels
-- -------------------------
CREATE TABLE IF NOT EXISTS hotels (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name            TEXT NOT NULL,
  location        TEXT NOT NULL,
  image_url       TEXT,
  rating          NUMERIC(2, 1) CHECK (rating >= 0 AND rating <= 5),
  price_per_night NUMERIC(10, 2) NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Seed data – 3 luxury destinations
-- ============================================================
INSERT INTO destinations (name, location, image_url, rating, price) VALUES
(
  'Santorini Escape',
  'Santorini, Greece',
  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
  4.9,
  2499.00
),
(
  'Maldives Paradise',
  'North Malé Atoll, Maldives',
  'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
  5.0,
  3899.00
),
(
  'Amalfi Coast Journey',
  'Amalfi, Italy',
  'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800',
  4.8,
  2199.00
);

-- ============================================================
-- Seed data – 3 luxury hotels
-- ============================================================
INSERT INTO hotels (name, location, image_url, rating, price_per_night) VALUES
(
  'Canaves Oia Suites',
  'Oia, Santorini, Greece',
  'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
  4.9,
  850.00
),
(
  'Soneva Jani Resort',
  'Noonu Atoll, Maldives',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
  5.0,
  2200.00
),
(
  'Hotel Santa Caterina',
  'Amalfi, Italy',
  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800',
  4.8,
  620.00
);
