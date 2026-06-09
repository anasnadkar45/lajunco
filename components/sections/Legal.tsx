"use client";

import { motion } from "motion/react";
import {
  BadgeCheck,
  Building2,
  FileText,
  Globe,
  IdCard,
  MapPin,
  Phone,
  ShieldCheck,
  Scale,
  Award,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageProvider";

const iconMap = {
  unifiedNumber: IdCard,
  licenseNumber: ShieldCheck,
  taxNumber: FileText,
  commercialRegistration: Building2,
  address: MapPin,
  phone: Phone,
} as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.96,
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
    duration: 0.45,
    ease: "easeOut",
  },
} as const;

export default function LegalInformation() {
  const { t, dir } = useLanguage();
  const legal = t.legalInformation;

  const bottomIcons = [BadgeCheck, Scale, Award];

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-white py-14 sm:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div variants={fadeUp} {...animationProps} className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary/70 sm:tracking-[0.25em]">
            {legal.badge}
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            {legal.title}
          </h2>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
            className="mx-auto mt-5 flex max-w-xs items-center gap-4"
          >
            <span className="h-px flex-1 bg-primary" />
            <span className="h-3 w-3 shrink-0 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </motion.div>

          <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-7 text-muted-foreground md:text-base">
            {legal.description}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {legal.info.map((item, index) => {
            const Icon = iconMap[item.key as keyof typeof iconMap];

            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.42,
                  ease: "easeOut",
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -5,
                }}
                className="w-full rounded-2xl border-2 border-primary bg-secondary px-4 py-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 sm:px-5"
              >
                <div className="flex items-center gap-4 text-center sm:gap-5 sm:text-start">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: 0.1 + index * 0.06,
                    }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary sm:h-16 sm:w-16"
                  >
                    <Icon size={28} strokeWidth={2.2} />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-primary">
                      {item.label}
                    </h3>

                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      whileInView={{ opacity: 1, scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                        delay: 0.15 + index * 0.06,
                      }}
                      className="mx-auto mt-3 flex max-w-[220px] items-center gap-3 sm:mx-0"
                    >
                      <span className="h-px flex-1 bg-primary" />
                      <span className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
                      <span className="h-px flex-1 bg-primary" />
                    </motion.div>

                    <p
                      dir={item.key === "phone" ? "ltr" : undefined}
                      style={
                        item.key === "phone"
                          ? { unicodeBidi: "isolate" }
                          : undefined
                      }
                      className={`mt-3 break-words text-lg font-extrabold text-primary sm:text-xl ${
                        item.key === "phone"
                          ? "tracking-normal"
                          : "tracking-[0.1em] sm:tracking-[0.15em]"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Website and Location */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <InfoBox
            icon={Globe}
            label={legal.website.label}
            value={legal.website.value}
            button={legal.website.button}
            delay={0}
          />

          <InfoBox
            icon={MapPin}
            label={legal.location.label}
            value={legal.location.value}
            button={legal.location.button}
            delay={0.08}
          />
        </div>

        {/* Bottom Values */}
        <motion.div
          variants={fadeUp}
          {...animationProps}
          className="mt-8 flex flex-wrap justify-center gap-6 border-t border-primary/60 pt-8 md:justify-evenly"
        >
          {legal.values.map((item, index) => {
            const Icon = bottomIcons[index];

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -4,
                }}
                className={`flex items-center justify-center gap-4 text-center ${
                  index === 1 ? "md:border-x md:border-primary/60 md:px-4" : ""
                }`}
              >
                <IconCircle icon={Icon} />

                <div>
                  <h4 className="text-base font-bold text-primary sm:text-lg">
                    {item.label}
                  </h4>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function InfoBox({
  icon: Icon,
  label,
  value,
  button,
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  button: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.42,
        ease: "easeOut",
        delay,
      }}
      whileHover={{
        y: -5,
      }}
      className="rounded-2xl border-2 border-primary bg-secondary px-6 py-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
            delay: delay + 0.1,
          }}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary"
        >
          <Icon size={30} />
        </motion.div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-primary">{label}</h3>

          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block break-all text-lg font-semibold text-primary hover:underline"
          >
            {value}
          </a>

          <motion.a
            href={value}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 inline-block rounded-md bg-primary px-6 py-2 text-sm font-bold text-secondary"
          >
            {button}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

function IconCircle({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary sm:h-14 sm:w-14"
    >
      <Icon size={24} />
    </motion.div>
  );
}