"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { useRef } from "react"
import type { Hotel } from "./page"

// ─── Types ────────────────────────────────────────────────────────────────────

type SortKey = "default" | "price-asc" | "price-desc" | "rating-desc"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0 })
}

function ratingStars(rating: number | null): number {
  if (rating == null) return 5
  return Math.min(5, Math.round(rating))
}

// ─── Star Row ─────────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: number | null }) {
  const filled = ratingStars(rating)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i < filled ? "#D4A853" : "none"}
          stroke={i < filled ? "#D4A853" : "rgba(255,255,255,0.18)"}
          strokeWidth="1.6"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      {rating != null && (
        <span className="ml-1.5 text-xs font-semibold text-[#D4A853]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────

function HotelCard({ hotel, index }: { hotel: Hotel; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_12px_48px_rgba(212,168,83,0.13)]"
      style={{
        background: "rgba(10,22,40,0.6)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden sm:h-72">
        {hotel.image_url ? (
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hotel.image_url})` }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        ) : (
          <div className="absolute inset-0 bg-white/5" />
        )}
        {/* Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/15 to-transparent" />

        {/* Price badge */}
        <div
          className="absolute left-4 top-4 rounded-full px-4 py-1.5"
          style={{
            background: "rgba(10,22,40,0.7)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(212,168,83,0.35)",
          }}
        >
          <span className="text-sm font-bold text-[#D4A853]">
            {formatPrice(hotel.price_per_night)}
          </span>
          <span className="ml-1 text-xs text-white/40">/night</span>
        </div>

        {/* Location chip – bottom-left */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
          <span className="text-xs text-[#D4A853]">📍</span>
          <span className="text-xs font-medium text-white/65">{hotel.location}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Gold accent line */}
        <div className="mb-4 h-0.5 w-8 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-14" />

        <div className="mb-2 flex items-start justify-between gap-3">
          <h3
            className="text-lg font-bold leading-snug text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {hotel.name}
          </h3>
          <Stars rating={hotel.rating} />
        </div>

        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-white/45">
          {hotel.description ??
            `A world-class luxury property in ${hotel.location}, offering exceptional service and unforgettable experiences.`}
        </p>

        <Link
          href={`/hotels/${hotel.id}`}
          className="block w-full rounded-2xl border border-[#D4A853]/30 py-3 text-center text-sm font-semibold tracking-wide text-[#D4A853] transition-all duration-300 hover:border-[#D4A853]/60 hover:bg-[#D4A853]/[0.08] hover:shadow-[0_0_24px_rgba(212,168,83,0.12)]"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Filter Button ────────────────────────────────────────────────────────────

function FilterBtn({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
      style={
        active
          ? {
              background: "rgba(212,168,83,0.15)",
              border: "1px solid rgba(212,168,83,0.5)",
              color: "#D4A853",
            }
          : {
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.5)",
            }
      }
    >
      {label}
    </button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HotelsClient({ hotels }: { hotels: Hotel[] }) {
  const [sort, setSort] = useState<SortKey>("default")
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 140])
  const heroOpacity = useTransform(scrollY, [0, 320], [1, 0])

  const sorted = useMemo(() => {
    const arr = [...hotels]
    if (sort === "price-asc") arr.sort((a, b) => a.price_per_night - b.price_per_night)
    if (sort === "price-desc") arr.sort((a, b) => b.price_per_night - a.price_per_night)
    if (sort === "rating-desc") arr.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    return arr
  }, [hotels, sort])

  const FILTERS: { label: string; key: SortKey }[] = [
    { label: "Featured", key: "default" },
    { label: "Price: Low → High", key: "price-asc" },
    { label: "Price: High → Low", key: "price-desc" },
    { label: "Top Rated", key: "rating-desc" },
  ]

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <div ref={heroRef} className="relative flex h-[88vh] min-h-[580px] items-end overflow-hidden">
        {/* Parallax background */}
        <motion.div
          className="absolute inset-0 -top-[15%] bg-cover bg-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80)",
            y: heroY,
          }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0A1628]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/20 via-transparent to-[#0A1628]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/50 to-transparent" />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full px-6 pb-20 sm:px-10 lg:px-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-5 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Lumière Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Luxury Hotels
            <br />
            <em className="not-italic text-[#D4A853]">&amp; Resorts</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
            className="max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
          >
            Handpicked sanctuaries of refinement — from iconic city towers to
            secluded island retreats — each chosen for the singular experience they offer.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="mt-10 flex items-center gap-8"
          >
            {[
              { value: `${hotels.length}`, label: "Properties" },
              { value: "5★", label: "Avg Rating" },
              { value: "24/7", label: "Concierge" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/35 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
              Scroll
            </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(212,168,83,0.5)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════
          FILTER BAR
      ══════════════════════════════════════════ */}
      <div className="sticky top-0 z-40 bg-[#0A1628]/80" style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-10 lg:px-20">
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => (
              <FilterBtn
                key={f.key}
                label={f.label}
                active={sort === f.key}
                onClick={() => setSort(f.key)}
              />
            ))}
          </div>
          <span className="hidden shrink-0 text-xs text-white/30 sm:block">
            {sorted.length} {sorted.length === 1 ? "property" : "properties"}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          GRID
      ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/8" />
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
              Our Collection
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/8" />
        </motion.div>

        {/* Cards */}
        {sorted.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-3xl py-24 text-center"
            style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
          >
            <span className="mb-3 block text-4xl text-[#D4A853]/30">🏨</span>
            <p className="text-sm text-white/30">No hotels found.</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={sort}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid gap-8 sm:grid-cols-2"
            >
              {sorted.map((hotel, i) => (
                <HotelCard key={hotel.id} hotel={hotel} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Divider */}
        <div className="mx-auto mb-0 flex items-center gap-4 px-6 sm:px-10 lg:px-20">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/8" />
          <span className="text-[#D4A853]/40">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/8" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-10"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]/70">
            Bespoke Service
          </p>
          <h2
            className="mb-5 text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Can&apos;t find your perfect stay?
          </h2>
          <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/45">
            Our travel advisors curate entirely bespoke accommodation for every destination,
            including unlisted private villas and residences.
          </p>
          <Link
            href="/about#contact"
            className="inline-block rounded-full bg-[#D4A853] px-10 py-4 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_48px_rgba(212,168,83,0.5)]"
          >
            Speak to an Advisor
          </Link>
        </motion.div>
      </section>

    </main>
  )
}
