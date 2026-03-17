import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase-server"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // 1. Check session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // 2. Check role
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/")

  return <>{children}</>
}
