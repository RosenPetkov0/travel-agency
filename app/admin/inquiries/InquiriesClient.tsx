"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { updateInquiryStatus } from "./actions"

// ─── Types ────────────────────────────────────────────────────────────────────

export type Inquiry = {
  id: string
  name: string
  email: string
  message: string
  location: string | null
  status: "new" | "read" | "replied"
  created_at: string
}

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<Inquiry["status"], string> = {
  new: "bg-[#D4A853]/15 text-[#D4A853] border-[#D4A853]/25",
  read: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  replied: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
}

function StatusBadge({ status }: { status: Inquiry["status"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  )
}

// ─── Row actions ──────────────────────────────────────────────────────────────

function StatusActions({
  inquiry,
  onSuccess,
}: {
  inquiry: Inquiry
  onSuccess: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [err, setErr] = useState<string | null>(null)

  const update = (status: Inquiry["status"]) => {
    setErr(null)
    startTransition(async () => {
      try {
        await updateInquiryStatus(inquiry.id, status)
        onSuccess()
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed")
      }
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {inquiry.status !== "read" && (
        <button
          onClick={() => update("read")}
          disabled={isPending}
          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-blue-300/70 transition-all hover:text-blue-300 disabled:opacity-50"
          style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.14)" }}
        >
          Mark Read
        </button>
      )}
      {inquiry.status !== "replied" && (
        <button
          onClick={() => update("replied")}
          disabled={isPending}
          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-emerald-300/70 transition-all hover:text-emerald-300 disabled:opacity-50"
          style={{ background: "rgba(52,211,153,0.07)", border: "1px solid rgba(52,211,153,0.14)" }}
        >
          Mark Replied
        </button>
      )}
      {inquiry.status !== "new" && (
        <button
          onClick={() => update("new")}
          disabled={isPending}
          className="rounded-lg px-2.5 py-1 text-xs font-semibold text-[#D4A853]/60 transition-all hover:text-[#D4A853] disabled:opacity-50"
          style={{ background: "rgba(212,168,83,0.07)", border: "1px solid rgba(212,168,83,0.14)" }}
        >
          Reset
        </button>
      )}
      {err && <span className="text-xs text-red-400">{err}</span>}
    </div>
  )
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({
  inquiry,
  onClose,
  onStatusChange,
}: {
  inquiry: Inquiry
  onClose: () => void
  onStatusChange: () => void
}) {
  return (
    <>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40"
        style={{ background: "rgba(5,12,25,0.75)", backdropFilter: "blur(6px)" }}
      />
      <motion.aside
        key="panel"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 40 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col overflow-y-auto"
        style={{
          background: "rgba(8,18,34,0.97)",
          backdropFilter: "blur(32px)",
          borderLeft: "1px solid rgba(212,168,83,0.12)",
          boxShadow: "-24px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4A853]">Inquiry Detail</span>
          <button onClick={onClose} className="text-white/30 transition-colors hover:text-white">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <line x1="3" y1="3" x2="15" y2="15" />
              <line x1="15" y1="3" x2="3" y2="15" />
            </svg>
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-6 px-7 py-7">
          {/* Status */}
          <div className="flex items-center gap-3">
            <StatusBadge status={inquiry.status} />
            <span className="text-xs text-white/30">
              {new Date(inquiry.created_at).toLocaleDateString("en-GB", {
                day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </span>
          </div>

          {/* Sender info */}
          <div className="rounded-2xl p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="mb-1 text-xs uppercase tracking-[0.2em] text-white/35">From</div>
            <div className="text-base font-semibold text-white">{inquiry.name}</div>
            <a href={`mailto:${inquiry.email}`} className="text-sm text-[#D4A853]/80 hover:text-[#D4A853]">{inquiry.email}</a>
            {inquiry.location && (
              <div className="mt-1 text-xs text-white/40">Re: {inquiry.location}</div>
            )}
          </div>

          {/* Message */}
          <div>
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Message</div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">{inquiry.message}</p>
          </div>

          {/* Actions */}
          <div className="mt-auto pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-white/35">Update Status</div>
            <StatusActions inquiry={inquiry} onSuccess={onStatusChange} />
          </div>
        </div>
      </motion.aside>
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InquiriesClient({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter()
  const [selected, setSelected] = useState<Inquiry | null>(null)

  const refresh = () => router.refresh()

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-playfair)" }}>
          Inquiries
        </h2>
        <p className="mt-1 text-sm text-white/40">
          {inquiries.filter((i) => i.status === "new").length} new · {inquiries.length} total
        </p>
      </div>

      {inquiries.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-2xl py-20 text-center"
          style={{ border: "1px dashed rgba(255,255,255,0.1)" }}
        >
          <span className="mb-3 text-3xl text-[#D4A853]/40">✉</span>
          <p className="text-sm text-white/30">No inquiries yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((inq, i) => (
            <motion.div
              key={inq.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="group rounded-2xl p-5 transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: inq.status === "new"
                  ? "1px solid rgba(212,168,83,0.18)"
                  : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                {/* Left */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2.5">
                    <StatusBadge status={inq.status} />
                    <span className="text-xs text-white/30">
                      {new Date(inq.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mb-0.5 text-sm font-semibold text-white">{inq.name}</div>
                  <div className="text-xs text-white/45">{inq.email}</div>
                  {inq.location && (
                    <div className="mt-1 text-xs text-[#D4A853]/60">Re: {inq.location}</div>
                  )}
                  <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/45">
                    {inq.message}
                  </p>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => setSelected(inq)}
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white/50 transition-all hover:text-[#D4A853]"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    View
                  </button>
                  <StatusActions inquiry={inq} onSuccess={refresh} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <DetailPanel
            inquiry={selected}
            onClose={() => setSelected(null)}
            onStatusChange={() => {
              refresh()
              setSelected(null)
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
