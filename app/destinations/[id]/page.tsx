import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import DestinationGallery from "./DestinationGallery"
import BookingModal from "./BookingModal"

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
const SB_HEADERS = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
}

async function fetchDestination(id: string): Promise<Destination | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/destinations?id=eq.${id}&select=*&limit=1`,
    { headers: SB_HEADERS, cache: "no-store" }
  )
  if (!res.ok) return null
  const rows: Destination[] = await res.json()
  return rows[0] ?? null
}

async function fetchRelated(currentId: string): Promise<Destination[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/destinations?id=neq.${currentId}&select=id,name,location,image_url,rating,price&order=rating.desc&limit=3`,
    { headers: SB_HEADERS, cache: "no-store" }
  )
  if (!res.ok) return []
  return res.json()
}

// ─── Location-keyed static data ───────────────────────────────────────────────

const GALLERY_MAP: Record<string, string[]> = {
  santorini: [
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&auto=format&fit=crop",
  ],
  maldives: [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&auto=format&fit=crop",
  ],
  monaco: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568393691622-c7ba131d1b16?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&auto=format&fit=crop",
  ],
  amalfi: [
    "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534445867742-43195f401b6c?w=600&auto=format&fit=crop",
  ],
  kyoto: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&auto=format&fit=crop",
  ],
}

const DEFAULT_GALLERY = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format&fit=crop",
]

const HIGHLIGHTS_MAP: Record<string, string[]> = {
  santorini: [
    "Sunrise at the iconic Caldera cliffs of Oia",
    "Private catamaran sailing to volcanic hot springs",
    "World-renowned Assyrtiko wine tasting at estate vineyards",
    "Exclusive sunset dinner with panoramic sea views",
  ],
  maldives: [
    "Private overwater villa with glass-floor bathroom",
    "Sunrise snorkelling with manta rays and reef sharks",
    "Sunset champagne cruise on a traditional dhow",
    "Bioluminescent beach experience after dark",
  ],
  monaco: [
    "VIP paddock access at the Monaco Grand Prix",
    "Private yacht charter along the Côte d'Azur",
    "Exclusive dining at Louis XV by Alain Ducasse",
    "Helicopter transfer from Nice International Airport",
  ],
  amalfi: [
    "Private boat tour of hidden sea caves and grottos",
    "Cooking class with a Michelin-starred Neapolitan chef",
    "After-hours private access to Pompeii archaeological ruins",
    "Sunset dinner on a cliffside terrace overlooking the sea",
  ],
  kyoto: [
    "Private tea ceremony with a maiko in a historic teahouse",
    "Dawn visit to Fushimi Inari before the crowds arrive",
    "Ikebana lesson with a grand master in a Zen garden",
    "Exclusive kaiseki dinner in a 300-year-old machiya",
  ],
}

const DEFAULT_HIGHLIGHTS = [
  "Curated private excursions with expert local guides",
  "Michelin-starred dining reservations secured for you",
  "Complimentary luxury airport transfers included",
  "24/7 personal concierge throughout your entire stay",
]

// Best months to visit: 1-indexed (Jan=1, Dec=12)
const BEST_MONTHS_MAP: Record<string, number[]> = {
  greece: [6, 7, 8, 9],
  santorini: [6, 7, 8, 9],
  maldives: [12, 1, 2, 3],
  monaco: [5, 6, 7, 8, 9],
  italy: [5, 6, 9, 10],
  amalfi: [5, 6, 9, 10],
  kyoto: [3, 4, 10, 11],
  japan: [3, 4, 10, 11],
  swiss: [7, 8, 12, 1, 2],
  singapore: [2, 3, 7, 8],
  bora: [5, 6, 7, 8, 9, 10],
}
const DEFAULT_BEST_MONTHS = [4, 5, 9, 10]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const INCLUDED = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 012 1.18C2 .57 2.36.04 3 .01h3A2 2 0 018 1.73c.13 1.05.37 2.09.71 3.08a2 2 0 01-.45 2.11L7.09 8.09a16 16 0 006.82 6.82l1.27-1.27a2 2 0 012.11-.45c.99.34 2.03.58 3.08.71A2 2 0 0122 16.92z" />
        <path d="M14.05 2a9 9 0 018 7.94M14.05 6A5 5 0 0118 10" />
      </svg>
    ),
    title: "Return Flights",
    desc: "Business class seats on premium carriers with lounge access.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Luxury Hotel",
    desc: "5-star accommodation hand-selected by our team of curators.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    title: "Guided Tours",
    desc: "Private expert-led excursions to the finest local landmarks.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    title: "Transfers",
    desc: "Private chauffeured vehicles for all airport and city transfers.",
  },
]

const PLACEHOLDER_DESCRIPTION =
  "Immerse yourself in an unrivalled world of luxury where every detail is crafted to perfection. From the moment you arrive, our dedicated team ensures a seamless, bespoke experience — blending the finest local culture with the highest standards of contemporary hospitality. Whether you seek adventure, tranquillity or refined indulgence, this destination delivers all three in breathtaking harmony."

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveKey(location: string, map: Record<string, unknown>): string | undefined {
  const lower = location.toLowerCase()
  return Object.keys(map).find((k) => lower.includes(k))
}

function getGallery(location: string) {
  const key = resolveKey(location, GALLERY_MAP)
  return key ? GALLERY_MAP[key] : DEFAULT_GALLERY
}

function getHighlights(location: string) {
  const key = resolveKey(location, HIGHLIGHTS_MAP)
  return key ? HIGHLIGHTS_MAP[key] : DEFAULT_HIGHLIGHTS
}

function getBestMonths(location: string): number[] {
  const key = resolveKey(location, BEST_MONTHS_MAP)
  return key ? BEST_MONTHS_MAP[key] : DEFAULT_BEST_MONTHS
}

// ─── Dynamic metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const dest = await fetchDestination(id)
  if (!dest) return {}
  const description =
    dest.description ??
    `Discover ${dest.name} — a breathtaking destination in ${dest.location}. Explore bespoke luxury packages curated by Lumière Travel.`
  return {
    title: dest.name,
    description,
    openGraph: {
      title: `${dest.name} | Lumière Travel`,
      description,
      images: dest.image_url
        ? [{ url: dest.image_url, width: 1200, height: 630, alt: dest.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${dest.name} | Lumière Travel`,
      description,
      images: dest.image_url ? [dest.image_url] : [],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [dest, related] = await Promise.all([
    fetchDestination(id),
    fetchRelated(id),
  ])
  if (!dest) notFound()

  const formattedPrice = "$" + dest.price.toLocaleString("en-US", { minimumFractionDigits: 0 })
  const description = dest.description ?? PLACEHOLDER_DESCRIPTION
  const gallery = getGallery(dest.location)
  const highlights = getHighlights(dest.location)
  const bestMonths = getBestMonths(dest.location)

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ════════════════ HERO ════════════════ */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        {dest.image_url && (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-[10s] ease-out"
            style={{ backgroundImage: `url(${dest.image_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-[#0A1628]/20 to-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/40 to-transparent" />

        <Link
          href="/destinations"
          className="absolute left-6 top-24 z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white/75 transition-colors hover:text-[#D4A853]"
          style={{
            background: "rgba(10,22,40,0.55)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Destinations
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-14 text-center sm:px-12">
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-[#D4A853]/70 text-xs">✦</span>
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
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(dest.rating!) ? "fill-[#D4A853]" : "fill-white/15"}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-bold text-[#D4A853]">
                {dest.rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════ CONTENT ════════════════ */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-14">

        {/* ── Photo Gallery ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Gallery</span>
          </div>
          <DestinationGallery images={gallery} name={dest.name} />
        </section>

        {/* ── Overview ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Overview</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            <p className="text-lg leading-[1.9] text-white/60">{description}</p>

            {/* Price + CTA card */}
            <div
              className="flex flex-col justify-between gap-6 rounded-2xl px-8 py-8"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
            >
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.3em] text-white/35">Starting from</p>
                <p className="text-5xl font-bold text-white">{formattedPrice}</p>
                <p className="mt-1 text-sm text-white/35">per person</p>
              </div>
              <div className="flex flex-col gap-3">
                <BookingModal destinationName={dest.name} price={formattedPrice} />
                <Link
                  href={`/about?location=${encodeURIComponent(dest.name)}#contact`}
                  className="w-full rounded-full border border-white/15 px-8 py-3.5 text-center text-sm font-medium text-white/60 transition-all hover:border-white/30 hover:text-white"
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
          <span className="text-[#D4A853]/60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Highlights ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Highlights</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {highlights.map((h) => (
              <div
                key={h}
                className="group flex items-start gap-4 rounded-2xl px-6 py-5 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full"
                  style={{ background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.3)" }}
                >
                  <svg className="h-3 w-3 text-[#D4A853]" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </div>
                <span className="text-sm leading-relaxed text-white/65">{h}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Best Time to Visit ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Best Time to Visit</span>
          </div>
          <div className="grid grid-cols-6 gap-2 sm:grid-cols-12">
            {MONTHS.map((month, i) => {
              const monthNum = i + 1
              const isRecommended = bestMonths.includes(monthNum)
              return (
                <div
                  key={month}
                  className="flex flex-col items-center gap-1.5 rounded-xl py-3 text-center transition-all duration-300"
                  style={{
                    background: isRecommended ? "rgba(212,168,83,0.12)" : "rgba(255,255,255,0.03)",
                    border: isRecommended
                      ? "1px solid rgba(212,168,83,0.35)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="text-xs font-bold"
                    style={{ color: isRecommended ? "#D4A853" : "rgba(255,255,255,0.35)" }}
                  >
                    {month}
                  </span>
                  {isRecommended && (
                    <div className="h-1 w-1 rounded-full bg-[#D4A853]" />
                  )}
                </div>
              )
            })}
          </div>
          <p className="mt-4 text-xs text-white/30">
            <span className="inline-block h-2 w-2 rounded-full bg-[#D4A853] mr-1.5 align-middle" />
            Highlighted months indicate the ideal travel window for this destination.
          </p>
        </section>

        {/* ── Divider ── */}
        <div className="mb-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[#D4A853]/60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Included in Package ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Included in Package</span>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl text-[#D4A853]"
                  style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45">{item.desc}</p>
                </div>
                <div className="h-px w-0 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Premium Amenities ── */}
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Premium Amenities</span>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "🛎️", title: "24/7 Concierge", desc: "Round-the-clock personal assistance for every request, from restaurant reservations to private excursions." },
              { icon: "🚘", title: "Private Chauffeur", desc: "Chauffeured luxury vehicle at your disposal throughout the entire duration of your stay." },
              { icon: "💆", title: "Spa & Wellness", desc: "Exclusive access to world-class spa facilities including thermal pools, massages and holistic treatments." },
              { icon: "🍽️", title: "Michelin Dining", desc: "Curated dining experiences at Michelin-starred restaurants with a dedicated private sommelier." },
            ].map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                  style={{ background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.2)" }}>
                  {a.icon}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-white">{a.title}</h3>
                <p className="text-xs leading-relaxed text-white/45">{a.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Destinations ── */}
        {related.length > 0 && (
          <section>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
                You Might Also Love
              </span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.id} href={`/destinations/${r.id}`} className="group block">
                  <div
                    className="overflow-hidden rounded-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
                    style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      {r.image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={r.image_url}
                          alt={r.name}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="h-full w-full bg-white/5" />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/10 to-transparent" />
                      <div className="absolute bottom-3 left-4">
                        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{r.location}</div>
                        <div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>{r.name}</div>
                      </div>
                    </div>
                    {/* Footer */}
                    <div
                      className="flex items-center justify-between px-4 py-3.5"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <span className="text-sm font-bold text-[#D4A853]">
                        ${r.price.toLocaleString()}
                        <span className="ml-1 text-xs font-normal text-white/30">/person</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#D4A853]/60 transition-colors group-hover:text-[#D4A853]">
                        View
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
