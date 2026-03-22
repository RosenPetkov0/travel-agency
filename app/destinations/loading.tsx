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

export default function DestinationsLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* Page header skeleton */}
      <div className="flex flex-col items-center px-4 pb-12 pt-28 text-center sm:pt-32">
        {/* Label line */}
        <div className="mb-5 flex items-center gap-3">
          <div className="h-px w-10 bg-[#D4A853]/20" />
          <div className="h-3 w-32 animate-pulse rounded-full bg-white/10" />
          <div className="h-px w-10 bg-[#D4A853]/20" />
        </div>
        {/* Title */}
        <div className="mb-4 h-9 w-72 animate-pulse rounded-full bg-white/10 sm:w-96" />
        {/* Subtitle */}
        <div className="h-4 w-48 animate-pulse rounded-full bg-white/[0.06] sm:w-64" />
      </div>

      {/* Grid — matches real page: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}
      <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
