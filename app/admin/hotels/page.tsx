import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import HotelsClient from "./HotelsClient"

export default async function AdminHotelsPage() {
  const supabase = await createClient()

  const { data: hotels, error } = await supabase
    .from("hotels")
    .select("id, name, location, image_url, price_per_night, rating, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch hotels:", error.message)
  }

  return (
    <main className="min-h-screen bg-[#0A1628] px-4 pb-20 pt-24 sm:px-8 lg:px-14">

      {/* ── Background glow ── */}
      <div
        className="pointer-events-none fixed left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ── Back link ── */}
      <div className="mb-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-[#D4A853]"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L6 8l4-4" />
          </svg>
          Admin Panel
        </Link>
      </div>

      <HotelsClient hotels={hotels ?? []} />
    </main>
  )
}
