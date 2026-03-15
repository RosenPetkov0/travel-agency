"use client"

import { motion } from "framer-motion"
import type { Hotel } from "@/app/page"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function ratingToStars(rating: number | null): number {
  if (rating === null) return 5
  return Math.min(5, Math.round(rating))
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-sm text-[#D4A853]">
          ★
        </span>
      ))}
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturedHotels({ hotels }: { hotels: Hotel[] }) {
  return (
    <section className="relative bg-[#0A1628] px-6 py-24 sm:px-10 lg:px-20 lg:py-32">
      {/* Decorative divider line */}
      <div className="mx-auto mb-20 h-px max-w-xs bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent" />

      {/* ── Section Header ── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mb-16 text-center"
      >
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Featured Hotels
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
        <h2
          className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Stay in Unparalleled
          <br />
          <em className="not-italic text-[#D4A853]">Luxury & Comfort</em>
        </h2>
        <p className="mx-auto max-w-lg text-base leading-relaxed text-white/50 md:text-lg">
          Exquisite accommodations handpicked for their elegance, service, and
          unforgettable experiences
        </p>
      </motion.div>

      {/* ── Cards Grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group cursor-pointer overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(212,168,83,0.12)]"
            style={{
              background: "rgba(10, 22, 40, 0.55)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Image */}
            <div className="relative h-60 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${hotel.image_url ?? ""})` }}
                whileHover={{ scale: 1.08 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94] as const,
                }}
              />
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/10 to-transparent" />

              {/* Price badge */}
              <div
                className="absolute left-4 top-4 rounded-full px-4 py-1.5"
                style={{
                  background: "rgba(10, 22, 40, 0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 168, 83, 0.3)",
                }}
              >
                <span className="text-sm font-bold text-[#D4A853]">
                  {formatPrice(hotel.price_per_night)}
                </span>
                <span className="ml-1 text-xs text-white/40">/ night</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Gold accent line */}
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-16" />

              <div className="mb-1 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{hotel.name}</h3>
                <StarRating count={ratingToStars(hotel.rating)} />
              </div>

              <div className="mb-3 flex items-center gap-1.5">
                <span className="text-xs text-[#D4A853]">📍</span>
                <span className="text-xs font-medium tracking-wide text-white/40">
                  {hotel.location}
                </span>
              </div>

              <p className="mb-5 text-sm leading-relaxed text-white/45">
                A world-class luxury property in {hotel.location}, offering exceptional
                service and unforgettable experiences.
              </p>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full rounded-xl border border-[#D4A853]/30 py-3 text-sm font-semibold tracking-wide text-[#D4A853] transition-all duration-300 hover:border-[#D4A853]/60 hover:bg-[#D4A853]/[0.08] hover:shadow-[0_0_20px_rgba(212,168,83,0.12)]"
              >
                View Details
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
