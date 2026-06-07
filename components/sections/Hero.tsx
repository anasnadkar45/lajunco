"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

type HeroSlide = {
  id?: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  altText?: string | null;
};

export default function Hero() {
  const { dir, t } = useLanguage();
  const defaultSlides = t.hero.slides;

  const [slides, setSlides] = useState<HeroSlide[]>(() => {
    return (defaultSlides as unknown as any[]).map((slide) => ({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      imageUrl: `/services/${slide.image}`,
      altText: slide.subtitle,
    }));
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const slideDuration = 7000;

  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const res = await fetch("/api/admin/hero-images");
        const data = await res.json();

        // Check if data is an array (direct API response) or has an images property
        const imagesArray = Array.isArray(data) ? data : data?.images;

        if (imagesArray && imagesArray.length > 0) {
          const defaultArray = defaultSlides as unknown as any[];

          const dbSlides: HeroSlide[] = imagesArray.map(
            (
              image: {
                id?: string | number;
                imageUrl: string;
                title?: string;
                description?: string;
                altText?: string | null;
              },
              index: number
            ) => {
              const defaultSlideContent =
                defaultArray[index % defaultArray.length];

              return {
                id: image.id ? Number(image.id) : index,
                title: defaultSlideContent?.title || "Hero Title",
                subtitle: defaultSlideContent?.subtitle || "Hero Subtitle",
                description:
                  image.description || defaultSlideContent?.description || "Hero Description",
                imageUrl: image.imageUrl,
                altText: image.altText || "Hero image",
              };
            }
          );

          // If we have fewer images than default slides, add remaining defaults
          const remainingCount = Math.max(0, (defaultArray as any[]).length - dbSlides.length);
          const defaultHeroSlides: HeroSlide[] = (defaultArray as any[])
            .slice(dbSlides.length)
            .slice(0, remainingCount)
            .map((slide) => ({
              title: slide.title,
              subtitle: slide.subtitle,
              description: slide.description,
              imageUrl: `/images/${slide.image}`,
              altText: slide.subtitle,
            }));

          const combinedSlides = [
            ...dbSlides,
            ...defaultHeroSlides,
          ].slice(0, 6);

          setSlides(combinedSlides);
        }
      } catch (error) {
        console.error("Failed to fetch hero images:", error);
        // Keep using default slides on error
      }
    }

    fetchHeroImages();
  }, [defaultSlides]);

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

  if (!activeSlide) {
    return null;
  }

  const imageSource =
    activeSlide.imageUrl && activeSlide.imageUrl.startsWith("http")
      ? activeSlide.imageUrl
      : activeSlide.imageUrl || `/images/placeholder.jpg`;

  const contentAnimation = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.14,
      },
    },
  };

  const itemAnimation = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-950 text-white"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide.imageUrl}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={imageSource}
            alt={activeSlide.altText || activeSlide.title}
            width={1920}
            height={1080}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(249,115,22,0.08)_0%,transparent_10%)]" />

        <div className="absolute inset-x-0 top-0 h-full">
          <div
            className="absolute left-0 h-0.5 w-full bg-[linear-gradient(90deg,transparent,rgba(249,115,22,0.9),transparent)] shadow-[0_0_30px_rgba(249,115,22,0.8)] blur-sm"
            style={{ animation: "scan 7s linear infinite" }}
          />
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-32 bg-linear-to-r from-slate-950/50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-32 bg-linear-to-l from-slate-950/50 to-transparent" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0 bg-slate-700/20"
      />

      <div className="relative z-40 mx-auto flex h-full max-w-6xl items-center px-6 pt-52 sm:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={contentAnimation as any}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(6px)",
              transition: { duration: 0.35 },
            }}
            className={`w-full md:w-1/2 ${dir === "rtl" ? "text-right" : "text-left"
              }`}
          >
            <motion.p
              variants={itemAnimation as any}
              className="mb-4 inline-block rounded-lg bg-primary/35 px-4 py-2 text-sm text-primary"
            >
              {t.hero.badge}
            </motion.p>

            <motion.p
              variants={itemAnimation as any}
              className="text-sm font-bold uppercase tracking-[0.45em] text-primary"
            >
              {activeSlide.subtitle}
            </motion.p>

            <motion.h1
              variants={itemAnimation as any}
              className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
            >
              {activeSlide.title}
            </motion.h1>

            <motion.p
              variants={itemAnimation as any}
              className="mt-6 max-w-xl text-lg text-gray-200 sm:text-xl"
            >
              {activeSlide.description}
            </motion.p>

            <motion.div
              variants={itemAnimation as any}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Button 
                size="lg" 
                className="font-bold text-secondary" 
                onClick={() => scrollToSection("contact")}
                >
                  {t.hero.primaryButton}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}>
                <Button
                  size="lg"
                  className="rounded-md border border-white/20 bg-white/5 px-8 py-4 font-bold text-white transition-all duration-300 hover:bg-primary"
                  onClick={() => scrollToSection("services")}
                >
                  {t.hero.secondaryButton}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 left-1/2 z-50 w-full -translate-x-1/2"
      >
        <div className="mb-4 flex justify-center gap-3">
          {slides.map((slide, index) => (
            <motion.button
              key={`${slide.id || index}`}
              type="button"
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.85 }}
              className={`h-3 w-3 rounded-full transition ${index === currentSlide ? "bg-primary" : "bg-white/30"
                }`}
              aria-label={`Select slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="h-1 w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      </motion.div>

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
