-- ============================================================
-- F1 Destinations – Run after database_setup.sql
-- Supabase SQL Editor → New Query → Run
-- ============================================================

-- Add description column (safe – skipped if already exists)
ALTER TABLE destinations
  ADD COLUMN IF NOT EXISTS description TEXT;

-- Backfill descriptions for existing rows
UPDATE destinations SET description =
  'Experience the breathtaking caldera views, sun-drenched cliffs and world-famous sunsets of the Aegean jewel.'
  WHERE name = 'Santorini Escape';

UPDATE destinations SET description =
  'Float above turquoise lagoons in an overwater bungalow surrounded by pristine coral reefs and absolute serenity.'
  WHERE name = 'Maldives Paradise';

UPDATE destinations SET description =
  'Wind along dramatic sea cliffs lined with pastel villages, fragrant lemon groves and centuries-old fishing harbours.'
  WHERE name = 'Amalfi Coast Journey';

-- ── F1 Destinations ──────────────────────────────────────────────────────────

INSERT INTO destinations (name, location, image_url, rating, price, description) VALUES
(
  'Monaco Grand Prix',
  'Monaco, French Riviera',
  'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
  5.0,
  8900.00,
  'The crown jewel of Formula 1 — race through the legendary streets of Monte Carlo, from Casino Square to the tunnel, surrounded by superyachts and the glamour of the Riviera. Includes VIP paddock access, Hospitality Suite and a private yacht berth.'
),
(
  'Abu Dhabi Yas Marina',
  'Yas Island, Abu Dhabi, UAE',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  4.9,
  6500.00,
  'Witness the season finale under the stars at Yas Marina Circuit — ultra-modern grandstands, VIP yacht access and the iconic W Hotel straddling the track combine for an unforgettable finale. Includes Main Grandstand passes and desert safari excursion.'
),
(
  'Singapore Night Race',
  'Marina Bay, Singapore',
  'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=80',
  4.9,
  7200.00,
  'The world''s first F1 night race illuminates Marina Bay''s glittering skyline as cars thunder past landmarks at 300 km/h — a sensory spectacle blending speed, light and the vibrant energy of Singapore. Includes Pit Lane Walk and Fullerton Hotel stay.'
);
