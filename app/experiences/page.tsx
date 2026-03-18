"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

type Category = "All" | "F1 Racing" | "Private Islands" | "Cultural" | "Adventure"

const CATEGORIES: Category[] = ["All", "F1 Racing", "Private Islands", "Cultural", "Adventure"]

const EXPERIENCES = [
  {
    id: "monaco-f1",
    title: "Monaco F1 VIP Weekend",
    location: "Monte Carlo, Monaco",
    category: "F1 Racing" as Category,
    price: 12000,
    duration: "3 days",
    rating: 5.0,
    desc: "Stand inside the world's most glamorous race paddock. VIP garage access, driver meet-and-greet, front-row grandstand, and Michelin-starred harbour dinner beneath a sky of fireworks.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
  },
  {
    id: "singapore-f1",
    title: "Singapore Night Race Experience",
    location: "Marina Bay, Singapore",
    category: "F1 Racing" as Category,
    price: 9500,
    duration: "4 days",
    rating: 4.9,
    desc: "Experience F1 under the stars at the world's only night race. Private hospitality suite on the circuit, rooftop city views, and a curated tour of Singapore's hidden culinary gems.",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&auto=format&fit=crop",
  },
  {
    id: "maldives-island",
    title: "Maldives Private Island Retreat",
    location: "North Malé Atoll, Maldives",
    category: "Private Islands" as Category,
    price: 15000,
    duration: "7 days",
    rating: 5.0,
    desc: "Your own private island, accessible only by seaplane. A personal butler, bioluminescent lagoon, overwater villa, and a private chef crafting menus from the day's catch.",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&auto=format&fit=crop",
  },
  {
    id: "bora-bora",
    title: "Bora Bora Overwater Bungalow",
    location: "Bora Bora, French Polynesia",
    category: "Private Islands" as Category,
    price: 11000,
    duration: "6 days",
    rating: 4.9,
    desc: "Suspended above a turquoise lagoon ringed by coral reefs. Your glass-floor bungalow opens to a private deck, morning snorkelling with manta rays, and sunset champagne cruises.",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop",
  },
  {
    id: "kyoto-arts",
    title: "Kyoto Traditional Arts Immersion",
    location: "Gion District, Kyoto",
    category: "Cultural" as Category,
    price: 4500,
    duration: "5 days",
    rating: 4.8,
    desc: "A rare, intimate journey into centuries of Japanese artistry — private tea ceremony with a maiko, ikebana with a grand master, and kaiseki dining in a lantern-lit machiya.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop",
  },
  {
    id: "swiss-helicopter",
    title: "Swiss Alps Helicopter Tour",
    location: "Grindelwald, Switzerland",
    category: "Adventure" as Category,
    price: 6800,
    duration: "4 days",
    rating: 4.9,
    desc: "Soar over the Eiger, Mönch, and Jungfrau in a private helicopter, then descend onto a glacier for a Champagne picnic. Luxury chalet stay and private ski guide included.",
    image: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?w=800&auto=format&fit=crop",
  },
]

const HERO_BG =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US")
}

// ─── Experience card ──────────────────────────────────────────────────────────

function ExpCard({ exp }: { exp: (typeof EXPERIENCES)[number] }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.93 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.18 } }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -7 }}
      className="group flex flex-col overflow-hidden rounded-3xl transition-shadow duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-[#0A1628]/15 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-4 top-4">
          <span
            className="inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A853]"
            style={{
              background: "rgba(10,22,40,0.72)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(212,168,83,0.3)",
            }}
          >
            {exp.category}
          </span>
        </div>

        {/* Rating */}
        <div
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
          style={{
            background: "rgba(10,22,40,0.68)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(212,168,83,0.25)",
          }}
        >
          <span className="text-xs text-[#D4A853]">★</span>
          <span className="text-sm font-bold text-[#D4A853]">{exp.rating.toFixed(1)}</span>
        </div>

        {/* Price overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-white/45">From</div>
            <div className="text-xl font-bold text-white">
              {fmt(exp.price)}
              <span className="ml-1 text-sm font-normal text-white/40">/person</span>
            </div>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium text-white/65"
            style={{
              background: "rgba(10,22,40,0.6)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {exp.duration}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4 h-px w-10 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-16" />
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/35">
          <span className="text-[#D4A853]/50">✦</span>
          {exp.location}
        </div>
        <h3 className="mb-3 text-lg font-bold leading-snug text-white" style={{ fontFamily: "var(--font-playfair)" }}>
          {exp.title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-relaxed text-white/50">{exp.desc}</p>

        <Link href="/about#contact">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4A853] py-3 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow hover:shadow-[0_0_24px_rgba(212,168,83,0.4)]"
          >
            Book Experience
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ExperiencesPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All")
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  const filtered =
    activeFilter === "All" ? EXPERIENCES : EXPERIENCES.filter((e) => e.category === activeFilter)

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ════════════════════════════════════
          HERO — parallax
      ════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
      >
        {/* Parallax background */}
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-[-20%] bg-cover bg-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG}
            alt="Luxury travel experiences"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0A1628]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/30 via-transparent to-[#0A1628]" />

        {/* Top nav */}
        <div className="absolute left-0 right-0 top-0 z-20 flex items-center px-4 py-6 sm:px-8 lg:px-14">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-[#D4A853]"
          >
            <span className="text-[#D4A853]">✦</span>
            <span>Lumière Travel</span>
          </Link>
        </div>

        {/* Hero content */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 px-4 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
                Curated for the Extraordinary
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
            </div>

            <h1
              className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Extraordinary
              <br />
              <em className="not-italic text-[#D4A853]">Experiences</em>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Six signature experiences — handcrafted for those who refuse to settle
              for anything less than the absolute finest.
            </p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/30">
              Explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-6 w-px bg-gradient-to-b from-[#D4A853]/60 to-transparent"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FILTER TABS + GRID
      ════════════════════════════════════ */}
      <section className="relative px-4 pb-28 pt-16 sm:px-8 lg:px-14">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "800px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(212,168,83,0.04) 0%, transparent 65%)",
          }}
        />

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="relative mb-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="relative overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                style={{
                  background: isActive ? "#D4A853" : "rgba(255,255,255,0.04)",
                  border: isActive ? "1px solid #D4A853" : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#0A1628" : "rgba(255,255,255,0.5)",
                  boxShadow: isActive ? "0 0 24px rgba(212,168,83,0.3)" : "none",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-[#D4A853]"
                    style={{ borderRadius: "inherit" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{cat}</span>
              </button>
            )
          })}
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            layout
            className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((exp) => (
                <ExpCard key={exp.id} exp={exp} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center text-white/30"
              >
                No experiences in this category yet.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ════════════════════════════════════
          CTA BANNER
      ════════════════════════════════════ */}
      <section className="px-4 pb-28 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl text-center"
          style={{
            background: "rgba(212,168,83,0.07)",
            border: "1px solid rgba(212,168,83,0.2)",
            boxShadow: "inset 0 0 60px rgba(212,168,83,0.04)",
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
          <div className="px-8 py-14 sm:px-14">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Bespoke by Design
            </div>
            <h2
              className="mb-4 text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Can&apos;t find what you&apos;re looking for?
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-white/45 sm:text-base">
              Every experience can be fully tailored. Tell us your vision and our
              concierge team will architect something truly one-of-a-kind.
            </p>
            <Link href="/about#contact">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow hover:shadow-[0_0_32px_rgba(212,168,83,0.45)]"
              >
                Contact Our Concierge
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  )
}
