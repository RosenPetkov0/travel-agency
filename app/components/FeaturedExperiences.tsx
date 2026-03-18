"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPERIENCES = [
  {
    tag: "Exclusive Access",
    title: "Formula 1 VIP Paddock Tour",
    location: "Monaco, Monaco",
    price: "$12,000",
    unit: "per person",
    desc: "Stand in the very heart of motorsport's most prestigious event. Your private paddock pass opens doors to team garages, driver briefings, and a front-row grandstand seat — crowned by a Michelin-starred dinner at the harbour.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&auto=format&fit=crop",
    href: "/experiences",
  },
  {
    tag: "Private Charter",
    title: "Private Island Overwater Villa",
    location: "North Malé Atoll, Maldives",
    price: "$8,500",
    unit: "per person",
    desc: "Your own overwater bungalow on a secluded private island, accessible only by seaplane. A personal butler, bioluminescent lagoon, and a private chef serving freshly caught seafood under a star-strewn sky.",
    image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=900&auto=format&fit=crop",
    href: "/experiences",
  },
  {
    tag: "Cultural Immersion",
    title: "Traditional Geisha Tea Ceremony",
    location: "Gion District, Kyoto",
    price: "$3,200",
    unit: "per person",
    desc: "A rare, intimate audience with a maiko in a centuries-old teahouse tucked within Gion's lantern-lit alleys. Learn the art of chado, dress in hand-woven kimono, and dine on an exclusive kaiseki menu prepared for two.",
    image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=900&auto=format&fit=crop",
    href: "/experiences",
  },
]

// ─── Single experience row ─────────────────────────────────────────────────────

function ExperienceRow({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`flex flex-col overflow-hidden rounded-3xl md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Image half ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative min-h-[300px] overflow-hidden md:min-h-[420px] md:w-[55%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={exp.image}
          alt={exp.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Gradient overlay toward text side */}
        <div
          className={`absolute inset-0 ${isEven ? "bg-gradient-to-r" : "bg-gradient-to-l"} from-transparent via-transparent to-[#0A1628]/70`}
        />
        {/* Tag badge */}
        <div className="absolute left-5 top-5">
          <span
            className="inline-block rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#D4A853]"
            style={{
              background: "rgba(10,22,40,0.75)",
              border: "1px solid rgba(212,168,83,0.35)",
              backdropFilter: "blur(12px)",
            }}
          >
            {exp.tag}
          </span>
        </div>
      </motion.div>

      {/* ── Text half ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-1 flex-col justify-center px-8 py-10 md:px-10 lg:px-14"
      >
        {/* Location */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-[#D4A853]/60 text-xs">✦</span>
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
            {exp.location}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mb-5 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {exp.title}
        </h3>

        {/* Gold accent line */}
        <div className="mb-5 h-px w-12 bg-gradient-to-r from-[#D4A853] to-[#D4A853]/20" />

        {/* Description */}
        <p className="mb-8 text-sm leading-[1.85] text-white/50 sm:text-base">
          {exp.desc}
        </p>

        {/* Price + CTA */}
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/30">From</div>
            <div className="text-2xl font-bold text-[#D4A853]">
              {exp.price}
              <span className="ml-1.5 text-sm font-normal text-white/30">{exp.unit}</span>
            </div>
          </div>

          <Link href={exp.href}>
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#D4A853] px-7 py-3 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow hover:shadow-[0_0_28px_rgba(212,168,83,0.45)]"
            >
              Discover
              <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6h7M6.5 3l3 3-3 3" />
              </svg>
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Section component ────────────────────────────────────────────────────────

export default function FeaturedExperiences() {
  return (
    <section className="relative bg-[#0A1628] px-4 py-24 sm:px-8 lg:px-14">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        style={{
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.04) 0%, transparent 65%)",
        }}
      />

      {/* ── Section header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mb-16 text-center"
      >
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Signature Experiences
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>
        <h2
          className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Moments That{" "}
          <em className="not-italic text-[#D4A853]">Define Lifetimes</em>
        </h2>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-white/45">
          Exclusive access to the world&apos;s most coveted experiences — crafted for those
          who settle for nothing less than extraordinary.
        </p>
      </motion.div>

      {/* ── Experiences ── */}
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceRow key={exp.title} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}
