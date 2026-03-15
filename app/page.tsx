import HeroSection from "./components/HeroSection"
import DestinationsSection from "./components/DestinationsSection"
import FeaturedHotels from "./components/FeaturedHotels"
import Footer from "./components/Footer"

// ─── Supabase REST helpers (server-only, bypasses supabase-js fetch patching) ─

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
}

async function fetchTable<T>(table: string, order = "rating.desc"): Promise<T[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/${table}?select=*&order=${order}`,
    { headers: supabaseHeaders, cache: "no-store" }
  )
  if (!res.ok) {
    console.error(`[Supabase] Failed to fetch "${table}": ${res.status} ${res.statusText}`)
    return []
  }
  return res.json()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [destinations, hotels] = await Promise.all([
    fetchTable("destinations"),
    fetchTable("hotels"),
  ])

  return (
    <main className="min-h-screen bg-slate-900">
      <HeroSection />
      <DestinationsSection destinations={destinations} />
      <FeaturedHotels hotels={hotels} />
      <Footer />
    </main>
  )
}
