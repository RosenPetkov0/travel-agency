"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/utils/supabase/client"

// Background: luxury yacht at golden hour
const BG_IMAGE =
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&auto=format&fit=crop"

// ─── Component ────────────────────────────────────────────────────────────────

export default function Newsletter() {
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError(null)

    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() })

    setLoading(false)

    if (insertError) {
      // Postgres unique violation code
      if (insertError.code === "23505") {
        setError("This email is already subscribed — you are all set! ✦")
      } else {
        setError(insertError.message)
      }
    } else {
      setSuccess(true)
      setEmail("")
    }
  }

  return (
    <section className="relative min-h-[520px] overflow-hidden">
      {/* ── Background image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG_IMAGE}
        alt="Luxury yacht at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* ── Dark overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/80 via-[#0A1628]/70 to-[#0A1628]/90" />

      {/* ── Gold shimmer line ── */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-4 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
              Exclusive Access
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
          </div>

          {/* Headline */}
          <h2
            className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Join 50,000+{" "}
            <em className="not-italic text-[#D4A853]">Luxury Travellers</em>
          </h2>

          <p className="mb-10 text-base leading-relaxed text-white/55">
            Get exclusive deals, curated destination guides, and early access to
            new experiences — delivered to your inbox.
          </p>

          {/* Form or success state */}
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl px-8 py-7"
                style={{
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.25)",
                }}
              >
                <span className="text-2xl">✦</span>
                <p className="text-base font-semibold text-emerald-300">
                  You&apos;re in — welcome to Lumière Travel.
                </p>
                <p className="text-sm text-white/40">
                  Expect your first exclusive guide within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-4"
              >
                {/* Input row */}
                <div
                  className="flex flex-col gap-3 rounded-2xl p-2.5 sm:flex-row"
                  style={{
                    background: "rgba(10,22,40,0.6)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3">
                    <span className="flex-shrink-0 text-sm text-[#D4A853]">✉</span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/30"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: loading ? 1 : 1.04 }}
                    whileTap={{ scale: loading ? 1 : 0.96 }}
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden whitespace-nowrap rounded-xl bg-[#D4A853] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_32px_rgba(212,168,83,0.5)] disabled:opacity-60"
                  >
                    {!loading && (
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-110%" }}
                        animate={{ x: "210%" }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                    <span className="relative">{loading ? "…" : "Subscribe"}</span>
                  </motion.button>
                </div>

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center text-xs text-red-300"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="text-xs text-white/25">
                  No spam. Unsubscribe anytime. Your data is safe with us.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
