"use client"

import { motion } from "framer-motion"

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "✦",
    title: "Curated Luxury",
    desc: "Every destination is hand-picked and personally vetted by our team of expert travel curators.",
  },
  {
    icon: "📞",
    title: "24/7 Concierge",
    desc: "Your dedicated personal travel advisor is available around the clock — wherever you are in the world.",
  },
  {
    icon: "💰",
    title: "Best Price Guarantee",
    desc: "Find a lower price elsewhere and we will match it — or refund the difference, no questions asked.",
  },
  {
    icon: "⚡",
    title: "Seamless Booking",
    desc: "From your first inquiry to boarding pass in hand — we handle every detail in 48 hours.",
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] px-4 py-24 sm:px-8 lg:px-14">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mb-16 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Why Lumière
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
        <h2
          className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Standard Others{" "}
          <em className="not-italic text-[#D4A853]">Aspire To</em>
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-white/45">
          We do not just book trips. We architect memories — with obsessive attention
          to detail and an unwavering commitment to excellence.
        </p>
      </motion.div>

      {/* ── Feature cards ── */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl p-7 transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Hover glow overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.08) 0%, transparent 70%)",
              }}
            />

            {/* Top gold accent line */}
            <div className="mb-6 h-px w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-16" />

            {/* Icon */}
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[#D4A853]"
              style={{
                background: "rgba(212,168,83,0.08)",
                border: "1px solid rgba(212,168,83,0.18)",
              }}
            >
              {f.icon}
            </div>

            <h3 className="mb-3 text-base font-bold text-white">{f.title}</h3>
            <p className="text-sm leading-relaxed text-white/45">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
