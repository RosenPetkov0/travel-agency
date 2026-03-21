"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const DESTINATIONS_LINKS = [
  { label: "Maldives",           href: "/destinations" },
  { label: "Santorini",          href: "/destinations" },
  { label: "Bali",               href: "/destinations" },
  { label: "Monaco Grand Prix",  href: "/destinations" },
  { label: "Amalfi Coast",       href: "/destinations" },
  { label: "Kyoto",              href: "/destinations" },
]

const COMPANY_LINKS = [
  { label: "About Us",    href: "/about" },
  { label: "Experiences", href: "/experiences" },
  { label: "Packages",    href: "/packages" },
  { label: "Hotels",      href: "/hotels" },
  { label: "Contact",     href: "/" },
]

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.27-5.36 1.27-5.36s-.32-.65-.32-1.6c0-1.5.87-2.62 1.95-2.62.92 0 1.37.69 1.37 1.52 0 .93-.59 2.31-.9 3.6-.25 1.07.53 1.94 1.59 1.94 1.9 0 3.18-2.44 3.18-5.33 0-2.19-1.47-3.83-4.12-3.83-3.01 0-4.9 2.25-4.9 4.77 0 .87.26 1.47.66 1.94.18.22.21.31.14.56-.05.18-.16.62-.2.79-.07.25-.28.34-.51.25-1.41-.58-2.07-2.13-2.07-3.88 0-2.9 2.45-6.41 7.31-6.41 3.91 0 6.47 2.84 6.47 5.88 0 4.03-2.23 7.06-5.51 7.06-1.1 0-2.14-.59-2.5-1.26l-.68 2.62c-.25.93-.91 2.1-1.36 2.81.52.16 1.06.24 1.62.24 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
      </svg>
    ),
  },
]

// ─── Animation variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

// ─── Newsletter mini-form ─────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // Simulate subscription — replace with real integration if needed
    setSent(true)
  }

  return sent ? (
    <div className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-[#D4A853]"
      style={{ background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)" }}>
      <span>✦</span>
      <span>You&apos;re on the list.</span>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="min-w-0 flex-1 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none focus:ring-1 focus:ring-[#D4A853]/40"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
      />
      <button
        type="submit"
        className="rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0A1628] transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)]"
        style={{ background: "#D4A853" }}
      >
        Join
      </button>
    </form>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer className="relative bg-[#0A1628]">
      {/* Top shimmer line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />

      {/* ── Main columns ── */}
      <div className="w-full overflow-visible px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >

          {/* ── Col 1: Brand ── */}
          <motion.div variants={fadeUp}>
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

            <p className="mb-7 max-w-xs text-sm leading-relaxed text-white/40">
              Architecting bespoke luxury travel experiences for the world&apos;s most
              discerning travellers since 2011.
            </p>

            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition-all duration-300 hover:bg-[#D4A853]/10 hover:text-[#D4A853]"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Col 2: Destinations ── */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Destinations
            </h4>
            <ul className="space-y-3">
              {DESTINATIONS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-[#D4A853]"
                  >
                    <span className="h-px w-3 bg-[#D4A853]/30 transition-all duration-300 group-hover:w-5 group-hover:bg-[#D4A853]/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Company ── */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Company
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors duration-200 hover:text-[#D4A853]"
                  >
                    <span className="h-px w-3 bg-[#D4A853]/30 transition-all duration-300 group-hover:w-5 group-hover:bg-[#D4A853]/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 4: Contact + Newsletter ── */}
          <motion.div variants={fadeUp}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
              Contact
            </h4>
            <ul className="mb-7 space-y-4 text-sm text-white/40">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#D4A853]/60">✉</span>
                <a href="mailto:hello@lumieretravel.com" className="transition-colors hover:text-[#D4A853]">
                  hello@lumieretravel.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#D4A853]/60">◈</span>
                <a href="tel:+442079460958" className="transition-colors hover:text-[#D4A853]">
                  +44 20 7946 0958
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[#D4A853]/60">✦</span>
                <span className="leading-relaxed">
                  15 Mayfair Lane<br />
                  London
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-white/30">
              Newsletter
            </p>
            <NewsletterForm />
          </motion.div>

        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="px-6 py-5 sm:px-10 lg:px-20"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-white/20">
            © 2026 Lumière Travel. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-xs text-white/20">
            <a href="#" className="transition-colors hover:text-white/40">Privacy Policy</a>
            <span className="text-white/10">·</span>
            <a href="#" className="transition-colors hover:text-white/40">Terms of Service</a>
            <span className="text-white/10">·</span>
            <a href="#" className="transition-colors hover:text-white/40">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
