"use client"

import { motion } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  {
    title: "Manage Destinations",
    desc: "Add, edit or remove travel destinations and their metadata.",
    icon: "✈",
    href: "/admin/destinations",
    accent: "from-[#D4A853]/20 to-transparent",
  },
  {
    title: "Manage Hotels",
    desc: "Maintain the hotel catalogue — rates, availability and imagery.",
    icon: "◈",
    href: "/admin/hotels",
    accent: "from-[#7C9CBF]/20 to-transparent",
  },
  {
    title: "View Inquiries",
    desc: "Review and respond to booking enquiries from travellers.",
    icon: "✉",
    href: "/admin/inquiries",
    accent: "from-[#A8D5A2]/20 to-transparent",
  },
]

const STATS = [
  { label: "Total Users", value: "—" },
  { label: "Active Bookings", value: "—" },
  { label: "Destinations", value: "—" },
  { label: "Pending Inquiries", value: "—" },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#0A1628] px-4 pb-20 pt-24 sm:px-8 lg:px-14">

      {/* ── Background glow ── */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 65%)",
        }}
      />

      {/* ── Back link ── */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-[#D4A853]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Back to site
        </Link>
      </motion.div>

      {/* ── Header ── */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4A853]" />
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
          Lumière Travel
        </span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Admin Control Panel
      </motion.h1>

      <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
        className="mb-12 text-sm text-white/40">
        Manage your platform content, users, and incoming enquiries.
      </motion.p>

      {/* ── Stats row ── */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {STATS.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl px-5 py-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="text-2xl font-bold text-white">{s.value}</div>
            <div className="mt-1 text-xs tracking-wide text-white/40">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* ── Section label ── */}
      <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
        className="mb-6 flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D4A853]" />
        <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">Quick Access</span>
      </motion.div>

      {/* ── Quick link cards ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {QUICK_LINKS.map((card, i) => (
          <motion.div
            key={card.title}
            custom={5 + i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5 }}
          >
            <Link href={card.href} className="group block h-full">
              <div
                className="relative h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Hover gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 transition-opacity duration-400 group-hover:opacity-100`}
                />

                {/* Icon */}
                <div
                  className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-lg text-[#D4A853]"
                  style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}
                >
                  {card.icon}
                </div>

                {/* Gold accent line */}
                <div className="mb-4 h-px w-8 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-16" />

                <h3 className="mb-2 text-base font-bold text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/45">{card.desc}</p>

                {/* Arrow */}
                <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#D4A853]/60 transition-colors duration-200 group-hover:text-[#D4A853]">
                  Open
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2.5 6h7M6.5 3l3 3-3 3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </main>
  )
}
