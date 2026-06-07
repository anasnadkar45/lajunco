"use client"

import React from "react"
import { useLanguage } from "@/context/LanguageProvider"
import Image from "next/image"
import { Marquee } from "../ui/marquee"
import { cn } from "@/lib/utils"

const Client = () => {
  const { dir, t } = useLanguage()
  const clients = t.clients
  const marqueeItems = [...clients.items, ...clients.items]
  const isRtl = dir === "rtl"

  const firstRow = marqueeItems.slice(0, marqueeItems.length / 2)
  const secondRow = marqueeItems.slice(marqueeItems.length / 2)
  const ClientCard = ({ name }: { name: string }) => {
    return (
      <figure
        className={cn(
          "relative h-full w-52 cursor-pointer overflow-hidden rounded-xl border p-2 transition duration-300 ease-out",
          "border-gray-950/10 bg-gray-950/2 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-primary/70 hover:bg-white/95 hover:shadow-lg grayscale hover:grayscale-0",
        )}
      >
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.png"
            alt={name}
            width={200}
            height={120}
            className="h-[80px] w-[160px] rounded-md object-cover"
          />
          <figcaption className="text-xs font-semibold text-muted-foreground">
            {name}
          </figcaption>
        </div>
      </figure>
    )
  }


  return (
    <section id="clients" className="bg-white py-16 text-slate-950">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-[0.3em]">
            {clients.badge}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {clients.title}
          </h2>

          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-primary" />
        </div>

        <div className="mt-12">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ClientCard key={review.name} name={review.name} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ClientCard key={review.name} name={review.name} />
              ))}
            </Marquee>
            <div className="from-white pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
            <div className="from-white pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Client

