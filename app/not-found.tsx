"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const BG =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&auto=format&fit=crop"

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0A1628]">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BG}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/50 to-[#0A1628]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "700px",
          height: "500px",
          background:
            "radial-gradient(ellipse, rgba(212,168,83,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4 select-none font-bold leading-none tracking-tighter text-[#D4A853]"
          style={{
            fontSize: "clamp(7rem, 22vw, 16rem)",
            fontFamily: "var(--font-playfair)",
            textShadow: "0 0 80px rgba(212,168,83,0.3)",
          }}
        >
          404
        </motion.div>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-[#D4A853]/60 to-transparent"
        />

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Lost in{" "}
          <em className="not-italic text-[#D4A853]">Paradise?</em>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mx-auto mb-10 max-w-md text-base leading-relaxed text-white/45 sm:text-lg"
        >
          The page you&apos;re looking for seems to have drifted off course.
          Let us guide you back to extraordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow hover:shadow-[0_0_32px_rgba(212,168,83,0.45)]"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Return Home
            </motion.span>
          </Link>

          <Link href="/destinations">
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white/60 transition-all hover:text-[#D4A853]"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Explore Destinations
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" />
              </svg>
            </motion.span>
          </Link>
        </motion.div>

        {/* Brand watermark */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 flex items-center justify-center gap-2 text-white/20"
        >
          <span className="text-[#D4A853]/40">✦</span>
          <span className="text-xs uppercase tracking-[0.3em]">Lumière Travel</span>
        </motion.div>
      </div>
    </main>
  )
}
