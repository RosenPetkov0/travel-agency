import Link from "next/link"
import { notFound } from "next/navigation"

// ─── Types ────────────────────────────────────────────────────────────────────

type Hotel = {
  id: string
  name: string
  location: string
  image_url: string | null
  rating: number | null
  price_per_night: number
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

async function fetchHotel(id: string): Promise<Hotel | null> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/hotels?id=eq.${id}&select=*&limit=1`,
    { headers: supabaseHeaders, cache: "no-store" }
  )
  if (!res.ok) return null
  const rows: Hotel[] = await res.json()
  return rows[0] ?? null
}

async function fetchRelated(currentId: string): Promise<Hotel[]> {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/hotels?id=neq.${currentId}&select=*&limit=3`,
    { headers: supabaseHeaders, cache: "no-store" }
  )
  if (!res.ok) return []
  return res.json()
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={filled ? "#D4A853" : "none"}
      stroke={filled ? "#D4A853" : "rgba(255,255,255,0.2)"}
      strokeWidth="1.5"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" fill="#D4A853" stroke="none" />
    </svg>
  )
}

function PoolIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12h20" />
      <path d="M2 17c1.5 0 3-1 4.5-1s3 1 4.5 1 3-1 4.5-1 3 1 4.5 1" />
      <path d="M6 12V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5" />
    </svg>
  )
}

function SpaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4.97 0-9-3.58-9-8 0-3.5 2-6.5 5-7.94V5a2 2 0 0 1 4 0v1.06c3 1.44 5 4.44 5 7.94 0 4.42-4.03 8-9 8z" />
      <path d="M12 8c0 0-3 2-3 5s3 5 3 5 3-2 3-5-3-5-3-5z" />
    </svg>
  )
}

function RestaurantIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  )
}

function GymIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 5v14M18 5v14" />
      <path d="M2 9v6M22 9v6" />
      <path d="M6 12h12" />
      <path d="M2 12h4M18 12h4" />
    </svg>
  )
}

function BarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22h8M12 11v11" />
      <path d="M20 2H4l5.5 9.5a2 2 0 0 0 1.74 1H13a2 2 0 0 0 1.74-1L20 2z" />
    </svg>
  )
}

function ParkingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  )
}

function ACIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="8" rx="2" />
      <path d="M7 14v4M12 14v4M17 14v4" />
      <path d="M6 10h.01M9 10h6" />
    </svg>
  )
}

// ─── Static data ──────────────────────────────────────────────────────────────

const AMENITIES = [
  { icon: <WifiIcon />, title: "High-Speed WiFi", desc: "Complimentary ultra-fast fiber internet throughout the property" },
  { icon: <PoolIcon />, title: "Infinity Pool", desc: "Heated outdoor pool with panoramic views, open sunrise to midnight" },
  { icon: <SpaIcon />, title: "Luxury Spa", desc: "Full-service wellness centre with therapists, thermal baths and sauna" },
  { icon: <RestaurantIcon />, title: "Fine Dining", desc: "Signature restaurant helmed by award-winning chefs, open for all meals" },
  { icon: <GymIcon />, title: "Fitness Centre", desc: "State-of-the-art gym with personal trainers available on request" },
  { icon: <BarIcon />, title: "Rooftop Bar", desc: "Craft cocktails and rare spirits with breathtaking skyline views" },
  { icon: <ParkingIcon />, title: "Valet Parking", desc: "Complimentary 24/7 valet parking and private garage available" },
  { icon: <ACIcon />, title: "Climate Control", desc: "Individual room climate systems with smart automation per suite" },
]

const PLACEHOLDER_DESCRIPTION =
  "Nestled in one of the world's most coveted locations, this exceptional property redefines the meaning of luxury hospitality. Meticulously designed suites blend local artistry with contemporary elegance, while our dedicated team anticipates your every need. From sunrise breakfasts on your private terrace to moonlit dinners by the water, every moment here becomes a treasured memory."

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HotelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [hotel, related] = await Promise.all([fetchHotel(id), fetchRelated(id)])
  if (!hotel) notFound()

  const formattedPrice =
    "$" +
    hotel.price_per_night.toLocaleString("en-US", { minimumFractionDigits: 0 })
  const description = hotel.description ?? PLACEHOLDER_DESCRIPTION

  const rooms = [
    {
      type: "Deluxe Room",
      size: "52 m²",
      guests: "2 guests",
      price: hotel.price_per_night,
      features: ["King-size bed", "City or garden view", "Marble bathroom", "Private balcony"],
    },
    {
      type: "Junior Suite",
      size: "88 m²",
      guests: "2 guests",
      price: Math.round(hotel.price_per_night * 1.6),
      features: ["Separate living area", "Panoramic view", "Walk-in wardrobe", "Soaking tub"],
    },
    {
      type: "Presidential Suite",
      size: "180 m²",
      guests: "4 guests",
      price: Math.round(hotel.price_per_night * 2.5),
      features: ["Private dining room", "Butler service", "Rooftop terrace", "Bespoke amenities"],
    },
  ]

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ── Full-screen Hero ── */}
      <div className="relative h-[75vh] w-full overflow-hidden">
        {hotel.image_url && (
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: `url(${hotel.image_url})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/40 via-[#0A1628]/25 to-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/45 to-transparent" />

        {/* Back button */}
        <Link
          href="/"
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
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/55">
              {hotel.location}
            </span>
          </div>
          <h1
            className="mb-5 text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {hotel.name}
          </h1>
          {hotel.rating != null && (
            <div className="flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} filled={i < Math.round(hotel.rating!)} />
              ))}
              <span className="ml-2.5 text-sm font-bold text-[#D4A853]">
                {hotel.rating.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-white/35">/ 5.0</span>
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
                  From per night
                </p>
                <p className="text-5xl font-bold text-white">
                  {formattedPrice}
                </p>
                <p className="mt-1 text-sm text-white/35">per night</p>
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`/about?location=${encodeURIComponent(hotel.name)}#contact`}
                  className="w-full rounded-full bg-[#D4A853] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.55)]"
                >
                  Reserve
                </Link>
                <Link
                  href={`/about?location=${encodeURIComponent(hotel.name)}#contact`}
                  className="w-full rounded-full border border-white/15 px-8 py-3.5 text-center text-sm font-medium text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  View Availability
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {AMENITIES.map((a) => (
              <div
                key={a.title}
                className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(212, 168, 83, 0.12)",
                    border: "1px solid rgba(212, 168, 83, 0.2)",
                  }}
                >
                  {a.icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">{a.title}</h3>
                <p className="text-xs leading-relaxed text-white/45">{a.desc}</p>
                <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mb-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[#D4A853] opacity-60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Room Types ── */}
        <section className="mb-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
              Room Types
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {rooms.map((room, idx) => (
              <div
                key={room.type}
                className="relative flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: idx === 1
                    ? "rgba(212, 168, 83, 0.07)"
                    : "rgba(255, 255, 255, 0.04)",
                  border: idx === 1
                    ? "1px solid rgba(212, 168, 83, 0.25)"
                    : "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                {idx === 1 && (
                  <div
                    className="absolute right-5 top-5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0A1628]"
                    style={{ background: "#D4A853" }}
                  >
                    Most Popular
                  </div>
                )}

                <p className="mb-1 text-xs font-medium uppercase tracking-[0.25em] text-white/35">
                  {room.size} · {room.guests}
                </p>
                <h3
                  className="mb-4 text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {room.type}
                </h3>

                <ul className="mb-8 space-y-2.5 flex-1">
                  {room.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/55">
                      <svg
                        className="mt-0.5 shrink-0"
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="7" stroke="rgba(212,168,83,0.35)" strokeWidth="1" />
                        <path d="M5 8l2 2 4-4" stroke="#D4A853" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <p className="mb-1 text-xs text-white/30 uppercase tracking-widest">From</p>
                  <p className="text-2xl font-bold text-white">
                    ${room.price.toLocaleString("en-US")}
                    <span className="ml-1 text-sm font-normal text-white/35">/night</span>
                  </p>
                  <Link
                    href={`/about?location=${encodeURIComponent(hotel.name + " — " + room.type)}#contact`}
                    className="mt-4 block w-full rounded-full py-3 text-center text-xs font-bold uppercase tracking-widest transition-all duration-300"
                    style={
                      idx === 1
                        ? { background: "#D4A853", color: "#0A1628" }
                        : {
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.6)",
                          }
                    }
                  >
                    Book This Room
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="mb-20 flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <span className="text-[#D4A853] opacity-60">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </div>

        {/* ── Location ── */}
        <section className="mb-20">
          <div className="mb-10 flex items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
              Location
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Map placeholder */}
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                height: "360px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Grid lines */}
              <svg
                className="absolute inset-0 h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                    <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>

              {/* Radial glow centre */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "260px",
                  height: "260px",
                  background: "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 70%)",
                }}
              />

              {/* Decorative roads */}
              <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 180 Q 200 160 400 200 T 800 170" stroke="rgba(255,255,255,0.06)" strokeWidth="8" fill="none" />
                <path d="M 0 220 Q 150 210 300 230 T 800 210" stroke="rgba(255,255,255,0.04)" strokeWidth="5" fill="none" />
                <path d="M 300 0 Q 320 150 310 360" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
                <path d="M 460 0 Q 450 180 465 360" stroke="rgba(255,255,255,0.04)" strokeWidth="4" fill="none" />
              </svg>

              {/* Pin marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                {/* Pulse ring */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "rgba(212,168,83,0.15)",
                    animationDuration: "2s",
                  }}
                />
                {/* Pin */}
                <div
                  className="relative flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
                  style={{
                    background: "#D4A853",
                    boxShadow: "0 0 24px rgba(212,168,83,0.55)",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A1628" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" fill="#0A1628" stroke="none" />
                  </svg>
                </div>
                {/* Stem shadow */}
                <div className="mx-auto mt-0.5 h-1.5 w-3 rounded-full" style={{ background: "rgba(0,0,0,0.3)" }} />
              </div>

              {/* Address chip overlay */}
              <div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-5 py-2.5 text-xs font-medium text-white/70"
                style={{
                  background: "rgba(10,22,40,0.8)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                📍 {hotel.location}
              </div>
            </div>

            {/* Address card */}
            <div
              className="flex flex-col gap-5 rounded-2xl p-7"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Address</p>
                <p className="text-sm leading-relaxed text-white/60">
                  {hotel.name}<br />
                  {hotel.location}
                </p>
              </div>

              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Nearest Airport</p>
                <p className="text-sm text-white/50">Within 45 min private transfer</p>
              </div>

              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">Transfers</p>
                <p className="text-sm text-white/50">Complimentary private airport transfer included with all bookings</p>
              </div>

              <Link
                href={`/about?location=${encodeURIComponent(hotel.name)}#contact`}
                className="mt-auto block w-full rounded-full border border-white/15 py-3 text-center text-xs font-semibold uppercase tracking-widest text-white/55 transition-all duration-300 hover:border-[#D4A853]/40 hover:text-[#D4A853]"
              >
                Get Directions
              </Link>
            </div>
          </div>
        </section>

        {/* ── Related Hotels ── */}
        {related.length > 0 && (
          <>
            <div className="mb-20 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <span className="text-[#D4A853] opacity-60">✦</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            <section className="mb-8">
              <div className="mb-10 flex items-center gap-3">
                <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
                  More Properties
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((h) => (
                  <Link key={h.id} href={`/hotels/${h.id}`} className="group block overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                    <div className="relative h-48 overflow-hidden">
                      {h.image_url ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${h.image_url})` }}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-white/5" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 to-transparent" />
                    </div>
                    <div
                      className="px-5 py-4"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderTop: "none",
                      }}
                    >
                      <p className="mb-0.5 text-xs text-white/35">{h.location}</p>
                      <p className="font-semibold text-white">{h.name}</p>
                      <p className="mt-1 text-sm text-[#D4A853]">
                        ${h.price_per_night.toLocaleString("en-US")}/night
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}

      </div>
    </main>
  )
}
