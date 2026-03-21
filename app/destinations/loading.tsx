// ─── Skeleton helpers ─────────────────────────────────────────────────────────

function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
}

function CardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Image area */}
      <Bone className="h-56 w-full rounded-none rounded-t-3xl sm:h-64" />

      {/* Body */}
      <div className="space-y-3 p-5">
        {/* Gold accent line */}
        <div className="h-0.5 w-8 animate-pulse rounded-full bg-[#D4A853]/20" />
        <Bone className="h-5 w-3/4" />
        <Bone className="h-3.5 w-1/2" />
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-5/6" />
        {/* Button */}
        <Bone className="mt-4 h-10 w-full" />
      </div>
    </div>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function DestinationsLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* Hero skeleton */}
      <div className="relative flex h-72 items-end overflow-hidden sm:h-80">
        <Bone className="absolute inset-0 rounded-none" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A1628 0%, transparent 60%)" }}
        />
        <div className="relative w-full px-6 pb-10 sm:px-10 lg:px-20">
          <Bone className="mb-3 h-3 w-28" />
          <Bone className="mb-2 h-9 w-64 sm:w-96" />
          <Bone className="h-4 w-48 sm:w-72" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div
        className="border-b px-6 py-4 sm:px-10 lg:px-20"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          {[80, 120, 100, 96].map((w, i) => (
            <div
              key={i}
              className="h-8 animate-pulse rounded-full bg-white/5"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-10 lg:px-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
