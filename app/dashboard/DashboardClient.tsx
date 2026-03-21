"use client"

import { motion } from "framer-motion"
import type { UserProfile, UserInquiry } from "./page"

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<UserInquiry["status"], { dot: string; label: string; badge: string }> = {
  new: {
    dot: "bg-[#D4A853]",
    label: "Awaiting reply",
    badge: "bg-[#D4A853]/10 text-[#D4A853] border-[#D4A853]/20",
  },
  read: {
    dot: "bg-blue-400",
    label: "Read",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  replied: {
    dot: "bg-emerald-400",
    label: "Replied",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function StatusBadge({ status }: { status: UserInquiry["status"] }) {
  const s = STATUS_STYLES[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${s.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label}
    </span>
  )
}

// ─── Inquiry Card ─────────────────────────────────────────────────────────────

function InquiryCard({ inquiry, index }: { inquiry: UserInquiry; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.45, ease: "easeOut" }}
      className="rounded-2xl p-5 sm:p-6"
      style={{
        background: "rgba(255,255,255,0.025)",
        border:
          inquiry.status === "new"
            ? "1px solid rgba(212,168,83,0.18)"
            : "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <StatusBadge status={inquiry.status} />
        <span className="text-xs text-white/30">{formatDate(inquiry.created_at)}</span>
      </div>

      {inquiry.location && (
        <div className="mb-2 text-xs font-medium text-[#D4A853]/70">
          ✦ {inquiry.location}
        </div>
      )}

      <p className="line-clamp-3 text-sm leading-relaxed text-white/60">{inquiry.message}</p>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardClient({
  profile,
  inquiries,
}: {
  profile: UserProfile
  inquiries: UserInquiry[]
}) {
  const memberSince = formatDate(profile.created_at)
  const newCount = inquiries.filter((i) => i.status === "new").length
  const repliedCount = inquiries.filter((i) => i.status === "replied").length

  return (
    <main className="min-h-screen bg-[#0A1628] pb-24 pt-28 sm:pt-32">
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -translate-x-1/2"
        style={{
          width: 900,
          height: 500,
          background: "radial-gradient(ellipse at 50% 0%, rgba(212,168,83,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A853]/70">
            My Account
          </p>
          <h1
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dashboard
          </h1>
        </motion.div>

        {/* ── Profile card ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5, ease: "easeOut" }}
          className="mb-8 rounded-2xl p-6 sm:p-7"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(212,168,83,0.15)",
          }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[#0A1628]"
              style={{ background: "linear-gradient(135deg, #D4A853, #b8893a)" }}
            >
              {profile.email.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-0.5 truncate text-base font-semibold text-white">
                {profile.email}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-white/35">
                <span className="capitalize">{profile.role}</span>
                <span>·</span>
                <span>Member since {memberSince}</span>
              </div>
            </div>

            {profile.role === "admin" && (
              <span className="rounded-full border border-[#D4A853]/30 bg-[#D4A853]/10 px-3 py-1 text-xs font-semibold text-[#D4A853]">
                Admin
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="mt-6 grid grid-cols-3 divide-x divide-white/[0.06]">
            {[
              { label: "Total Inquiries", value: inquiries.length },
              { label: "Awaiting Reply", value: newCount },
              { label: "Replied", value: repliedCount },
            ].map((stat) => (
              <div key={stat.label} className="px-4 first:pl-0 last:pr-0 text-center sm:text-left">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs text-white/35">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Inquiries ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.4 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">My Inquiries</h2>
            {newCount > 0 && (
              <span className="rounded-full bg-[#D4A853]/15 px-2.5 py-0.5 text-xs font-semibold text-[#D4A853]">
                {newCount} new
              </span>
            )}
          </div>

          {inquiries.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-2xl py-16 text-center"
              style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
            >
              <span className="mb-3 block text-3xl text-[#D4A853]/30">✉</span>
              <p className="text-sm text-white/30">No inquiries yet.</p>
              <p className="mt-1 text-xs text-white/20">
                Browse our destinations and send us a message.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {inquiries.map((inq, i) => (
                <InquiryCard key={inq.id} inquiry={inq} index={i} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </main>
  )
}
