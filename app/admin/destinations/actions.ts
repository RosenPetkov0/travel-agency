"use server"

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// ─── Guard ────────────────────────────────────────────────────────────────────
// All mutations run server-side and verify admin role before touching data.
// This is defence-in-depth: the layout already blocks the route, but server
// actions are callable from anywhere so we re-check here.

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

// ─── Add ──────────────────────────────────────────────────────────────────────

export async function addDestination(formData: FormData) {
  const supabase = await getAdminClient()

  const price = parseFloat(formData.get("price") as string)
  const rating = formData.get("rating") ? parseFloat(formData.get("rating") as string) : null

  const { error } = await supabase.from("destinations").insert({
    name: (formData.get("name") as string).trim(),
    location: (formData.get("location") as string).trim(),
    description: (formData.get("description") as string)?.trim() || null,
    image_url: (formData.get("image_url") as string)?.trim() || null,
    price,
    rating,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/destinations")
}

// ─── Update ───────────────────────────────────────────────────────────────────

export async function updateDestination(formData: FormData) {
  const supabase = await getAdminClient()

  const id = formData.get("id") as string
  const price = parseFloat(formData.get("price") as string)
  const rating = formData.get("rating") ? parseFloat(formData.get("rating") as string) : null

  const { error } = await supabase
    .from("destinations")
    .update({
      name: (formData.get("name") as string).trim(),
      location: (formData.get("location") as string).trim(),
      description: (formData.get("description") as string)?.trim() || null,
      image_url: (formData.get("image_url") as string)?.trim() || null,
      price,
      rating,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/destinations")
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export async function deleteDestination(id: string) {
  const supabase = await getAdminClient()

  const { error } = await supabase.from("destinations").delete().eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/destinations")
}
