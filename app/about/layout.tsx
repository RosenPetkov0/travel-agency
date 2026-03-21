import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Since 2011, Lumière Travel has been crafting bespoke luxury journeys for the world's most discerning travellers. Meet the team behind every extraordinary experience.",
  openGraph: {
    title: "About Us | Lumière Travel",
    description:
      "Since 2011, Lumière Travel has been crafting bespoke luxury journeys for the world's most discerning travellers. Meet the team behind every extraordinary experience.",
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
