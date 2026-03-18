"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function getAdminClient() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  if (profile?.role !== "admin") redirect("/")

  return supabase
}

export async function updateInquiryStatus(
  id: string,
  status: "new" | "read" | "replied"
) {
  const supabase = await getAdminClient()

  const { error } = await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/inquiries")
}
