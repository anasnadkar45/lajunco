"use client";

import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
};

export default function PageHeader({ title, subtitle, image }: Props) {
  return (
    <section className="relative min-h-[36vh] flex items-center overflow-hidden bg-slate-950 text-white">
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 to-slate-950/80" />

      <div className="relative mx-auto max-w-6xl px-6 py-20">
        {subtitle && <p className="mb-2 inline-block rounded-lg bg-primary/25 px-3 py-1 text-sm text-primary">{subtitle}</p>}

        <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">{title}</h1>

        <p className="mt-4 max-w-2xl text-lg text-gray-200" />

        <div className="mt-6">
          <Button size="lg">Request a Quote</Button>
        </div>
      </div>
    </section>
  );
}
