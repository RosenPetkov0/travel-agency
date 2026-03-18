"use client"

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect, forwardRef } from "react"
import { useRouter } from "next/navigation"
import DatePicker from "react-datepicker"
import { format } from "date-fns"
import "react-datepicker/dist/react-datepicker.css"
import Navbar from "./Navbar"

// ─── Constants ────────────────────────────────────────────────────────────────

const HERO_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&q=80",
    label: "Maldives",
  },
  {
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80",
    label: "Santorini",
  },
  {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80",
    label: "Kyoto",
  },
  {
    url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&q=80",
    label: "Swiss Alps",
  },
]

const SUGGESTIONS = [
  { label: "Monaco Grand Prix", sub: "French Riviera · F1" },
  { label: "Singapore Night Race", sub: "Marina Bay · F1" },
  { label: "Abu Dhabi Yas Marina", sub: "UAE · F1" },
  { label: "Maldives Paradise", sub: "Indian Ocean · Beach" },
  { label: "Santorini Escape", sub: "Greece · Islands" },
  { label: "Kyoto", sub: "Japan · Culture" },
  { label: "Amalfi Coast", sub: "Italy · Scenic" },
  { label: "Bali", sub: "Indonesia · Tropical" },
]

const STATS = [
  { value: "500+", label: "Destinations" },
  { value: "10k+", label: "Happy Travelers" },
  { value: "15 Yrs", label: "Excellence" },
]

const BADGES = [
  {
    name: "Santorini",
    country: "Greece",
    rating: "4.9",
    icon: "🏛️",
    style: { top: "22%", right: "1.5rem" },
    delay: 1.3,
  },
  {
    name: "Maldives",
    country: "Indian Ocean",
    rating: "5.0",
    icon: "🏝️",
    style: { top: "52%", left: "4.5%" },
    delay: 1.55,
  },
  {
    name: "Kyoto",
    country: "Japan",
    rating: "4.8",
    icon: "⛩️",
    style: { bottom: "32%", right: "11%" },
    delay: 1.8,
  },
]

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.75,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
}

const floatingCard = (delay: number) => ({
  hidden: { opacity: 0, y: 22, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay, duration: 0.65, ease: [0.34, 1.56, 0.64, 1] as const },
  },
})

// ─── Custom DatePicker Input ──────────────────────────────────────────────────

interface DateInputProps {
  value?: string
  onClick?: () => void
  placeholder?: string
  displayValue?: string
}

const CustomDateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ onClick, placeholder, displayValue, value }, ref) => (
    <input
      ref={ref}
      value={displayValue ?? value ?? ""}
      readOnly
      onClick={onClick}
      placeholder={placeholder}
      className="w-full cursor-pointer bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35"
    />
  )
)
CustomDateInput.displayName = "CustomDateInput"

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const router = useRouter()

  // ── Slideshow ──
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // ── Destination autocomplete ──
  const [destination, setDestination] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const destinationRef = useRef<HTMLDivElement>(null)

  // ── Travelers dropdown ──
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showTravelers, setShowTravelers] = useState(false)
  const travelersRef = useRef<HTMLDivElement>(null)

  const travelersLabel = `${adults} Adult${adults !== 1 ? "s" : ""} · ${children} Child${children !== 1 ? "ren" : ""}`

  // ── Dates ──
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const dateDisplayValue = (() => {
    if (!startDate) return ""
    const fmt = (d: Date) => format(d, "dd.MM.yyyy")
    if (!endDate) return `От: ${fmt(startDate)}`
    return `От: ${fmt(startDate)}  До: ${fmt(endDate)}`
  })()

  // ── Close dropdowns on outside click ──
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (destinationRef.current && !destinationRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
      if (travelersRef.current && !travelersRef.current.contains(e.target as Node)) {
        setShowTravelers(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredSuggestions = SUGGESTIONS.filter((s) =>
    destination.length === 0 || s.label.toLowerCase().includes(destination.toLowerCase())
  )

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (destination.trim()) params.set("query", destination.trim())
    if (startDate) params.set("dateFrom", format(startDate, "yyyy-MM-dd"))
    if (endDate) params.set("dateTo", format(endDate, "yyyy-MM-dd"))
    params.set("travelers", String(adults + children))
    router.push("/destinations?" + params.toString())
  }

  const scrollToDestinations = () => {
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })
  }

  // ── Mouse parallax ──
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 })
  const bgX = useTransform(springX, [-800, 800], [-14, 14])
  const bgY = useTransform(springY, [-500, 500], [-9, 9])

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.width / 2)
    mouseY.set(e.clientY - rect.height / 2)
  }

  return (
    <section
      className="relative min-h-screen w-full bg-[#0A1628]"
      onMouseMove={handleMouseMove}
    >
      {/* ── Background: Slideshow + Ken Burns + Mouse Parallax ── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{ x: bgX, y: bgY }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1.14 }}
        transition={{ duration: 14, ease: "easeOut" }}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${HERO_IMAGES[currentSlide].url})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </motion.div>

      {/* ── Gradient Overlays ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0A1628]/55 via-[#0A1628]/30 to-[#0A1628]/90" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0A1628]/50 to-transparent" />

      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-start px-4 pt-40 pb-20 text-center md:px-0 md:pt-48 md:pb-40 lg:min-h-screen">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-4 flex items-center gap-3 md:mb-7"
        >
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            Discover Your Next Adventure
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-3 max-w-5xl text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:mb-6 md:leading-[1.04] md:text-7xl lg:text-[88px]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Where Every Journey
          <br />
          <em className="not-italic text-[#D4A853]">Becomes a Memory</em>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-5 max-w-lg text-sm leading-relaxed text-white/60 sm:text-lg md:mb-10 md:text-xl"
        >
          Tailored luxury travel experiences to the world&apos;s most
          breathtaking destinations
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-7 flex flex-col items-center gap-3 sm:flex-row md:mb-14 md:gap-4"
        >
          {/* Primary */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToDestinations}
            className="relative overflow-hidden rounded-full bg-[#D4A853] px-7 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.55)] sm:px-9 sm:py-4"
          >
            {/* Shimmer */}
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
              initial={{ x: "-110%" }}
              animate={{ x: "210%" }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2.8,
                ease: "easeInOut",
              }}
            />
            <span className="relative">Explore Destinations</span>
          </motion.button>

          {/* Secondary */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:border-white/50 hover:bg-white/[0.08] sm:px-9 sm:py-4"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-[10px]">
              ▶
            </span>
            Watch Our Story
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-5 sm:gap-10"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && <div className="h-8 w-px bg-white/20" />}
              <div className="text-center">
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs tracking-wider text-white/45">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Floating Destination Badges ── */}
      {BADGES.map((b) => (
        <motion.div
          key={b.name}
          variants={floatingCard(b.delay)}
          initial="hidden"
          animate="visible"
          className="absolute z-20 hidden items-center gap-3 rounded-2xl px-4 py-3 lg:flex"
          style={{
            ...b.style,
            background: "rgba(10, 22, 40, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(212, 168, 83, 0.25)",
          }}
        >
          <span className="text-2xl">{b.icon}</span>
          <div>
            <div className="text-sm font-semibold text-white">{b.name}</div>
            <div className="text-xs text-white/50">{b.country}</div>
          </div>
          <div className="ml-1 flex items-center gap-1">
            <span className="text-xs text-[#D4A853]">★</span>
            <span className="text-sm font-bold text-[#D4A853]">{b.rating}</span>
          </div>
        </motion.div>
      ))}

      {/* ── Slideshow Dot Indicators ── */}
      <div className="absolute bottom-[7.5rem] left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 md:flex">
        {HERO_IMAGES.map((img, i) => (
          <button
            key={img.label}
            onClick={() => setCurrentSlide(i)}
            aria-label={`Go to slide ${img.label}`}
            className="transition-all duration-300"
            style={{
              width: i === currentSlide ? "24px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              background: i === currentSlide ? "#D4A853" : "rgba(255,255,255,0.25)",
              boxShadow: i === currentSlide ? "0 0 10px rgba(212,168,83,0.6)" : "none",
            }}
          />
        ))}
      </div>

      {/* ── Booking Widget ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        className="relative z-20 w-full px-4 pb-8 md:absolute md:bottom-8 md:left-1/2 md:max-w-4xl md:-translate-x-1/2 md:pb-0"
      >
        <div
          className="flex flex-col items-stretch gap-2 rounded-2xl p-3 md:flex-row"
          style={{
            background: "rgba(10, 22, 40, 0.65)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {/* Destination */}
          <div ref={destinationRef} className="relative flex flex-1 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.05]">
            <span className="text-[#D4A853]">✈</span>
            <div className="min-w-0 flex-1">
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-white/45">
                Destination
              </div>
              <input
                type="text"
                placeholder="Where to?"
                value={destination}
                onChange={(e) => { setDestination(e.target.value); setShowSuggestions(true) }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35"
              />
            </div>

            {/* Destination dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                className="absolute left-0 top-full z-[100] mt-2 w-full overflow-hidden rounded-2xl py-2"
                style={{
                  background: "rgba(10, 22, 40, 0.88)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(212, 168, 83, 0.18)",
                  boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                {filteredSuggestions.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    onMouseDown={() => {
                      setDestination(s.label)
                      setShowSuggestions(false)
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150 hover:bg-white/[0.06]"
                  >
                    <span className="text-base text-[#D4A853]">✈</span>
                    <div>
                      <div className="text-sm font-medium text-white">{s.label}</div>
                      <div className="text-xs text-white/40">{s.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="my-2 hidden w-px bg-white/10 md:block" />

          {/* Dates */}
          <div className="flex cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.05] flex-[2] min-w-[220px]">
            <span className="text-[#D4A853]">📅</span>
            <div className="flex-1 min-w-0">
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-white/45">
                Travel Dates
              </div>
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates) => {
                  const [start, end] = dates as [Date | null, Date | null]
                  setStartDate(start)
                  setEndDate(end)
                }}
                customInput={
                  <CustomDateInput
                    placeholder="Изберете период"
                    displayValue={dateDisplayValue}
                  />
                }
                minDate={new Date()}
                popperPlacement="top-start"
                wrapperClassName="w-full"
              />
            </div>
          </div>

          <div className="my-2 hidden w-px bg-white/10 md:block" />

          {/* Travelers */}
          <div
            ref={travelersRef}
            className="relative flex w-full cursor-pointer items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.05] md:w-auto"
            onClick={() => setShowTravelers((v) => !v)}
          >
            <span className="text-[#D4A853]">👥</span>
            <div className="flex-1 min-w-0">
              <div className="mb-1 text-xs font-medium uppercase tracking-wide text-white/45">
                Travelers
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="whitespace-nowrap text-sm font-medium text-white">
                  {travelersLabel}
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  className={`flex-shrink-0 transition-transform duration-200 ${showTravelers ? "rotate-180" : ""}`}
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </div>
            </div>

            {/* Travelers popup */}
            <AnimatePresence>
              {showTravelers && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute bottom-full left-0 z-[100] mb-2 w-64 overflow-hidden rounded-2xl p-5"
                  style={{
                    background: "rgba(10, 22, 40, 0.92)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(212, 168, 83, 0.2)",
                    boxShadow: "0 16px 40px rgba(0,0,0,0.55)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Adults row */}
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Adults</div>
                      <div className="text-xs text-white/35">Age 13+</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setAdults((a) => Math.max(1, a - 1)) }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-150 hover:bg-[#D4A853]/15 hover:text-[#D4A853] disabled:opacity-30"
                        disabled={adults <= 1}
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                          <path d="M1 1h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                      <span className="w-4 select-none text-center text-sm font-bold text-white">
                        {adults}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setAdults((a) => Math.min(10, a + 1)) }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-150 hover:bg-[#D4A853]/15 hover:text-[#D4A853] disabled:opacity-30"
                        disabled={adults >= 10}
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-4 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

                  {/* Children row */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">Children</div>
                      <div className="text-xs text-white/35">Ages 2–12</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => { e.stopPropagation(); setChildren((c) => Math.max(0, c - 1)) }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-150 hover:bg-[#D4A853]/15 hover:text-[#D4A853] disabled:opacity-30"
                        disabled={children <= 0}
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none">
                          <path d="M1 1h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                      <span className="w-4 select-none text-center text-sm font-bold text-white">
                        {children}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); setChildren((c) => Math.min(6, c + 1)) }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-all duration-150 hover:bg-[#D4A853]/15 hover:text-[#D4A853] disabled:opacity-30"
                        disabled={children >= 6}
                        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Done button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowTravelers(false) }}
                    className="mt-5 w-full rounded-xl bg-[#D4A853] py-2.5 text-xs font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-200 hover:shadow-[0_0_20px_rgba(212,168,83,0.4)]"
                  >
                    Done
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSearch}
            className="w-full whitespace-nowrap rounded-xl bg-[#D4A853] px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_28px_rgba(212,168,83,0.5)] md:w-auto"
          >
            Search
          </motion.button>
        </div>
      </motion.div>
    </section>
  )
}
