"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Beach & Islands",   emoji: "🏖️", slug: "beach-islands"     },
  { label: "City Breaks",       emoji: "🏙️", slug: "city-breaks"        },
  { label: "Formula 1 Events",  emoji: "🏎️", slug: "formula-1"          },
  { label: "Mountain Escapes",  emoji: "⛰️", slug: "mountain-escapes"   },
  { label: "Cultural Heritage", emoji: "🏛️", slug: "cultural-heritage"  },
  { label: "Luxury Resorts",    emoji: "💎", slug: "luxury-resorts"     },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function TravelCategories() {
  const router = useRouter()

  return (
    <section className="relative overflow-hidden bg-[#0A1628] px-4 py-20 sm:px-8 lg:px-14">
      {/* Subtle bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: "800px",
          height: "300px",
          background: "radial-gradient(ellipse at 50% 100%, rgba(212,168,83,0.07) 0%, transparent 65%)",
        }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mb-12 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Explore by Type
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
        <h2
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Find Your Perfect{" "}
          <em className="not-italic text-[#D4A853]">Journey</em>
        </h2>
      </motion.div>

      {/* ── Category cards ──
          Mobile: horizontal scroll (min-w forces overflow)
          Desktop: 6-column grid
      ── */}
      <div className="relative mx-auto max-w-6xl">
        <div
          className="
            flex gap-4 overflow-x-auto pb-3
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
            sm:overflow-visible sm:pb-0
            sm:grid sm:grid-cols-3
            lg:grid-cols-6
          "
        >
          {CATEGORIES.map((cat, i) => (
            <motion.button
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => router.push(`/destinations?category=${cat.slug}`)}
              className="
                group relative flex min-w-[148px] flex-col items-center justify-center
                gap-3 rounded-2xl px-4 py-7 text-center
                transition-all duration-300 sm:min-w-0
              "
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(212,168,83,0.06)"
                e.currentTarget.style.border = "1px solid rgba(212,168,83,0.45)"
                e.currentTarget.style.boxShadow =
                  "0 0 28px rgba(212,168,83,0.12), inset 0 0 20px rgba(212,168,83,0.04)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"
                e.currentTarget.style.boxShadow = ""
              }}
            >
              {/* Emoji */}
              <span className="text-3xl leading-none" role="img" aria-label={cat.label}>
                {cat.emoji}
              </span>

              {/* Label */}
              <span className="text-xs font-semibold leading-snug text-white/60 transition-colors duration-200 group-hover:text-[#D4A853]">
                {cat.label}
              </span>

              {/* Bottom gold line on hover */}
              <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 rounded-full bg-[#D4A853]/60 transition-all duration-400 group-hover:w-10" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
