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

export async function addHotel(formData: FormData) {
  const supabase = await getAdminClient()

  const price_per_night = parseFloat(formData.get("price_per_night") as string)
  const rating = formData.get("rating") ? parseFloat(formData.get("rating") as string) : null

  const { error } = await supabase.from("hotels").insert({
    name: (formData.get("name") as string).trim(),
    location: (formData.get("location") as string).trim(),
    image_url: (formData.get("image_url") as string)?.trim() || null,
    price_per_night,
    rating,
  })

  if (error) throw new Error(error.message)
  revalidatePath("/admin/hotels")
}

export async function updateHotel(formData: FormData) {
  const supabase = await getAdminClient()

  const id = formData.get("id") as string
  const price_per_night = parseFloat(formData.get("price_per_night") as string)
  const rating = formData.get("rating") ? parseFloat(formData.get("rating") as string) : null

  const { error } = await supabase
    .from("hotels")
    .update({
      name: (formData.get("name") as string).trim(),
      location: (formData.get("location") as string).trim(),
      image_url: (formData.get("image_url") as string)?.trim() || null,
      price_per_night,
      rating,
    })
    .eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/hotels")
}

export async function deleteHotel(id: string) {
  const supabase = await getAdminClient()

  const { error } = await supabase.from("hotels").delete().eq("id", id)

  if (error) throw new Error(error.message)
  revalidatePath("/admin/hotels")
}
