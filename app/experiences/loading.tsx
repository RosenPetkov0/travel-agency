// ─── Skeleton helper ──────────────────────────────────────────────────────────

function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
}

function ExperienceCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-3xl"
      style={{ border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Image */}
      <Bone className="h-56 w-full rounded-none rounded-t-3xl sm:h-64" />

      {/* Body */}
      <div className="space-y-3 p-5">
        {/* Gold accent line */}
        <div className="h-0.5 w-8 animate-pulse rounded-full bg-[#D4A853]/20" />
        {/* Category pill */}
        <Bone className="h-5 w-20 rounded-full" />
        {/* Title */}
        <Bone className="h-6 w-3/4" />
        {/* Location + duration row */}
        <div className="flex items-center gap-3">
          <Bone className="h-3 w-28" />
          <Bone className="h-3 w-16" />
        </div>
        {/* Description */}
        <Bone className="h-3 w-full" />
        <Bone className="h-3 w-5/6" />
        {/* Price + button */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <Bone className="h-7 w-24" />
          <Bone className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function ExperiencesLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* ── Hero skeleton ── */}
      <div className="relative flex h-[80vh] min-h-[520px] items-end overflow-hidden">
        <Bone className="absolute inset-0 rounded-none" />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 animate-pulse"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(212,168,83,0.06) 0%, transparent 60%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, #0A1628 0%, rgba(10,22,40,0.15) 55%)" }}
        />

        {/* Hero text area */}
        <div className="relative w-full px-6 pb-16 text-center sm:px-10">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-[#D4A853]/20" />
            <Bone className="h-3 w-32" />
            <div className="h-px w-10 bg-[#D4A853]/20" />
          </div>

          {/* Title */}
          <div className="flex flex-col items-center gap-3 mb-6">
            <Bone className="h-12 w-80 sm:w-[500px]" />
            <Bone className="h-12 w-56 sm:w-80" />
          </div>

          {/* Subtitle */}
          <Bone className="mx-auto mb-2 h-4 w-72 sm:w-[420px]" />
          <Bone className="mx-auto h-4 w-56 sm:w-80" />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <Bone className="h-2.5 w-10 rounded-full" />
          <Bone className="h-3 w-3 rounded-sm" />
        </div>
      </div>

      {/* ── Category filter skeleton ── */}
      <div
        className="border-b px-4 py-5 sm:px-10"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="mx-auto flex max-w-6xl justify-center gap-2 flex-wrap">
          {[64, 80, 100, 120, 96].map((w, i) => (
            <div
              key={i}
              className="h-9 animate-pulse rounded-full bg-white/5"
              style={{ width: w }}
            />
          ))}
        </div>
      </div>

      {/* ── Cards grid skeleton ── */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-10">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ExperienceCardSkeleton key={i} />
          ))}
        </div>
      </div>

    </div>
  )
}
