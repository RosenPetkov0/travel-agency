import Link from "next/link"
import { notFound } from "next/navigation"
// Link is used for both Back and Book Now CTA

// ─── Types ────────────────────────────────────────────────────────────────────

type Destination = {
  id: string
  name: string
  location: string
  image_url: string | null
  rating: number | null
  price: number
  description?: string | null
}

// ─── Supabase fetch ───────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
}

async function fetchDestination(id: string): Promise<Destination | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/destinations?id=eq.${id}&select=*&limit=1`,
    { headers: supabaseHeaders, cache: "no-store" }
  )
  if (!res.ok) return null
  const rows: Destination[] = await res.json()
  return rows[0] ?? null
}

// ─── Static data ──────────────────────────────────────────────────────────────

const AMENITIES = [
  {
    icon: "🛎️",
    title: "24/7 Concierge",
    desc: "Round-the-clock personal assistance for every request, from restaurant reservations to private excursions.",
  },
  {
    icon: "🚘",
    title: "Private Chauffeur",
    desc: "Chauffeured luxury vehicle at your disposal throughout the entire duration of your stay.",
  },
  {
    icon: "💆",
    title: "Spa & Wellness",
    desc: "Exclusive access to world-class spa facilities including thermal pools, massages and holistic treatments.",
  },
  {
    icon: "🍽️",
    title: "Michelin Dining",
    desc: "Curated dining experiences at Michelin-starred restaurants with a dedicated private sommelier.",
  },
]

const PLACEHOLDER_DESCRIPTION =
  "Immerse yourself in an unrivalled world of luxury where every detail is crafted to perfection. From the moment you arrive, our dedicated team ensures a seamless, bespoke experience — blending the finest local culture with the highest standards of contemporary hospitality. Whether you seek adventure, tranquillity or refined indulgence, this destination delivers all three in breathtaking harmony."

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const dest = await fetchDestination(id)
  if (!dest) notFound()

  const formattedPrice =
    "$" + dest.price.toLocaleString("en-US", { minimumFractionDigits: 0 })
  const description = dest.description ?? PLACEHOLDER_DESCRIPTION

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ── Full-screen Hero ── */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        {dest.image_url && (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: `url(${dest.image_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-[#0A1628]/25 to-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/45 to-transparent" />

        {/* Back button */}
        <Link
          href="/destinations"
          className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:text-[#D4A853]"
          style={{
            background: "rgba(10, 22, 40, 0.55)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          ← Back
        </Link>

        {/* Hero text – bottom-centred */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 text-center sm:px-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-[#D4A853]">📍</span>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">
              {dest.location}
            </span>
          </div>
          <h1
            className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {dest.name}
          </h1>
          {dest.rating != null && (
            <div className="flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < Math.round(dest.rating!)
                      ? "text-lg text-[#D4A853]"
                      : "text-lg text-white/20"
                  }
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm font-bold text-[#D4A853]">
                {dest.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-16">

        {/* ── Overview ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
              Overview
            </span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <p className="text-lg leading-[1.85] text-white/60">{description}</p>

            {/* Price + CTA */}
            <div
              className="flex flex-col justify-between gap-6 rounded-2xl px-8 py-8"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
              }}
            >
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-white/35">
                  Starting from
                </p>
                <p className="text-5xl font-bold text-white">
                  {formattedPrice}
                </p>
                <p className="mt-1 text-sm text-white/35">per person</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/about?location=${encodeURIComponent(dest.name)}#contact`}
                  className="w-full rounded-full bg-[#D4A853] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.55)]"
                >
                  Book Now
                </Link>
                <Link
                  href={`/about?location=${encodeURIComponent(dest.name)}#contact`}
                  className="w-full rounded-full border border-white/15 px-8 py-3.5 text-center text-sm font-medium text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  Request Itinerary
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mb-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[#D4A853] opacity-60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Premium Amenities ── */}
        <section className="mb-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
              Premium Amenities
            </span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AMENITIES.map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{
                    background: "rgba(212, 168, 83, 0.12)",
                    border: "1px solid rgba(212, 168, 83, 0.2)",
                  }}
                >
                  {a.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{a.title}</h3>
                <p className="text-xs leading-relaxed text-white/45">{a.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
