import type { Metadata } from "next"
import HotelsClient from "./HotelsClient"

export const metadata: Metadata = {
  title: "Luxury Hotels",
  description:
    "Discover our handpicked selection of the world's finest 5-star hotels and private resorts — from overwater villas to urban sanctuaries.",
  openGraph: {
    title: "Luxury Hotels | Lumière Travel",
    description:
      "Discover our handpicked selection of the world's finest 5-star hotels and private resorts — from overwater villas to urban sanctuaries.",
  },
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type Hotel = {
  id: string
  name: string
  location: string
  image_url: string | null
  rating: number | null
  price_per_night: number
  description: string | null
}

// ─── Supabase fetch ───────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

async function fetchHotels(): Promise<Hotel[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/hotels?select=*&order=rating.desc`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  )
  if (!res.ok) return []
  return res.json()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HotelsPage() {
  const hotels = await fetchHotels()
  return <HotelsClient hotels={hotels} />
}
