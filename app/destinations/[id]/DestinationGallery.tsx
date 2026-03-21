"use client"

import { useState } from "react"

export default function DestinationGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [failedImages, setFailedImages] = useState<number[]>([])

  const fail = (index: number) =>
    setFailedImages((prev) => (prev.includes(index) ? prev : [...prev, index]))

  const visible = images.filter((_, i) => !failedImages.includes(i))

  if (visible.length === 0) return null

  const [main, ...thumbs] = visible

  return (
    /* Asymmetric: 1 large left spanning 2 rows + up to 3 thumbs stacked right */
    <div className="grid grid-cols-2 gap-3 md:h-[520px] md:grid-cols-3 md:grid-rows-2">
      {/* Main image — always col-span-2 / row-span-2 on md+ */}
      <div className="col-span-2 row-span-1 overflow-hidden rounded-2xl md:row-span-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={main}
          alt={`${name} view 1`}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
          style={{ minHeight: "220px" }}
          onError={() => fail(images.indexOf(main))}
        />
      </div>

      {/* Thumbnails — up to 3, each hidden if broken */}
      {thumbs.slice(0, 3).map((src, i) => (
        <div key={src} className="overflow-hidden rounded-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${name} view ${i + 2}`}
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            style={{ minHeight: "120px" }}
            onError={() => fail(images.indexOf(src))}
          />
        </div>
      ))}
    </div>
  )
}
