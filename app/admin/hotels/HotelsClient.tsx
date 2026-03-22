"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { addHotel, updateHotel, deleteHotel } from "./actions"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Hotel = {
  id: string
  name: string
  location: string
  image_url: string | null
  price_per_night: number
  rating: number | null
  created_at: string
}

type ModalState =
  | { mode: "add" }
  | { mode: "edit"; hotel: Hotel }
  | { mode: "delete"; hotel: Hotel }
  | null

type FormValues = {
  name: string
  location: string
  image_url: string
  price_per_night: string
  rating: string
}

const EMPTY_FORM: FormValues = {
  name: "", location: "", image_url: "", price_per_night: "", rating: "",
}

// ─── Input helper ─────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
        {label}{required && <span className="ml-1 text-[#D4A853]">*</span>}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 transition-colors"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,168,83,0.45)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HotelsClient({ hotels }: { hotels: Hotel[] }) {
  const router = useRouter()
  const [modal, setModal] = useState<ModalState>(null)
  const [form, setForm] = useState<FormValues>(EMPTY_FORM)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const setField = (key: keyof FormValues) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }))

  const openAdd = () => {
    setForm(EMPTY_FORM)
    setError(null)
    setModal({ mode: "add" })
  }

  const openEdit = (hotel: Hotel) => {
    setForm({
      name: hotel.name,
      location: hotel.location,
      image_url: hotel.image_url ?? "",
      price_per_night: String(hotel.price_per_night),
      rating: hotel.rating != null ? String(hotel.rating) : "",
    })
    setError(null)
    setModal({ mode: "edit", hotel })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => fd.set(k, v))

    startTransition(async () => {
      try {
        if (modal?.mode === "add") {
          await addHotel(fd)
          toast.success("Hotel added successfully")
        } else if (modal?.mode === "edit") {
          fd.set("id", modal.hotel.id)
          await updateHotel(fd)
          toast.success("Changes saved")
        }
        setModal(null)
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.")
        toast.error("Something went wrong. Please try again.")
      }
    })
  }

  const confirmDelete = () => {
    if (modal?.mode !== "delete") return
    const id = modal.hotel.id
    startTransition(async () => {
      try {
        await deleteHotel(id)
        toast.success("Hotel deleted")
        setModal(null)
        router.refresh()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Delete failed.")
        toast.error("Something went wrong. Please try again.")
      }
    })
  }

  const isFormModal = modal?.mode === "add" || modal?.mode === "edit"

  return (
    <>
      {/* ── Header bar ── */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
            Hotels
          </h2>
          <p className="mt-1 text-sm text-white/40">{hotels.length} total</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={openAdd}
          className="flex items-center gap-2 rounded-full bg-[#D4A853] px-5 py-2.5 text-sm font-bold text-[#0A1628] transition-shadow hover:shadow-[0_0_24px_rgba(212,168,83,0.4)]"
        >
          <span className="text-base leading-none">+</span>
          Add Hotel
        </motion.button>
      </div>

      {/* ── Table ── */}
      {hotels.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <span className="mb-3 text-3xl text-[#D4A853]/40">◈</span>
          <p className="text-sm text-white/30">No hotels yet. Add your first one.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          <table className="w-full min-w-[560px]">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                {["Name", "Location", "Per Night", "Rating", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-[0.25em] text-white/35"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel, i) => (
                <motion.tr
                  key={hotel.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group transition-colors duration-150"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {hotel.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={hotel.image_url}
                          alt={hotel.name}
                          className="h-9 w-14 rounded-lg object-cover opacity-80"
                        />
                      )}
                      <span className="text-sm font-semibold text-white">{hotel.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/55">{hotel.location}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-[#D4A853]">
                    ${Number(hotel.price_per_night).toLocaleString()}<span className="text-white/30 font-normal">/night</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-white/55">
                    {hotel.rating != null ? `${hotel.rating} ★` : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(hotel)}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white/60 transition-all hover:text-[#D4A853]"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => { setError(null); setModal({ mode: "delete", hotel }) }}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-400/70 transition-all hover:text-red-400"
                        style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Add / Edit Modal ── */}
      <AnimatePresence>
        {isFormModal && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(5,12,25,0.75)", backdropFilter: "blur(6px)" }}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
              style={{
                background: "rgba(10,22,40,0.95)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(212,168,83,0.18)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
              <div className="px-8 py-7">
                <h3 className="mb-6 text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
                  {modal?.mode === "add" ? "Add Hotel" : "Edit Hotel"}
                </h3>

                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Name" value={form.name} onChange={setField("name")} placeholder="Aman Tokyo" required />
                    <Field label="Location" value={form.location} onChange={setField("location")} placeholder="Tokyo, Japan" required />
                  </div>
                  <Field label="Image URL" value={form.image_url} onChange={setField("image_url")} placeholder="https://…" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Price / Night (USD)" value={form.price_per_night} onChange={setField("price_per_night")} type="number" placeholder="850" required />
                    <Field label="Rating (0–5)" value={form.rating} onChange={setField("rating")} type="number" placeholder="4.9" />
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        className="rounded-xl px-4 py-3 text-xs text-red-300"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="mt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setModal(null)}
                      className="flex-1 rounded-full py-3 text-sm font-semibold text-white/50 transition-colors hover:text-white"
                      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={isPending}
                      className="flex-1 rounded-full bg-[#D4A853] py-3 text-sm font-bold text-[#0A1628] transition-all disabled:opacity-60"
                    >
                      {isPending ? "Saving…" : modal?.mode === "add" ? "Add Hotel" : "Save Changes"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Delete Confirmation Modal ── */}
      <AnimatePresence>
        {modal?.mode === "delete" && (
          <>
            <motion.div
              key="del-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal(null)}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(5,12,25,0.75)", backdropFilter: "blur(6px)" }}
            />
            <motion.div
              key="del-modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl px-8 py-8"
              style={{
                background: "rgba(10,22,40,0.96)",
                border: "1px solid rgba(239,68,68,0.2)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
              }}
            >
              <div className="mb-2 text-base font-bold text-white">Delete hotel?</div>
              <p className="mb-6 text-sm text-white/45">
                <span className="text-white/70">&ldquo;{modal.hotel.name}&rdquo;</span> will be permanently removed.
              </p>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="mb-4 rounded-xl px-4 py-3 text-xs text-red-300"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex gap-3">
                <button
                  onClick={() => setModal(null)}
                  className="flex-1 rounded-full py-2.5 text-sm font-semibold text-white/50 transition-colors hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={confirmDelete}
                  disabled={isPending}
                  className="flex-1 rounded-full bg-red-500/80 py-2.5 text-sm font-bold text-white transition-all hover:bg-red-500 disabled:opacity-60"
                >
                  {isPending ? "Deleting…" : "Delete"}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
