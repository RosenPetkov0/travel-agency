// ─── Skeleton helper ──────────────────────────────────────────────────────────

function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-2xl bg-white/5 ${className}`} />
}

// ─── Loading ──────────────────────────────────────────────────────────────────

export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-[#0A1628]">

      {/* ── Hero skeleton ── */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-36 text-center sm:pt-44">
        {/* Background glow */}
        <div
          className="pointer-events-none absolute inset-0 animate-pulse"
          style={{
            background: "radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.05) 0%, transparent 65%)",
          }}
        />

        {/* Eyebrow */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-[#D4A853]/20" />
          <Bone className="h-3 w-28" />
          <div className="h-px w-10 bg-[#D4A853]/20" />
        </div>

        {/* Title */}
        <Bone className="mb-3 h-12 w-72 sm:w-[440px]" />
        <Bone className="mb-8 h-12 w-56 sm:w-80" />

        {/* Subtitle lines */}
        <Bone className="mx-auto mb-2 h-4 w-80 sm:w-[500px]" />
        <Bone className="mx-auto mb-2 h-4 w-72 sm:w-[460px]" />
        <Bone className="mx-auto mb-12 h-4 w-56 sm:w-96" />

        {/* Stats row */}
        <div className="flex items-center justify-center gap-8 sm:gap-16">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Bone className="h-10 w-16" />
              <Bone className="h-3 w-24" />
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto mb-16 flex max-w-4xl items-center gap-4 px-6">
        <div className="h-px flex-1 bg-white/5" />
        <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D4A853]/20" />
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {/* ── Story section skeleton ── */}
      <section className="mx-auto mb-24 max-w-5xl px-6 sm:px-10">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Text col */}
          <div className="space-y-4">
            <Bone className="h-3 w-24" />
            <Bone className="h-8 w-48 sm:w-64" />
            <div className="space-y-2 pt-2">
              {["w-full", "w-[95%]", "w-[88%]", "w-[92%]", "w-3/4", "w-[82%]"].map((w, i) => (
                <Bone key={i} className={`h-3.5 ${w}`} />
              ))}
            </div>
            <div className="pt-4">
              <Bone className="h-11 w-44 rounded-full" />
            </div>
          </div>

          {/* Image col */}
          <Bone className="h-72 w-full rounded-3xl lg:h-auto" />
        </div>
      </section>

      {/* ── Values grid skeleton ── */}
      <section className="mx-auto mb-24 max-w-5xl px-6 sm:px-10">
        <div className="mb-10 flex items-center gap-3">
          <div className="h-px w-10 bg-[#D4A853]/20" />
          <Bone className="h-3 w-28" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              {/* Gold shimmer icon */}
              <div className="mb-4 h-10 w-10 animate-pulse rounded-xl bg-[#D4A853]/10" />
              <Bone className="mb-2 h-5 w-28" />
              <Bone className="h-3 w-full" />
              <Bone className="mt-1.5 h-3 w-4/5" />
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact form skeleton ── */}
      <section className="mx-auto mb-24 max-w-2xl px-6 sm:px-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-px w-10 bg-[#D4A853]/20" />
          <Bone className="h-3 w-24" />
        </div>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Bone className="h-12" />
            <Bone className="h-12" />
          </div>
          <Bone className="h-12" />
          <Bone className="h-32" />
          <Bone className="h-12 w-full rounded-full" />
        </div>
      </section>

    </div>
  )
}
