"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: "1",
    title: "Maldives Overwater Romance",
    location: "North Malé Atoll, Maldives",
    description:
      "An intimate escape for two in a private overwater villa with dedicated butler service, sunset dhow cruises, and candlelit beach dining under the stars.",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80",
    price: 6800,
    duration: "8 days",
    rating: 5.0,
    tag: "Honeymoon",
    features: ["Overwater Villa", "Private Butler", "Sunset Cruise"],
  },
  {
    id: "2",
    title: "Swiss Alps Family Adventure",
    location: "Grindelwald, Switzerland",
    description:
      "An unforgettable mountain journey for the whole family — ski lessons on pristine slopes, scenic Jungfrau railway rides, and cozy evenings in a luxury alpine chalet.",
    image:
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=800&q=80",
    price: 5200,
    duration: "10 days",
    rating: 4.9,
    tag: "Family",
    features: ["Ski Lessons", "Scenic Railways", "Alpine Spa"],
  },
  {
    id: "3",
    title: "Mediterranean Luxury Cruise",
    location: "5 Countries · Mediterranean",
    description:
      "Sail the azure Mediterranean aboard a private yacht stopping in Santorini, Amalfi, Monaco, Barcelona, and Dubrovnik — with Michelin-starred dining at every port.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80",
    price: 4500,
    duration: "12 days",
    rating: 4.8,
    tag: "Cruise",
    features: ["Private Yacht", "5 Countries", "Michelin Dining"],
  },
  {
    id: "4",
    title: "Bali Wellness Sanctuary",
    location: "Ubud, Bali",
    description:
      "Immerse yourself in Bali's spiritual heart with daily yoga at sunrise, traditional Balinese healing ceremonies, and rejuvenating jungle spa treatments.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    price: 2900,
    duration: "7 days",
    rating: 4.8,
    tag: "Wellness",
    features: ["Daily Yoga", "Spa Treatments", "Healing Ceremonies"],
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const headerVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const sectionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* ── Top nav ── */}
      <div className="absolute left-0 right-0 top-0 z-50 flex items-center px-4 py-5 sm:px-8 lg:px-14">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-[#D4A853]"
        >
          <span>✦</span>
          <span>Lumière Travel</span>
        </Link>
      </div>

      {/* ── Page header ── */}
      <motion.div
        variants={headerVariant}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center px-4 pb-12 pt-28 text-center sm:pt-36"
      >
        {/* Background glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "700px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(212, 168, 83, 0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative mb-5 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Bespoke Collections
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>

        <h1
          className="relative mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Curated
          <br />
          <em className="not-italic text-[#D4A853]">Packages</em>
        </h1>

        <p className="relative max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
          Meticulously designed travel packages for every kind of traveler — romantic
          escapes, family adventures, and wellness retreats crafted to perfection.
        </p>
      </motion.div>

      {/* ── Package Cards ── */}
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 sm:px-10 md:grid-cols-2 lg:px-20"
      >
        {PACKAGES.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl transition-shadow duration-500 hover:shadow-[0_8px_40px_rgba(212,168,83,0.1)]"
            style={{
              background: "rgba(10, 22, 40, 0.55)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${pkg.image})` }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/10 to-transparent" />

              {/* Tag + Rating */}
              <div className="absolute left-4 top-4">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4A853]"
                  style={{
                    background: "rgba(10, 22, 40, 0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 168, 83, 0.3)",
                  }}
                >
                  {pkg.tag}
                </span>
              </div>

              <div
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{
                  background: "rgba(10, 22, 40, 0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(212, 168, 83, 0.3)",
                }}
              >
                <span className="text-xs text-[#D4A853]">★</span>
                <span className="text-sm font-bold text-[#D4A853]">{pkg.rating.toFixed(1)}</span>
              </div>

              {/* Price + Duration */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/50">From</span>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(pkg.price)}
                    <span className="ml-1 text-sm font-normal text-white/40">/ person</span>
                  </div>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium text-white/70"
                  style={{
                    background: "rgba(10, 22, 40, 0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {pkg.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-16" />

              <div className="mb-2 flex items-start gap-2.5">
                <span className="mt-0.5 text-lg">🌍</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{pkg.title}</h3>
                  <span className="text-xs font-medium tracking-wide text-white/40">{pkg.location}</span>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-white/50">{pkg.description}</p>

              {/* Feature pills */}
              <div className="mb-5 flex flex-wrap gap-2">
                {pkg.features.map((f) => (
                  <span
                    key={f}
                    className="rounded-full px-2.5 py-1 text-xs font-medium text-white/50"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl border border-[#D4A853]/30 py-3 text-sm font-semibold tracking-wide text-[#D4A853] transition-all duration-300 hover:border-[#D4A853]/60 hover:bg-[#D4A853]/[0.08] hover:shadow-[0_0_20px_rgba(212,168,83,0.12)]"
              >
                View Package
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}
