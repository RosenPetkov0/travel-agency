-- ─── Real Luxury Hotels ──────────────────────────────────────────────────────
-- Run this in your Supabase SQL Editor to seed 4 iconic luxury hotels.
INSERT INTO hotels (
    name,
    location,
    image_url,
    rating,
    price_per_night,
    description
  )
VALUES (
    'Burj Al Arab',
    'Dubai, UAE',
    'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80',
    5.0,
    2800,
    'The world''s most iconic 7-star hotel — a sail-shaped marvel rising from its own island.'
  ),
  (
    'Aman Tokyo',
    'Tokyo, Japan',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    4.9,
    1200,
    'Serene urban sanctuary on the 33rd floor with panoramic views of the Imperial Palace.'
  ),
  (
    'Six Senses Zil Pasyon',
    'Félicité Island, Seychelles',
    'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    5.0,
    3500,
    'Private island resort with 30 exclusive villas, infinity pools and pristine coral reefs.'
  ),
  (
    'Nayara Tented Camp',
    'Arenal, Costa Rica',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&q=80',
    4.8,
    890,
    'Luxury glamping in the rainforest with views of the iconic Arenal Volcano.'
  );