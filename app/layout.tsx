import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"
import PageTransition from "./components/PageTransition"
import Navbar from "./components/Navbar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

const OG_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"

export const metadata: Metadata = {
  title: {
    default: "Lumière Travel | Luxury Travel Experiences",
    template: "%s | Lumière Travel",
  },
  description:
    "Tailored luxury travel to the world's most breathtaking destinations. Exclusive packages, 5-star hotels, and bespoke itineraries since 2011.",
  openGraph: {
    type: "website",
    siteName: "Lumière Travel",
    title: "Lumière Travel | Luxury Travel Experiences",
    description:
      "Tailored luxury travel to the world's most breathtaking destinations. Exclusive packages, 5-star hotels, and bespoke itineraries since 2011.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Lumière Travel — Luxury Travel" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière Travel | Luxury Travel Experiences",
    description:
      "Tailored luxury travel to the world's most breathtaking destinations. Exclusive packages, 5-star hotels, and bespoke itineraries since 2011.",
    images: [OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased overflow-x-hidden bg-[#0A1628]`}
      >
        <Navbar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
