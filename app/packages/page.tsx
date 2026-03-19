"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

// ─── Pricing data ─────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: "essential",
    tier: "Essential",
    tagline: "Refined comfort for the discerning traveller",
    price: 2999,
    highlight: false,
    accentColor: "rgba(255,255,255,0.07)",
    features: [
      "7-night accommodation (4-star)",
      "Airport transfers included",
      "Daily breakfast",
      "1 guided cultural tour",
      "24/7 support line",
    ],
  },
  {
    id: "premium",
    tier: "Premium",
    tagline: "The Lumière signature experience",
    price: 5999,
    highlight: true,
    badge: "Most Popular",
    accentColor: "rgba(212,168,83,0.08)",
    features: [
      "10-night accommodation (5-star)",
      "Private chauffeur throughout",
      "Full board dining",
      "3 exclusive curated experiences",
      "Personal concierge on call",
      "Spa & wellness access",
    ],
  },
  {
    id: "elite",
    tier: "Elite",
    tagline: "The absolute pinnacle of luxury travel",
    price: 12999,
    highlight: false,
    accentColor: "rgba(255,255,255,0.07)",
    features: [
      "14-night private villa",
      "Private jet transfer",
      "Michelin-starred dining experiences",
      "Unlimited curated experiences",
      "Dedicated personal travel advisor",
      "VIP event access (F1, Grand Prix, etc.)",
    ],
  },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "Can I customise my package?",
    a: "Absolutely. Every package is a starting point, not a ceiling. Our concierge team will work with you to tailor every detail — from accommodation choices to private experiences — until it is exactly what you envisioned.",
  },
  {
    q: "What is included in the price?",
    a: "All prices are per person and include accommodation, airport transfers, and every feature listed in the package. International flights and travel insurance are not included but can be arranged through our team at preferential rates.",
  },
  {
    q: "What is your cancellation policy?",
    a: "We offer full refunds for cancellations made 60 or more days before departure. Cancellations within 30–59 days receive a 50% credit. Within 30 days, packages are non-refundable but fully transferable to another traveller.",
  },
  {
    q: "Do you offer group and corporate rates?",
    a: "Yes — for groups of four or more travellers, and for corporate retreats, we offer bespoke pricing and dedicated programme management. Please contact our team directly for a tailored proposal.",
  },
  {
    q: "How do I book?",
    a: "Simply get in touch via our contact form or call our concierge line. We will schedule a brief discovery call to understand your preferences, then present a fully tailored itinerary within 48 hours.",
  },
]

const HERO_BG =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop"

// ─── Pricing card ─────────────────────────────────────────────────────────────

function PricingCard({ pkg, index }: { pkg: (typeof PACKAGES)[number]; index: number }) {
  const isHighlight = pkg.highlight

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.12, duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col overflow-hidden rounded-3xl transition-all duration-500 ${
        isHighlight ? "lg:scale-[1.06] lg:shadow-[0_0_80px_rgba(212,168,83,0.18)]" : ""
      }`}
      style={{
        background: isHighlight
          ? "rgba(212,168,83,0.08)"
          : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isHighlight
          ? "1px solid rgba(212,168,83,0.4)"
          : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Top shimmer for premium */}
      {isHighlight && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/70 to-transparent" />
      )}

      {/* Most Popular badge */}
      {pkg.badge && (
        <div className="absolute right-5 top-5">
          <span
            className="inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#0A1628]"
            style={{ background: "#D4A853" }}
          >
            {pkg.badge}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
        {/* Tier label */}
        <div className="mb-1 text-xs font-bold uppercase tracking-[0.3em] text-[#D4A853]">
          {pkg.tier}
        </div>
        <p className="mb-7 text-sm text-white/40">{pkg.tagline}</p>

        {/* Price */}
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.2em] text-white/30">From</div>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-4xl font-bold text-white lg:text-5xl">
              ${pkg.price.toLocaleString()}
            </span>
            <span className="mb-1.5 text-sm text-white/35">/person</span>
          </div>
        </div>

        {/* Gold divider */}
        <div
          className="mb-8 h-px w-full"
          style={{
            background: isHighlight
              ? "rgba(212,168,83,0.25)"
              : "rgba(255,255,255,0.07)",
          }}
        />

        {/* Features */}
        <ul className="mb-10 flex flex-1 flex-col gap-3.5">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/65">
              <span
                className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs"
                style={{
                  background: isHighlight
                    ? "rgba(212,168,83,0.15)"
                    : "rgba(255,255,255,0.06)",
                  border: isHighlight
                    ? "1px solid rgba(212,168,83,0.3)"
                    : "1px solid rgba(255,255,255,0.1)",
                  color: "#D4A853",
                }}
              >
                ✓
              </span>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link href="/about#contact">
          <motion.span
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`inline-flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
              isHighlight
                ? "bg-[#D4A853] text-[#0A1628] hover:shadow-[0_0_32px_rgba(212,168,83,0.45)]"
                : "border border-white/15 text-white/65 hover:border-[#D4A853]/40 hover:text-[#D4A853]"
            }`}
          >
            Get Started
            <svg className="ml-2" width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.5 6h7M6.5 3l3 3-3 3" />
            </svg>
          </motion.span>
        </Link>
      </div>
    </motion.div>
  )
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FaqItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof FAQS)[number]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl"
      style={{
        border: isOpen
          ? "1px solid rgba(212,168,83,0.25)"
          : "1px solid rgba(255,255,255,0.07)",
        background: isOpen ? "rgba(212,168,83,0.04)" : "rgba(255,255,255,0.02)",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="pr-4 text-sm font-semibold text-white sm:text-base">{faq.q}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 text-xl font-light leading-none text-[#D4A853]"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div
              className="px-6 pb-6 text-sm leading-relaxed text-white/50"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="pt-4">{faq.a}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PackagesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"])

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ════════════════════════════════════
          HERO — parallax
      ════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-[80vh] items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-[-20%] bg-cover bg-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_BG}
            alt="Luxury travel packages"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-[#0A1628]/65" />
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
                Bespoke Collections
              </span>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
            </div>

            <h1
              className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Tailor-Made
              <br />
              <em className="not-italic text-[#D4A853]">Travel Packages</em>
            </h1>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
              Three tiers of curated luxury — each one a complete journey, built
              around you. Choose your level and let us handle the rest.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          PRICING CARDS
      ════════════════════════════════════ */}
      <section className="relative px-4 py-24 sm:px-8 lg:px-14">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "900px",
            height: "600px",
            background: "radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 65%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative mb-14 text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Our Packages
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Choose Your{" "}
            <em className="not-italic text-[#D4A853]">Level of Extraordinary</em>
          </h2>
        </motion.div>

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
          {PACKAGES.map((pkg, i) => (
            <PricingCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center text-xs text-white/25"
        >
          All prices are per person. Flights and travel insurance not included.
          Fully customisable on request.
        </motion.p>
      </section>

      {/* ════════════════════════════════════
          COMPARISON STRIP
      ════════════════════════════════════ */}
      <section className="px-4 pb-24 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl text-center"
          style={{
            background: "rgba(212,168,83,0.05)",
            border: "1px solid rgba(212,168,83,0.15)",
          }}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />
          <div className="px-8 py-12 sm:px-14">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Not Sure Which to Choose?
            </div>
            <h3
              className="mb-4 text-2xl font-bold text-white sm:text-3xl"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Let Our Concierge Guide You
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-white/45">
              Every package is a starting point. Tell us your dates, destination,
              and wishlist — we will craft a bespoke itinerary in 48 hours.
            </p>
            <Link href="/about#contact">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow hover:shadow-[0_0_32px_rgba(212,168,83,0.45)]"
              >
                Speak to a Specialist
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ════════════════════════════════════
          FAQ ACCORDION
      ════════════════════════════════════ */}
      <section className="px-4 pb-28 sm:px-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Questions & Answers
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Frequently Asked{" "}
            <em className="not-italic text-[#D4A853]">Questions</em>
          </h2>
        </motion.div>

        <div className="mx-auto flex max-w-3xl flex-col gap-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={faq.q}
              faq={faq}
              index={i}
              isOpen={openFaq === i}
              onToggle={() => setOpenFaq(openFaq === i ? null : i)}
            />
          ))}
        </div>
      </section>

    </main>
  )
}
