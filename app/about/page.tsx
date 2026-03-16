"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const FOUNDERS = [
  {
    name: "Ivayla Boycheva",
    role: "Founder & CEO",
    bio: "The visionary behind Lumière Travel. Her dynamic spirit, fueled by a passion for Formula 1 and traditional folk dancing, inspires her to curate fast-paced, unforgettable, and culturally rich luxury experiences around the globe.",
    instagram: "https://www.instagram.com/ivayla_boycheva/",
    photo: "/images/ivayla.png",
    initials: "IB",
  },
  {
    name: "Rosen Petkov",
    role: "CTO & Lead Developer",
    bio: "The technical architect who turned the dream of Lumière Travel into a digital reality. Sharing a love for F1 and folk dancing, he brings rhythm, speed, and absolute precision to the platform's elegant code.",
    instagram: "https://www.instagram.com/rosen_petkov57/",
    photo: "/images/rosen.png",
    initials: "RP",
  },
]

const VALUES = [
  { icon: "✦", label: "Precision", desc: "Every itinerary is engineered to perfection, with no detail left to chance." },
  { icon: "◈", label: "Passion", desc: "From the racetrack to the dance floor — we bring genuine enthusiasm to every journey." },
  { icon: "◉", label: "Elegance", desc: "Luxury is not excess. It is the art of experiencing the world at its very finest." },
]

// ─── Instagram Icon ───────────────────────────────────────────────────────────

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

// ─── Inner component (uses useSearchParams) ───────────────────────────────────

function AboutContent() {
  const searchParams = useSearchParams()
  const locationName = searchParams.get("location")

  const [message, setMessage] = useState(
    locationName
      ? `Здравейте, интересувам се от резервация за ${locationName}. Моля, свържете се с мен за повече подробности.`
      : ""
  )

  return (
    <main className="min-h-screen bg-[#0A1628]">

      {/* ── Navbar ── */}
      <div className="absolute left-0 right-0 top-0 z-50 flex items-center px-4 py-5 sm:px-8 lg:px-14">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-200 hover:text-[#D4A853]"
        >
          <span className="text-[#D4A853]">✦</span>
          <span>Lumière Travel</span>
        </Link>
      </div>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-36 text-center sm:pt-44">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "800px", height: "400px",
            background: "radial-gradient(ellipse, rgba(212,168,83,0.07) 0%, transparent 68%)" }}
        />

        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">Our Story</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="relative mb-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Behind the Magic of
          <br />
          <em className="not-italic text-[#D4A853]">Lumière Travel</em>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
          Born from an obsession with the extraordinary — we craft luxury travel experiences
          that move as fast as a Formula 1 car and feel as alive as a folk dance at midnight.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:gap-12">
          {VALUES.map((v) => (
            <motion.div key={v.label} variants={fadeUp} className="flex items-start gap-4 text-left sm:max-w-[200px]">
              <span className="mt-0.5 text-xl text-[#D4A853]">{v.icon}</span>
              <div>
                <div className="mb-1 text-sm font-semibold text-white">{v.label}</div>
                <div className="text-xs leading-relaxed text-white/40">{v.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-[#D4A853] opacity-50">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* ════════════════════════════════════════════
          THE FOUNDERS
      ════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.4 }} className="mb-14 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">The Founders</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}>
            The People Behind the{" "}
            <em className="not-italic text-[#D4A853]">Vision</em>
          </h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {FOUNDERS.map((f) => (
            <motion.div key={f.name} variants={fadeUp} whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl p-8"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.09)",
              }}>
              {/* Hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.07) 0%, transparent 70%)" }} />

              {/* Avatar */}
              <div className="mb-6 flex items-center gap-5">
                <div
                  className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full"
                  style={{ border: "2px solid rgba(212,168,83,0.45)", boxShadow: "0 0 0 4px rgba(212,168,83,0.08)" }}
                >
                  <Image
                    src={f.photo}
                    alt={f.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{f.name}</h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A853]">
                    {f.role}
                  </p>
                </div>
              </div>

              {/* Gold accent line */}
              <div className="mb-5 h-px w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20 transition-all duration-500 group-hover:w-20" />

              {/* Bio */}
              <p className="mb-7 text-sm leading-[1.8] text-white/55">{f.bio}</p>

              {/* Instagram */}
              <a href={f.instagram} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold text-white/60 transition-all duration-300 hover:text-[#D4A853]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <InstagramIcon />
                Follow on Instagram
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <span className="text-[#D4A853] opacity-50">✦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* ════════════════════════════════════════════
          GET IN TOUCH
      ════════════════════════════════════════════ */}
      <section id="contact" className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.35 }} className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">Get in Touch</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}>
            Start Your{" "}
            <em className="not-italic text-[#D4A853]">Journey</em>
          </h2>
          <p className="text-sm leading-relaxed text-white/45 sm:text-base">
            {locationName
              ? `You are enquiring about ${locationName}. We will get back to you shortly.`
              : "Tell us your dream and we will craft an experience beyond imagination."}
          </p>
        </motion.div>

        <motion.form variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-5">

          {/* Name */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Name</label>
            <input type="text" placeholder="Your full name"
              className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Email</label>
            <input type="email" required placeholder="your@email.com"
              className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          </motion.div>

          {/* Message – controlled, pre-filled from URL param */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Message</label>
            <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your dream journey..."
              className="w-full resize-none rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")} />
          </motion.div>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit"
              className="relative w-full overflow-hidden rounded-full bg-[#D4A853] py-4 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.5)]">
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                initial={{ x: "-110%" }} animate={{ x: "210%" }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
              <span className="relative">Send Message</span>
            </motion.button>
          </motion.div>
        </motion.form>
      </section>

    </main>
  )
}

// ─── Page – wraps inner component in Suspense ─────────────────────────────────

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A1628]" />}>
      <AboutContent />
    </Suspense>
  )
}
