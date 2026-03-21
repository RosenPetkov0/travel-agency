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
      {/* Image */}
      <Bone className="h-64 w-full rounded-none rounded-t-3xl sm:h-72" />

      {/* Body */}
      <div className="space-y-3 p-6">
        {/* Gold accent line */}
        <div className="h-0.5 w-8 animate-pulse rounded-full bg-[#D4A853]/20" />
        {/* Name + stars row */}
        <div className="flex items-center justify-between gap-4">
          <Bone className="h-5 w-1/2" />
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-3 w-3 animate-pulse rounded-sm bg-white/5" />
            ))}
          </div>
        </div>
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-4/5" />
        {/* Button */}
        <Bone className="mt-4 h-11 w-full" />
      </div>
    </div>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function HotelsLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* Hero skeleton */}
      <div className="relative flex h-[88vh] min-h-[580px] items-end overflow-hidden">
        <Bone className="absolute inset-0 rounded-none" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A1628 0%, rgba(10,22,40,0.2) 60%)" }}
        />
        {/* Gold shimmer accent */}
        <div
          className="pointer-events-none absolute inset-0 animate-pulse"
          style={{
            background: "radial-gradient(ellipse at 30% 80%, rgba(212,168,83,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="relative w-full px-6 pb-20 sm:px-10 lg:px-20">
          <div className="mb-5 flex items-center gap-3">
            <div className="h-px w-10 bg-[#D4A853]/20" />
            <Bone className="h-3 w-32" />
          </div>
          <Bone className="mb-4 h-14 w-72 sm:w-[480px]" />
          <Bone className="mb-2 h-14 w-48 sm:w-64" />
          <Bone className="mt-4 h-4 w-80 sm:w-[420px]" />
          <Bone className="mt-2 h-4 w-64 sm:w-96" />
          {/* Stats row */}
          <div className="mt-10 flex items-center gap-8">
            {["w-12", "w-9", "w-10"].map((w, i) => (
              <div key={i} className="space-y-1.5">
                <Bone className={`h-7 ${w}`} />
                <Bone className="h-2.5 w-20" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div
        className="border-b px-6 py-4 sm:px-10 lg:px-20"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            {[80, 140, 140, 96].map((w, i) => (
              <div
                key={i}
                className="h-9 animate-pulse rounded-full bg-white/5"
                style={{ width: w }}
              />
            ))}
          </div>
          <Bone className="hidden h-3 w-20 sm:block" />
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
