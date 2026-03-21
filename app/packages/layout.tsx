import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Travel Packages",
  description:
    "Choose from our expertly crafted luxury travel packages — Essential, Signature, and Elite — each tailored to deliver an unforgettable bespoke journey.",
  openGraph: {
    title: "Travel Packages | Lumière Travel",
    description:
      "Choose from our expertly crafted luxury travel packages — Essential, Signature, and Elite — each tailored to deliver an unforgettable bespoke journey.",
  },
}

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
