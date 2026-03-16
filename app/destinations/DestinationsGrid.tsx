"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Destination } from "@/app/page"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(price: number) {
  return "$" + price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const sectionFade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const cardVariant = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
        <span className="mb-4 text-6xl">✈️</span>
        <p className="text-lg font-medium text-white/40">No destinations found.</p>
        <p className="mt-2 text-sm text-white/25">Try a different search term.</p>
        <Link
          href="/"
          className="mt-8 text-sm font-semibold text-[#D4A853] transition-colors hover:text-[#D4A853]/70"
        >
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      variants={sectionFade}
      initial="hidden"
      animate="visible"
      className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-24 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-20"
    >
      {destinations.map((dest) => (
        <motion.div
          key={dest.id}
          variants={cardVariant}
          whileHover={{ y: -8 }}
          className="group cursor-pointer overflow-hidden rounded-2xl"
          style={{
            background: "rgba(10, 22, 40, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${dest.image_url ?? ""})` }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-transparent to-transparent" />

            {/* Rating badge */}
            <div
              className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5"
              style={{
                background: "rgba(10, 22, 40, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(212, 168, 83, 0.3)",
              }}
            >
              <span className="text-xs text-[#D4A853]">★</span>
              <span className="text-sm font-bold text-[#D4A853]">
                {dest.rating?.toFixed(1) ?? "—"}
              </span>
            </div>

            {/* Price */}
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-medium uppercase tracking-wider text-white/50">From</span>
              <div className="text-xl font-bold text-white">
                {formatPrice(dest.price)}
                <span className="ml-1 text-sm font-normal text-white/40">/ person</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-4 h-0.5 w-10 rounded-full bg-gradient-to-r from-[#D4A853] to-[#D4A853]/30 transition-all duration-500 group-hover:w-16" />
            <div className="mb-2 flex items-center gap-2.5">
              <span className="text-xl">✈️</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{dest.name}</h3>
                <span className="text-xs font-medium tracking-wide text-white/40">{dest.location}</span>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/50">
              Discover the finest experiences {dest.location} has to offer
            </p>
            <Link
              href={`/destinations/${dest.id}`}
              className="flex items-center gap-2 text-sm font-semibold text-[#D4A853] transition-all duration-300 group-hover:gap-3"
            >
              <span>Explore</span>
              <motion.span className="inline-block" whileHover={{ x: 4 }}>→</motion.span>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
