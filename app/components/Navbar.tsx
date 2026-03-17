"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase-browser"

const NAV_LINKS = [
  { label: "Destinations", href: "/destinations" },
  { label: "Experiences", href: "/experiences" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
]

export default function Navbar() {
  const router = useRouter()
  const supabase = createClient()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Sync auth state
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })

    return () => subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsOpen(false)
    router.push("/")
    router.refresh()
  }

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute left-0 top-0 z-[100] flex w-full items-center justify-between px-6 py-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <motion.span
            animate={{ rotate: [0, 20, 0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="text-xl text-[#D4A853]"
          >
            ✦
          </motion.span>
          <span className="text-xl font-semibold tracking-wide text-white">
            Lumière Travel
          </span>
        </Link>

        {/* Desktop links – absolutely centred */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-white/75 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative transition-colors duration-200 hover:text-[#D4A853]"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#D4A853] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block rounded-full px-5 py-2.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-[#D4A853]"
                >
                  Dashboard
                </motion.span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleSignOut}
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/40 hover:text-white"
              >
                Sign Out
              </motion.button>
            </>
          ) : (
            <>
              <Link href="/login">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-block rounded-full border border-[#D4A853] px-5 py-2.5 text-sm font-semibold text-[#D4A853] transition-colors duration-200 hover:bg-[#D4A853]/10"
                >
                  Sign In
                </motion.span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-[#D4A853]/70 px-6 py-2.5 text-sm font-semibold text-[#D4A853] transition-all duration-300 hover:bg-[#D4A853] hover:text-[#0A1628]"
              >
                Book Now
              </motion.button>
            </>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative z-[110] flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors duration-200 hover:border-[#D4A853]/50 hover:text-[#D4A853] md:hidden"
          style={{
            background: "rgba(10, 22, 40, 0.45)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.g
                  key="close"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </motion.g>
              ) : (
                <motion.g
                  key="burger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </button>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(10, 22, 40, 0.6)", backdropFilter: "blur(4px)" }}
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed left-4 right-4 top-[72px] z-50 overflow-hidden rounded-2xl md:hidden"
              style={{
                background: "rgba(10, 22, 40, 0.82)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(212, 168, 83, 0.2)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              }}
            >
              <nav className="flex flex-col px-2 py-3">
                {NAV_LINKS.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-all duration-200 hover:bg-white/[0.07] hover:text-[#D4A853]"
                    >
                      <span className="text-[#D4A853]/60 text-xs">✦</span>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Divider */}
                <div className="mx-4 my-2 h-px bg-white/10" />

                {isLoggedIn ? (
                  <>
                    {/* Dashboard mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium text-white/80 transition-all duration-200 hover:bg-white/[0.07] hover:text-[#D4A853]"
                      >
                        <span className="text-[#D4A853]/60 text-xs">✦</span>
                        Dashboard
                      </Link>
                    </motion.div>

                    {/* Sign Out mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + (NAV_LINKS.length + 1) * 0.06, duration: 0.3 }}
                      className="px-2 pb-2 pt-1"
                    >
                      <button
                        onClick={handleSignOut}
                        className="w-full rounded-xl border border-white/15 py-3 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
                      >
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {/* Sign In mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + NAV_LINKS.length * 0.06, duration: 0.3 }}
                      className="px-2 pt-1"
                    >
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="flex w-full items-center justify-center rounded-xl border border-[#D4A853]/70 py-3 text-sm font-semibold text-[#D4A853] transition-all duration-200 hover:bg-[#D4A853]/10"
                      >
                        Sign In
                      </Link>
                    </motion.div>

                    {/* Book Now mobile */}
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + (NAV_LINKS.length + 1) * 0.06, duration: 0.3 }}
                      className="px-2 pb-2 pt-1"
                    >
                      <button className="w-full rounded-xl border border-[#D4A853]/70 py-3 text-sm font-semibold text-[#D4A853] transition-all duration-300 hover:bg-[#D4A853] hover:text-[#0A1628]">
                        Book Now
                      </button>
                    </motion.div>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
