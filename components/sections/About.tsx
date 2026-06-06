"use client";

import Image from "next/image";
import React from "react";
import { useLanguage } from "@/context/LanguageProvider";
import { motion } from "motion/react";

const About = () => {
  const { dir, t } = useLanguage();
  const about = t.about;
  const isRtl = dir === "rtl";

  const textContainer = {
    hidden: {
      opacity: 0,
      x: isRtl ? 50 : -50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.15,
      },
    },
  };

  const textItem = {
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

  const imageContainer = {
    hidden: {
      opacity: 0,
      x: isRtl ? -50 : 50,
      scale: 0.94,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="about" className="overflow-hidden bg-gray-100 py-12 sm:py-16">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] sm:px-6">
        <motion.div
          variants={textContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`space-y-6 text-center ${
            isRtl ? "lg:text-right" : "lg:text-left"
          }`}
        >
          <motion.p
            variants={textItem as any}
            className="font-semibold text-primary"
          >
            {about.badge}
          </motion.p>

          <motion.div variants={textItem as any} className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {about.title}
            </h2>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className={`h-1 rounded-full bg-primary ${
                isRtl ? "mx-auto lg:mr-0" : "mx-auto lg:ml-0"
              }`}
            />
          </motion.div>

          <motion.div
            variants={textItem as any}
            className="space-y-4 text-sm leading-7 text-muted-foreground"
          >
            {about.description.map((line, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.55,
                  delay: 0.25 + index * 0.12,
                  ease: "easeOut",
                }}
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={imageContainer as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className={`relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-100 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] ${
            !isRtl ? "lg:order-first" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="absolute inset-0 z-10 bg-gradient-to-t from-secondary/80 via-slate-950/0 to-secondary/60 backdrop-blur-[1px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src="/logo.png"
              alt="Lajun logo"
              width={300}
              height={300}
              className="drop-shadow-2xl"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src={`/${about.image}`}
              alt={about.title}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;