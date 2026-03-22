// ─── Skeleton card ────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl bg-white/5 animate-pulse"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Image area */}
      <div className="h-80 w-full bg-white/5" />

      {/* Body */}
      <div className="space-y-3 p-5">
        {/* Golden shimmer accent */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
        {/* Name */}
        <div className="h-4 w-3/4 rounded-full bg-white/10" />
        {/* Location */}
        <div className="h-3 w-1/2 rounded-full bg-white/10" />
      </div>
    </div>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function HotelsLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* Hero skeleton — matches HotelsClient's full-height hero */}
      <div className="relative flex h-[88vh] min-h-[580px] items-end overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-white/5" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A1628 0%, rgba(10,22,40,0.2) 60%)" }}
        />
        {/* Golden shimmer line across bottom of hero */}
        <div className="relative w-full">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
          <div className="px-6 pb-20 pt-4 sm:px-10 lg:px-20">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-[#D4A853]/20" />
              <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />
            </div>
            <div className="mb-4 h-12 w-72 animate-pulse rounded-full bg-white/10 sm:w-[420px]" />
            <div className="h-4 w-64 animate-pulse rounded-full bg-white/[0.06] sm:w-96" />
          </div>
        </div>
      </div>

      {/* Grid — matches real page: sm:grid-cols-2 */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
