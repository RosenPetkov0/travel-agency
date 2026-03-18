import HeroSection from "./components/HeroSection"
import TravelCategories from "./components/TravelCategories"
import DestinationsSection from "./components/DestinationsSection"
import FeaturedHotels from "./components/FeaturedHotels"
import WhyChooseUs from "./components/WhyChooseUs"
import FeaturedExperiences from "./components/FeaturedExperiences"
import Testimonials from "./components/Testimonials"
import Newsletter from "./components/Newsletter"
import Footer from "./components/Footer"

// ─── Shared types ─────────────────────────────────────────────────────────────

export type Destination = {
  id: string
  name: string
  location: string
  image_url: string | null
  rating: number | null
  price: number
}

export type Hotel = {
  id: string
  name: string
  location: string
  image_url: string | null
  rating: number | null
  price_per_night: number
}

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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const [destinations, hotels] = await Promise.all([
    fetchTable<Destination>("destinations"),
    fetchTable<Hotel>("hotels"),
  ])

  return (
    <main className="min-h-screen bg-[#0A1628]">
      <HeroSection />
      <TravelCategories />
      <DestinationsSection destinations={destinations} />
      <FeaturedHotels hotels={hotels} />
      <WhyChooseUs />
      <FeaturedExperiences />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
