"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

// ─── Types ────────────────────────────────────────────────────────────────────

type FormState = {
  name: string
  email: string
  phone: string
  dates: string
  travelers: string
  message: string
}

const EMPTY: FormState = {
  name: "", email: "", phone: "", dates: "", travelers: "2", message: "",
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
        {label}{required && <span className="ml-1 text-[#D4A853]">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-all duration-200 focus:ring-1 focus:ring-[#D4A853]/50"
const inputStyle = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
}

// ─── Modal panel ─────────────────────────────────────────────────────────────

function ModalPanel({
  destinationName,
  price,
  onClose,
}: {
  destinationName: string
  price: string
  onClose: () => void
}) {
  const supabase = createClient()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const message =
      `Destination: ${destinationName}\n` +
      `Travel dates: ${form.dates || "Flexible"}\n` +
      `Travelers: ${form.travelers}\n` +
      (form.phone ? `Phone: ${form.phone}\n` : "") +
      (form.message ? `\nMessage: ${form.message}` : "")

    const { error: dbError } = await supabase.from("inquiries").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message,
      location: destinationName,
      status: "new",
    })

    setLoading(false)

    if (dbError) {
      setError("Something went wrong. Please try again.")
      return
    }
    toast.success("Enquiry sent! We'll be in touch within 24 hours.", {
      icon: '✦',
      duration: 5000,
    })
    setTimeout(onClose, 1000)
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200]"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed inset-x-4 bottom-0 top-16 z-[210] mx-auto my-auto flex max-h-[90vh] max-w-lg flex-col overflow-y-auto rounded-3xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
        style={{
          background: "rgba(8,18,38,0.97)",
          backdropFilter: "blur(32px)",
          WebkitBackdropFilter: "blur(32px)",
          border: "1px solid rgba(212,168,83,0.18)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between border-b px-7 py-6"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div>
            <p className="mb-0.5 text-xs font-bold uppercase tracking-[0.25em] text-[#D4A853]">
              Book This Journey
            </p>
            <h2
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {destinationName}
            </h2>
            <p className="mt-0.5 text-sm text-white/35">from {price} per person</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/35 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 px-7 py-6">
          <AnimatePresence mode="wait">
            {/* ── Form ── */}
            <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <input
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Jane Smith"
                      required
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="jane@example.com"
                      required
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone (optional)">
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+44 7700 900000"
                      className={inputClass}
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Travelers">
                    <select
                      value={form.travelers}
                      onChange={set("travelers")}
                      className={inputClass}
                      style={{ ...inputStyle, colorScheme: "dark", backgroundColor: "rgb(8, 18, 38)", color: "white" }}
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                        <option
                          key={n}
                          value={n}
                          style={{ backgroundColor: "rgb(8, 18, 38)", color: "white" }}
                        >
                          {n} {n === "1" ? "traveler" : "travelers"}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Travel Dates">
                  <input
                    type="text"
                    value={form.dates}
                    onChange={set("dates")}
                    placeholder="e.g. June 2026, flexible on dates"
                    className={inputClass}
                    style={inputStyle}
                  />
                </Field>

                <Field label="Message (optional)">
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about any special requests, preferences, or questions…"
                    rows={3}
                    className={`${inputClass} resize-none`}
                    style={inputStyle}
                  />
                </Field>

                {error && (
                  <p className="rounded-xl px-4 py-3 text-sm text-red-400"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full py-4 text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.5)] disabled:opacity-60"
                  style={{ background: "#D4A853" }}
                >
                  {loading ? "Sending…" : "Send Enquiry"}
                </button>
              </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  )
}

// ─── Exported trigger + modal ─────────────────────────────────────────────────

export default function BookingModal({
  destinationName,
  price,
}: {
  destinationName: string
  price: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full bg-[#D4A853] px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-[#0A1628] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.55)]"
      >
        Book Now
      </button>

      <AnimatePresence>
        {open && (
          <ModalPanel
            destinationName={destinationName}
            price={price}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
