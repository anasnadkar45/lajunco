"use client";

import Image from "next/image";
import React from "react";
import { useLanguage } from "@/context/LanguageProvider";
import Link from "next/link";
import { motion } from "motion/react";

const Service = () => {
  const { dir, t } = useLanguage();
  const service = t.service;
  const isRtl = dir === "rtl";

  const statsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const statItem = {
    hidden: {
      opacity: 0,
      y: 28,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const headerContainer = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const headerItem = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.15,
      },
    },
  };

  const cardItem = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.94,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="services"
      className="overflow-hidden bg-secondary py-16 text-white"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center"
        >
          {service.stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={statItem as any}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                className="text-3xl font-bold text-primary"
              >
                {stat.value}
              </motion.p>

              <p className="mt-3 text-sm font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={headerContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="mt-12 text-center"
        >
          <motion.p
            variants={headerItem as any}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-primary"
          >
            {service.badge}
          </motion.p>

          <motion.h2
            variants={headerItem as any}
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {service.title}
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="mx-auto mt-4 h-1 rounded-full bg-primary"
          />
        </motion.div>

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
        >
          {service.cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardItem as any}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                className="group relative block rounded-3xl border border-white/10 bg-white p-1.5 shadow-lg shadow-slate-950/20 transition hover:shadow-2xl"
                href={`/services${card.link}`}
              >
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={`/services/${card.image}`}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover grayscale-0 transition duration-500 group-hover:grayscale"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.2 + index * 0.08,
                    ease: "easeOut",
                  }}
                  className="flex flex-col gap-2 px-4  text-center"
                >
                  <h3 className="text-lg font-bold text-secondary">
                    {card.title}
                  </h3>

                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </motion.div>

                <motion.span
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25 + index * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  className="shimmer absolute -bottom-6 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
                >
                  {index + 1}
                </motion.span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Service;