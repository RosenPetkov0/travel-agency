import { createClient } from "@/utils/supabase/server"
import AdminDashboardClient from "./AdminDashboardClient"

export default async function AdminPage() {
  const supabase = await createClient()

  // Parallel count queries — errors default to 0 so the page never crashes
  const [destRes, hotelsRes, inquiriesRes, usersRes] = await Promise.all([
    supabase.from("destinations").select("*", { count: "exact", head: true }),
    supabase.from("hotels").select("*", { count: "exact", head: true }),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("profiles").select("*", { count: "exact", head: true }),
  ])

  const stats = {
    destinations: destRes.count ?? 0,
    hotels: hotelsRes.count ?? 0,
    newInquiries: inquiriesRes.count ?? 0,
    users: usersRes.count ?? 0,
  }

  return <AdminDashboardClient stats={stats} />
}
