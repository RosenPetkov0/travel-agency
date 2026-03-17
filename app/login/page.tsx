"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { createClient } from "@/utils/supabase-browser"

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const panelVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  exit: { opacity: 0, scale: 0.97, y: -12, transition: { duration: 0.25 } },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        router.push("/")
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setSuccess("Check your email to confirm your account.")
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode((m) => (m === "signin" ? "signup" : "signin"))
    setError(null)
    setSuccess(null)
  }

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A1628] px-4"
    >
      {/* ── Background radial glow ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "900px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 65%)",
        }}
      />

      {/* ── Back to home ── */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-6 top-6 z-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-200 hover:text-[#D4A853]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Lumière Travel
        </Link>
      </motion.div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Top gold accent bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/60 to-transparent" />

        <div className="px-8 py-10 sm:px-10">
          {/* Logo */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8 flex items-center gap-2.5">
            <motion.span
              animate={{ rotate: [0, 20, 0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="text-lg text-[#D4A853]"
            >
              ✦
            </motion.span>
            <span className="text-base font-semibold tracking-wide text-white">Lumière Travel</span>
          </motion.div>

          {/* Mode toggle tabs */}
          <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
            className="mb-8 flex rounded-xl p-1"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSuccess(null) }}
                className="relative flex-1 rounded-lg py-2.5 text-sm font-semibold transition-colors duration-200"
                style={{ color: mode === m ? "#0A1628" : "rgba(255,255,255,0.45)" }}
              >
                {mode === m && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-lg bg-[#D4A853]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {m === "signin" ? "Sign In" : "Sign Up"}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h1
                className="mb-1 text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {mode === "signin" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="mb-8 text-sm text-white/40">
                {mode === "signin"
                  ? "Sign in to access your travel dashboard."
                  : "Join Lumière Travel and start your journey."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25 transition-colors duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </motion.div>

            {/* Password */}
            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/25 transition-colors duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.5)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </motion.div>

            {/* Error / Success feedback */}
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
            <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className="relative w-full overflow-hidden rounded-full bg-[#D4A853] py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_36px_rgba(212,168,83,0.45)] disabled:opacity-60"
              >
                {/* Shimmer */}
                {!loading && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    initial={{ x: "-110%" }}
                    animate={{ x: "210%" }}
                    transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                  />
                )}
                <span className="relative">
                  {loading ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
                </span>
              </motion.button>
            </motion.div>
          </form>

          {/* Footer switch */}
          <motion.p custom={5} variants={fadeUp} initial="hidden" animate="visible"
            className="mt-6 text-center text-xs text-white/35"
          >
            {mode === "signin" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={switchMode}
              className="font-semibold text-[#D4A853] transition-opacity hover:opacity-80"
            >
              {mode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </motion.p>
        </div>
      </motion.div>
    </main>
  )
}
