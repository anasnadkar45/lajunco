// src/components/sections/OperationsOverview.tsx

"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  BadgeCheck,
  BarChart3,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  MapPin,
  Route,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Users,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageProvider";

const journeyImages = [
  "/journey-request.png",
  "/journey-analysis.png",
  "/journey-consultant.png",
  "/journey-site-visit.png",
  "/journey-proposal.png",
  "/journey-deployment.png",
  "/journey-monitoring.png",
];

const siteIcons = [
  ShieldCheck,
  Camera,
  Users,
  Siren,
  MapPin,
  Camera,
  Route,
  BadgeCheck,
  ShieldAlert,
];

const reportingIcons = [FileText, BarChart3, Users, ClipboardCheck, ShieldCheck];

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

export default function OperationsOverview() {
  const { dir } = useLanguage();

  return (
    <section dir={dir} className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <CustomerJourney />
        <OperationalStructure />
        <SiteManagement />
        <ReportingSection />
        <SafetySection />
      </div>
    </section>
  );
}

function ResponsiveImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      {...animationProps}
      className={`w-full overflow-hidden rounded-xl ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="h-auto w-full object-contain transition duration-500 hover:scale-[1.03]"
      />
    </motion.div>
  );
}

function CustomerJourney() {
  const { t } = useLanguage();
  const data = t.customerJourney;

  return (
    <motion.div variants={fadeUp} {...animationProps}>
      <SectionHeader
        badge={data.badge}
        title={data.title}
        description={data.description}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.steps.map((step, index) => (
          <motion.div
            key={step.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.55,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
            className="group overflow-hidden rounded-3xl border bg-secondary shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="relative bg-secondary">
              <ResponsiveImage
                src={journeyImages[index] || "/lajunImage1.png"}
                alt={step.title}
              />

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  ease: "easeOut",
                  delay: 0.2 + index * 0.08,
                }}
                className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-extrabold text-secondary shadow-md"
              >
                {String(index + 1).padStart(2, "0")}
              </motion.div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-extrabold text-primary">
                {step.title}
              </h3>

              <p className="mt-3 text-sm font-medium leading-7 text-primary/75">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function OperationalStructure() {
  const { t } = useLanguage();
  const data = t.operationalStructure;

  return (
    <div className="mt-20 grid gap-10 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <motion.div
        variants={fadeLeft}
        {...animationProps}
        className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary"
      >
        <div className="relative bg-white p-2">
          <ResponsiveImage src="/operational-structure.png" alt={data.title} />

          <motion.div
            variants={fadeUp}
            {...animationProps}
            className="rounded-2xl bg-secondary/90 p-4 backdrop-blur md:p-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary/70 md:text-sm">
              {data.badge}
            </p>

            <h2 className="mt-2 text-xl font-extrabold text-primary md:mt-3 md:text-2xl">
              {data.title}
            </h2>
          </motion.div>
        </div>
      </motion.div>

      <motion.div variants={fadeRight} {...animationProps}>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
          {data.badge}
        </p>

        <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">
          {data.title}
        </h2>

        <p className="mt-5 text-base font-medium leading-8 text-muted-foreground">
          {data.description}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.roles.map((role, index) => (
            <motion.div
              key={role}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <Users size={22} />
              </div>

              <h3 className="text-base font-bold text-primary">{role}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          {...animationProps}
          className="mt-6 rounded-3xl border-2 border-primary bg-primary p-6 text-secondary"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {data.benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                }}
                className="flex gap-3"
              >
                <CheckCircle2 className="mt-1 shrink-0" size={20} />
                <p className="text-sm font-medium leading-6 text-secondary/85">
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SiteManagement() {
  const { t } = useLanguage();
  const data = t.siteManagement;

  return (
    <motion.div
      variants={fadeUp}
      {...animationProps}
      className="mt-20 rounded-3xl border-2 border-primary bg-secondary p-5 md:mt-24 md:p-10"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div variants={fadeLeft} {...animationProps}>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
            {data.badge}
          </p>

          <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">
            {data.title}
          </h2>

          <p className="mt-5 text-base font-medium leading-8 text-primary/75">
            {data.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {data.items.map((item, index) => {
              const Icon = siteIcons[index] || ShieldCheck;

              return (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    ease: "easeOut",
                    delay: index * 0.06,
                  }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-bold text-primary">{item}</h3>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          variants={fadeRight}
          {...animationProps}
          className="overflow-hidden rounded-3xl border-2 border-primary bg-white"
        >
          <ResponsiveImage src="/site-management.png" alt={data.title} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ReportingSection() {
  const { t } = useLanguage();
  const data = t.reporting;

  return (
    <motion.div variants={fadeUp} {...animationProps} className="mt-20 md:mt-24">
      <SectionHeader
        badge={data.badge}
        title={data.title}
        description={data.description}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {data.metrics.map((metric, index) => {
          const Icon = reportingIcons[index] || BarChart3;

          return (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.08,
              }}
              whileHover={{ y: -6 }}
              className="rounded-3xl border-2 border-primary bg-secondary p-6 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
                <Icon size={26} />
              </div>

              <p className="mt-5 text-3xl font-extrabold text-primary">
                {metric.value}
              </p>

              <p className="mt-2 text-sm font-bold text-primary/70">
                {metric.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          variants={fadeLeft}
          {...animationProps}
          className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary"
        >
          <ResponsiveImage src="/reporting-monitoring.png" alt={data.title} />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.07,
              }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <BadgeCheck size={24} />
              </div>

              <h3 className="text-lg font-bold text-primary">{feature}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SafetySection() {
  const { t } = useLanguage();
  const data = t.safety;

  return (
    <div className="mt-20 grid gap-10 md:mt-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <motion.div variants={fadeLeft} {...animationProps}>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
          {data.badge}
        </p>

        <h2 className="mt-4 text-3xl font-extrabold text-primary md:text-5xl">
          {data.title}
        </h2>

        <p className="mt-5 text-base font-medium leading-8 text-muted-foreground">
          {data.description}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {data.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
                delay: index * 0.07,
              }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-base font-bold text-primary">{item}</h3>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={fadeRight}
        {...animationProps}
        className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary"
      >
        <div className="relative bg-white p-2">
          <ResponsiveImage src="/health-safety.png" alt={data.title} />

          <motion.div
            variants={fadeUp}
            {...animationProps}
            className="rounded-2xl bg-secondary/90 p-4 backdrop-blur md:p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-secondary md:h-14 md:w-14">
              <ShieldAlert size={28} />
            </div>

            <h3 className="mt-4 text-xl font-extrabold text-primary md:text-2xl">
              {data.badge}
            </h3>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function SectionHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      {...animationProps}
      className="mx-auto max-w-4xl text-center"
    >
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
        {badge}
      </p>

      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-primary md:text-5xl">
        {title}
      </h2>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="mx-auto mt-6 flex max-w-xs items-center gap-4"
      >
        <span className="h-px flex-1 bg-primary" />
        <span className="h-3 w-3 rotate-45 bg-primary" />
        <span className="h-px flex-1 bg-primary" />
      </motion.div>

      <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-muted-foreground">
        {description}
      </p>
    </motion.div>
  );
}