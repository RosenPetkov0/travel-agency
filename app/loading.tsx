"use client"

import { motion } from "framer-motion"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0A1628]">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 65%)",
        }}
      />

      {/* Spinner */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="h-16 w-16 rounded-full"
          style={{
            border: "1.5px solid transparent",
            borderTopColor: "#D4A853",
            borderRightColor: "rgba(212,168,83,0.3)",
          }}
        />
        {/* Inner ring — counter-rotate */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: "1px solid transparent",
            borderTopColor: "rgba(212,168,83,0.5)",
            borderBottomColor: "rgba(212,168,83,0.2)",
          }}
        />
        {/* Centre dot */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4A853]"
        />
      </div>

      {/* Brand */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex items-center gap-2.5"
      >
        <motion.span
          animate={{ rotate: [0, 20, 0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="text-base text-[#D4A853]"
        >
          ✦
        </motion.span>
        <span
          className="text-sm font-semibold tracking-[0.25em] text-white/60 uppercase"
        >
          Lumière Travel
        </span>
      </motion.div>
    </div>
  )
}
