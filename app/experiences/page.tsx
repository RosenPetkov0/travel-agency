"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    id: "1",
    title: "Private African Safari",
    location: "Maasai Mara, Kenya",
    description:
      "Witness the Great Migration in exclusive private conservancies, guided by expert naturalists. Fly-in camps, sundowner cocktails, and Big Five encounters await.",
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    price: 4200,
    duration: "7 days",
    rating: 4.9,
    tag: "Adventure",
  },
  {
    id: "2",
    title: "Culinary Journey Through Tokyo",
    location: "Tokyo, Japan",
    description:
      "From hidden izakayas to private sushi masterclasses, explore Tokyo's extraordinary food culture guided by a Michelin-starred chef.",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
    price: 2800,
    duration: "5 days",
    rating: 4.8,
    tag: "Culinary",
  },
  {
    id: "3",
    title: "Northern Lights Expedition",
    location: "Reykjavik, Iceland",
    description:
      "Chase the Aurora Borealis across Iceland's volcanic landscapes with expert astronomers. Includes glacier walks, geothermal pools, and luxury lodge stays.",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80",
    price: 3600,
    duration: "6 days",
    rating: 5.0,
    tag: "Nature",
  },
  {
    id: "4",
    title: "Ancient Temples of Angkor",
    location: "Siem Reap, Cambodia",
    description:
      "Explore Angkor Wat at sunrise with private access and resident historians. Extend your journey with luxury river cruises along the Mekong.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
    price: 1900,
    duration: "4 days",
    rating: 4.7,
    tag: "Cultural",
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

export default function ExperiencesPage() {
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
            Hand-Picked Journeys
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>

        <h1
          className="relative mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Exclusive
          <br />
          <em className="not-italic text-[#D4A853]">Experiences</em>
        </h1>

        <p className="relative max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
          Extraordinary moments crafted for the most discerning travelers — from private
          safaris to culinary pilgrimages across the world&apos;s greatest cities.
        </p>
      </motion.div>

      {/* ── Experience Cards ── */}
      <motion.div
        variants={sectionFade}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 sm:px-10 md:grid-cols-2 lg:px-20"
      >
        {EXPERIENCES.map((exp) => (
          <motion.div
            key={exp.id}
            variants={cardVariant}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-2xl"
            style={{
              background: "rgba(10, 22, 40, 0.55)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${exp.image})` }}
                whileHover={{ scale: 1.07 }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/85 via-[#0A1628]/10 to-transparent" />

              {/* Tag + Rating row */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span
                  className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4A853]"
                  style={{
                    background: "rgba(10, 22, 40, 0.7)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(212, 168, 83, 0.3)",
                  }}
                >
                  {exp.tag}
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
                <span className="text-sm font-bold text-[#D4A853]">{exp.rating.toFixed(1)}</span>
              </div>

              {/* Duration + Price */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                    From
                  </span>
                  <div className="text-xl font-bold text-white">
                    {formatPrice(exp.price)}
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
                  {exp.duration}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-16" />
              <div className="mb-2 flex items-start gap-2.5">
                <span className="mt-0.5 text-lg">✈️</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                  <span className="text-xs font-medium tracking-wide text-white/40">{exp.location}</span>
                </div>
              </div>
              <p className="mb-5 text-sm leading-relaxed text-white/50">{exp.description}</p>
              <button className="flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-all duration-300 group-hover:gap-3">
                <span>Book Experience</span>
                <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  )
}
