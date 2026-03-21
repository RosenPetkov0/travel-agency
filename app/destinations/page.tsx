import type { Metadata } from "next"
import type { Destination } from "@/app/page"
import DestinationsGrid from "./DestinationsGrid"

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Explore our curated collection of the world's most extraordinary destinations — from the Maldives and Santorini to Monaco, Bali, and Kyoto.",
  openGraph: {
    title: "Destinations | Lumière Travel",
    description:
      "Explore our curated collection of the world's most extraordinary destinations — from the Maldives and Santorini to Monaco, Bali, and Kyoto.",
  },
}

// ─── Supabase REST (same pattern as root page.tsx) ────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabaseHeaders = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
}

async function fetchDestinations(query: string): Promise<Destination[]> {
  // ilike wildcard filter — only applied when query is non-empty
  const filter = query ? `&name=ilike.*${encodeURIComponent(query)}*` : ""
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/destinations?select=*${filter}&order=rating.desc`,
    { headers: supabaseHeaders, cache: "no-store" }
  )
  if (!res.ok) {
    console.error(`[Supabase] ${res.status} ${res.statusText}`)
    return []
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return res.json()
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DestinationsPage(props: {
  searchParams: Promise<{ query?: string; date?: string; travelers?: string }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams.query?.trim() ?? ""
  const date = searchParams.date ?? ""
  const travelers = searchParams.travelers ?? ""
  const destinations = await fetchDestinations(query)

  return (
    <main className="min-h-screen bg-[#0A1628]">
      {/* ── Page header ── */}
      <div className="relative flex flex-col items-center justify-center px-4 pb-12 pt-28 text-center sm:pt-32">
        {/* Decorative glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "600px",
            height: "300px",
            background: "radial-gradient(ellipse, rgba(212, 168, 83, 0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative mb-5 flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D4A853]" />
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#D4A853]">
            {query ? `Search results` : "All Destinations"}
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D4A853]" />
        </div>

        <h1
          className="relative mb-4 text-3xl font-bold tracking-tight text-white sm:text-5xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {query ? (
            <>
              Results for{" "}
              <em className="not-italic text-[#D4A853]">&ldquo;{query}&rdquo;</em>
            </>
          ) : (
            <>
              Explore the World&apos;s{" "}
              <em className="not-italic text-[#D4A853]">Finest Retreats</em>
            </>
          )}
        </h1>

        <p className="relative max-w-md text-sm text-white/45 sm:text-base">
          {destinations.length === 0
            ? "No destinations match your search."
            : `${destinations.length} destination${destinations.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Active filters */}
        {(date || travelers) && (
          <div className="relative mt-4 flex flex-wrap justify-center gap-2">
            {date && (
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white/60"
                style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}
              >
                📅 {date}
              </span>
            )}
            {travelers && (
              <span
                className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white/60"
                style={{ background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)" }}
              >
                👥 {travelers} traveler{travelers !== "1" ? "s" : ""}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── Results grid (Client Component) ── */}
      <DestinationsGrid destinations={destinations} />
    </main>
  )
}
