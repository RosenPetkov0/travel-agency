import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import DashboardClient from "./DashboardClient"

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserInquiry = {
  id: string
  name: string
  email: string
  message: string
  location: string | null
  status: "new" | "read" | "replied"
  created_at: string
}

export type UserProfile = {
  id: string
  email: string
  role: string
  created_at: string
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient()

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, role, created_at")
    .eq("id", user.id)
    .single()

  // Fetch user's inquiries by email
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("id, name, email, message, location, status, created_at")
    .eq("email", user.email ?? "")
    .order("created_at", { ascending: false })

  const userProfile: UserProfile = {
    id: user.id,
    email: user.email ?? "",
    role: profile?.role ?? "user",
    created_at: profile?.created_at ?? user.created_at,
  }

  return (
    <DashboardClient
      profile={userProfile}
      inquiries={(inquiries ?? []) as UserInquiry[]}
    />
  )
}
