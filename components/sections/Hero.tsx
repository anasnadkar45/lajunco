// src/components/sections/Hero.tsx

"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function Hero() {
  const { lang, dir, t } = useLanguage();

  return (
    <section
      id="home"
      className="grid min-h-screen grid-cols-1 items-center gap-10 bg-[#071a33] px-8 pt-28 text-white md:grid-cols-2"
    >
      <div
        className={`
          ${dir === "rtl" ? "text-right md:order-2" : "text-left md:order-1"}
        `}
      >
        <p className="mb-4 inline-block rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-500">
          {t.hero.badge}
        </p>

        <h1 className="mb-6 max-w-2xl text-5xl font-bold leading-tight md:text-6xl">
          {t.hero.title}
        </h1>

        <p className="mb-8 max-w-xl text-lg text-gray-300">
          {t.hero.description}
        </p>

        <div
          className={`flex flex-wrap gap-4 ${
            dir === "rtl" ? "justify-start" : "justify-start"
          }`}
        >
          <button className="rounded-full bg-yellow-500 px-6 py-3 font-semibold text-[#071a33]">
            {t.hero.primaryButton}
          </button>

          <button className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white">
            {t.hero.secondaryButton}
          </button>
        </div>
      </div>

      <div className={dir === "rtl" ? "md:order-1" : "md:order-2"}>
        <div className="h-[420px] rounded-3xl bg-white/10 p-4">
          <img
            src="/security-hero.jpg"
            alt={lang === "en" ? "Security service" : "خدمة أمنية"}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}