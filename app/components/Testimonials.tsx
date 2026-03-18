"use client"

import { motion } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "The Monaco F1 experience was beyond words. Lumière's team handled every detail — from paddock access to the most exquisite dining I have ever encountered. Truly once-in-a-lifetime.",
    author: "Sarah M.",
    location: "London, UK",
    initials: "SM",
    gradient: "from-[#D4A853] to-[#C8942F]",
  },
  {
    quote:
      "Lumière arranged everything flawlessly. Our Kyoto itinerary was perfectly balanced — culture, cuisine, and contemplation. I have already booked my next journey with them.",
    author: "James K.",
    location: "New York, USA",
    initials: "JK",
    gradient: "from-[#7C9CBF] to-[#5A7FA8]",
  },
  {
    quote:
      "Our Maldives villa exceeded every expectation. The overwater bungalow, private butler, and bioluminescent beach at night — Lumière truly understands what luxury means.",
    author: "Mei L.",
    location: "Singapore",
    initials: "ML",
    gradient: "from-[#A8D5A2] to-[#7BB875]",
  },
]

// ─── Stars component ──────────────────────────────────────────────────────────

function Stars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5 fill-[#D4A853]"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

// ─── Section component ────────────────────────────────────────────────────────

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] px-4 py-24 sm:px-8 lg:px-14">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "700px",
          height: "400px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mb-16 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Client Stories
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
        <h2
          className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What Our Travellers{" "}
          <em className="not-italic text-[#D4A853]">Say</em>
        </h2>
        <p className="mx-auto max-w-lg text-base leading-relaxed text-white/45">
          Thousands of discerning travellers have trusted Lumière with their most precious
          moments. Here are a few of their stories.
        </p>
      </motion.div>

      {/* ── Cards ── */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.author}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Hover glow */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Top gold bar */}
            <div className="mb-6 h-px w-8 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-14" />

            {/* Stars */}
            <div className="mb-5">
              <Stars />
            </div>

            {/* Opening quote mark */}
            <div
              className="mb-2 text-5xl font-bold leading-none text-[#D4A853]"
              aria-hidden="true"
              style={{ fontFamily: "Georgia, serif", lineHeight: "0.8" }}
            >
              &ldquo;
            </div>

            {/* Quote */}
            <p className="relative flex-1 text-sm leading-[1.85] text-white/65">
              {t.quote}
            </p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              {/* Avatar */}
              <div
                className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-xs font-bold text-white`}
                style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.08)" }}
              >
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{t.author}</div>
                <div className="text-xs text-white/35">{t.location}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
