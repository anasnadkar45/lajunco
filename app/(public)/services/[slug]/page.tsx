// app/services/[slug]/page.tsx

"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageProvider";

const serviceMap = {
  "facility-security": "facilitySecurity",
  "access-control": "accessControl",
  "event-security": "eventSecurity",
  "security-consulting": "securityConsulting",
  "private-security": "privateSecurity",
  "monitoring-services": "surveillanceSystems",
  "security-patrols": "securityPatrols",
} as const;

const fallbackImages = {
  "facility-security": "FacilitySecurity.png",
  "access-control": "AccessControl.png",
  "event-security": "EventSecurity.png",
  "security-consulting": "FacilitySecurity.png",
  "private-security": "PrivateSecurity.png",
  "monitoring-services": "SurveillanceSystems.png",
  "security-patrols": "SecurityPatrol.png",
} as const;

type PageProps = {
  params: Promise<{
    slug: keyof typeof serviceMap;
  }>;
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
  },
};

const animationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    amount: 0.2,
  },
  transition: {
    duration: 0.6,
    ease: "easeOut",
  },
} as const;

export default function ServiceDetailsPage({ params }: PageProps) {
  const { slug } = use(params);
  const { t, dir } = useLanguage();

  const serviceKey = serviceMap[slug];
  const service = serviceKey ? t.serviceDetails[serviceKey] : null;

  const serviceCard = t.service.cards.find((card) => card.link === `/${slug}`);

  const serviceImage =
    serviceCard?.image || fallbackImages[slug] || "FacilitySecurity.png";

  if (!service) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary">
            Service not found
          </h1>

          <Link
            href="/services"
            className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-sm font-bold text-secondary"
          >
            Back to Services
          </Link>
        </motion.div>
      </main>
    );
  }

  const featureList =
    "features" in service
      ? service.features
      : "benefits" in service
        ? service.benefits
        : [];

  const categoryList =
    "categories" in service
      ? service.categories
      : "eventTypes" in service
        ? service.eventTypes
        : [];

  return (
    <main dir={dir} className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, x: dir === "rtl" ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:gap-3"
            >
              <ArrowLeft size={18} />
              {t.navbar.services}
            </Link>
          </motion.div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70"
              >
                {t.service.badge}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl"
              >
                {service.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
                className="mt-6 flex max-w-xs origin-left items-center gap-4"
              >
                <span className="h-px flex-1 bg-primary" />
                <span className="h-3 w-3 rotate-45 bg-primary" />
                <span className="h-px flex-1 bg-primary" />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="mt-6 max-w-3xl text-base font-medium leading-8 text-muted-foreground md:text-lg"
              >
                {service.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <Link
                  href="/contact"
                  className="mt-8 inline-block rounded-md bg-primary px-7 py-3 text-sm font-bold text-secondary transition hover:-translate-y-1 hover:bg-primary/90"
                >
                  {t.navbar.requestQuote}
                </Link>
              </motion.div>
            </motion.div>

            {/* Service Image */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary shadow-sm"
            >
              <div className="relative h-[280px] w-full md:h-[420px]">
                <motion.div
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={`/services/${serviceImage}`}
                    alt={service.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-primary/10" />

                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
                  className="absolute bottom-6 left-6 right-6 rounded-2xl border border-secondary/40 bg-secondary/90 p-5 backdrop-blur"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary"
                  >
                    <ShieldCheck size={28} />
                  </motion.div>

                  <h2 className="mt-4 text-2xl font-extrabold text-primary">
                    {service.title}
                  </h2>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      {featureList.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {featureList.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border-2 border-primary bg-secondary p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.1 + index * 0.08,
                    }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary"
                  >
                    <CheckCircle2 size={26} />
                  </motion.div>

                  <h3 className="mt-5 text-lg font-bold text-primary">
                    {item}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scope / Categories */}
      {categoryList.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              variants={fadeUp}
              {...animationProps}
              className="text-center"
            >
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
                {dir === "rtl" ? "نطاق الخدمة" : "Service Scope"}
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">
                {dir === "rtl" ? "ما الذي نغطيه" : "What We Cover"}
              </h2>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryList.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.07,
                  }}
                  whileHover={{ y: -6 }}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-primary/10"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: 0.1 + index * 0.07,
                    }}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary"
                  >
                    <BadgeCheck size={24} />
                  </motion.div>

                  <h3 className="text-lg font-bold text-primary">{item}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            variants={scaleIn}
            {...animationProps}
            className="rounded-3xl border-2 border-primary bg-primary p-8 text-center text-secondary md:p-12"
          >
            <motion.div
              initial={{ scale: 0, rotate: -25 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary"
            >
              <Sparkles size={30} />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
              className="mt-6 text-3xl font-extrabold md:text-4xl"
            >
              {t.navbar.requestQuote}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-secondary/80 md:text-base"
            >
              {t.contact.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.45 }}
            >
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-md bg-secondary px-7 py-3 text-sm font-bold text-primary transition hover:-translate-y-1 hover:bg-secondary/90"
              >
                {t.navbar.contact}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}