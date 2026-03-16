"use client"

import { motion } from "framer-motion"

// ─── Footer Link Columns ──────────────────────────────────────────────────────

const FOOTER_COLUMNS = [
  {
    title: "Destinations",
    links: ["Maldives", "Kyoto", "Santorini", "Bali", "Swiss Alps"],
  },
  {
    title: "Hotels",
    links: ["Luxury Resorts", "Boutique Hotels", "Private Villas", "Spa Retreats"],
  },
  {
    title: "About",
    links: ["Our Story", "Team", "Careers", "Press", "Partners"],
  },
  {
    title: "Contact",
    links: ["Help Center", "Live Chat", "Email Us", "Locations"],
  },
]

const SOCIALS = [
  { label: "Instagram", icon: "📸" },
  { label: "Twitter", icon: "𝕏" },
  { label: "Facebook", icon: "🌐" },
  { label: "Pinterest", icon: "📌" },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1628]">
      {/* ═══════════════════ CTA / Newsletter Section ═══════════════════ */}
      <div className="relative overflow-hidden px-4 py-16 sm:px-10 sm:py-24 lg:px-20 lg:py-32">
        {/* Decorative divider */}
        <div className="mx-auto mb-16 h-px max-w-xs bg-gradient-to-r from-transparent via-[#D4A853]/30 to-transparent" />

        {/* Background glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(212, 168, 83, 0.06) 0%, transparent 70%)",
          }}
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="relative z-10 mx-auto max-w-2xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Stay Connected
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>

          <h2
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready for Your Next
            <br />
            <em className="not-italic text-[#D4A853]">Adventure?</em>
          </h2>

          <p className="mb-10 text-base leading-relaxed text-white/50 md:text-lg">
            Subscribe to receive exclusive offers, curated itineraries, and
            insider tips from our travel specialists
          </p>

          {/* Email Input */}
          <div
            className="mx-auto flex max-w-md flex-col gap-3 rounded-2xl p-2.5 sm:flex-row"
            style={{
              background: "rgba(10, 22, 40, 0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3">
              <span className="text-sm text-[#D4A853]">✉</span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="whitespace-nowrap rounded-xl bg-[#D4A853] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,168,83,0.45)]"
            >
              Subscribe
            </motion.button>
          </div>

          <p className="mt-4 text-xs text-white/25">
            No spam. Unsubscribe anytime. Your data is safe with us.
          </p>
        </motion.div>
      </div>

      {/* ═══════════════════ Footer Links ═══════════════════ */}
      <div
        className="border-t px-4 py-12 sm:px-10 lg:px-20"
        style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <motion.span
                animate={{ rotate: [0, 20, 0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="text-lg text-[#D4A853]"
              >
                ✦
              </motion.span>
              <span className="text-lg font-semibold tracking-wide text-white">
                Lumière Travel
              </span>
            </div>
            <p className="mb-6 max-w-xs text-sm leading-relaxed text-white/40">
              Crafting bespoke luxury travel experiences since 2011.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#D4A853]"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {FOOTER_COLUMNS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/70">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="group relative inline-block text-sm text-white/40 transition-colors duration-200 hover:text-[#D4A853]"
                    >
                      {link}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#D4A853]/50 transition-all duration-300 group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════ Bottom Bar ═══════════════════ */}
      <div
        className="border-t px-6 py-6 sm:px-10 lg:px-20"
        style={{ borderColor: "rgba(255, 255, 255, 0.04)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/25">
            © 2026 Lumière Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/25">
            <a href="#" className="transition-colors hover:text-white/50">
              Privacy Policy
            </a>
            <span className="text-white/10">|</span>
            <a href="#" className="transition-colors hover:text-white/50">
              Terms of Service
            </a>
            <span className="text-white/10">|</span>
            <a href="#" className="transition-colors hover:text-white/50">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
