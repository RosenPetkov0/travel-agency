"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/utils/supabase/client"

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
    name: "Alexander Reed",
    role: "Chief Executive Officer",
    bio: "With over two decades in luxury hospitality, Alexander leads our vision to redefine premium travel experiences through cutting-edge digital solutions.",
    linkedin: "https://linkedin.com",
    initials: "AR",
  },
  {
    name: "Elena Rostova",
    role: "Chief Technology Officer",
    bio: "Architecting the future of travel. Elena ensures our platform delivers flawless performance, top-tier security, and seamless booking flows.",
    linkedin: "https://linkedin.com",
    initials: "ER",
  },
]

const VALUES = [
  { icon: "✦", label: "Precision", desc: "Every itinerary is engineered to perfection, with no detail left to chance." },
  { icon: "◈", label: "Innovation", desc: "We continuously push the boundaries of travel technology to deliver smarter, faster, and more elegant solutions." },
  { icon: "◉", label: "Elegance", desc: "Luxury is not excess. It is the art of experiencing the world at its very finest." },
]

// ─── LinkedIn Icon ────────────────────────────────────────────────────────────

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
      <line x1="8" y1="11" x2="8" y2="17" />
      <line x1="8" y1="8" x2="8" y2="8.5" />
      <path d="M12 11v6M12 14a3 3 0 0 1 6 0v3" />
    </svg>
  )
}

// ─── Inner component (uses useSearchParams) ───────────────────────────────────

function AboutContent() {
  const searchParams = useSearchParams()
  const locationName = searchParams.get("location")

  const supabase = createClient()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState(
    locationName
      ? `Hello, I am interested in booking for ${locationName}. Please get in touch with me for more details.`
      : ""
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const { error: insertError } = await supabase.from("inquiries").insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        location: locationName ?? null,
      })

      if (insertError) throw insertError

      setSuccess("Message sent successfully! We will get back to you shortly.")
      setName("")
      setEmail("")
      setMessage("")
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to send message. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0A1628]">

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
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">Our Platform</span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="relative mb-6 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl md:text-7xl"
          style={{ fontFamily: "var(--font-playfair)" }}>
          Premium Travel Technology
          <br />
          <em className="not-italic text-[#D4A853]">Built to Scale</em>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="max-w-xl text-base leading-relaxed text-white/50 sm:text-lg">
          We build white-label luxury travel platforms that empower agencies to deliver
          world-class booking experiences — with enterprise-grade performance and zero compromise on design.
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
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">Leadership Team</span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}>
            The People Driving the{" "}
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
                  className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-xl font-bold text-[#D4A853]"
                  style={{ border: "2px solid rgba(212,168,83,0.45)", boxShadow: "0 0 0 4px rgba(212,168,83,0.08)", background: "rgba(212,168,83,0.07)" }}
                >
                  {f.initials}
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

              {/* LinkedIn */}
              <a href={f.linkedin} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-xs font-semibold text-white/60 transition-all duration-300 hover:text-[#D4A853]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <LinkedInIcon />
                LinkedIn Profile
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
          viewport={{ once: true, amount: 0.2 }} onSubmit={handleSubmit}
          className="flex flex-col gap-5">

          {/* Name */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Name</label>
            <input
              type="text"
              required
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </motion.div>

          {/* Email */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Email</label>
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Message</label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your dream journey..."
              className="w-full resize-none rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </motion.div>

          {/* Feedback messages */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl px-4 py-3 text-xs text-red-300"
                style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </motion.p>
            )}
            {success && (
              <motion.p
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="rounded-xl px-4 py-3 text-xs text-emerald-300"
                style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }}
              >
                {success}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.div variants={fadeUp}>
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              type="submit"
              disabled={loading}
              className="relative w-full overflow-hidden rounded-full bg-[#D4A853] py-4 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.5)] disabled:opacity-60"
            >
              {!loading && (
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                  initial={{ x: "-110%" }} animate={{ x: "210%" }}
                  transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              )}
              <span className="relative">{loading ? "Sending…" : "Send Message"}</span>
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
