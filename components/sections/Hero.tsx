"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "../ui/button";

export default function Hero() {
  const { lang, dir, t } = useLanguage();
  const slides = t.hero.slides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideDuration = 7000;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCurrentSlide((previous) => (previous + 1) % slides.length);
    }, slideDuration);

    return () => window.clearTimeout(timer);
  }, [slides.length, currentSlide]);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / slideDuration) * 100));
    }, 50);

    return () => window.clearInterval(tick);
  }, [currentSlide]);

  const activeSlide = slides[currentSlide];

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <img
        src={`/images/${activeSlide.image}`}
        alt={lang === "en" ? activeSlide.subtitle : activeSlide.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-1000 ease-out"
      />

      <div className="pointer-events-none absolute z-30 inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(249,115,22,0.08)_0%,transparent_10%)]" />
        <div className="absolute inset-x-0 top-0 h-full">
          <div
            className="absolute left-0 h-0.5 w-full bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.9),transparent)] shadow-[0_0_30px_rgba(249,115,22,0.8)] blur-sm"
            style={{ animation: "scan 7s linear infinite" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950/90 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950/90 to-transparent" />
      </div>

      <div className="absolute inset-0 bg-slate-950/60 " />

      <div className="relative mx-auto flex h-full max-w-6xl items-center px-6 py-40 sm:px-10">
        <div className={`w-full md:w-1/2 ${dir === "rtl" ? "text-right" : "text-left"}`}>
          <p className="mb-4 inline-block rounded-lg bg-primary/35 px-4 py-2 text-sm text-primary">
            {t.hero.badge}
          </p>

          <p className="text-sm font-bold uppercase tracking-[0.45em] text-primary">
            {activeSlide.subtitle}
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            {activeSlide.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-gray-200 sm:text-xl">
            {activeSlide.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button size="lg" className="font-bold text-secondary">
              {t.hero.primaryButton}
            </Button>
            <Button size="lg" className="rounded-md font-bold text-white border border-primary/20 bg-white/5 px-8 py-4  hover:bg-primary transition-all duration-300">
              {t.hero.secondaryButton}
            </Button>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2">
        <div className="mb-4 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={`${slide.subtitle}-${index}`}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition ${index === currentSlide ? "bg-primary" : "bg-white/30"}`}
              aria-label={`Select slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="h-1 w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: -2px;
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          95% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
