// app/about/page.tsx

"use client";

import About from "@/components/sections/About";
import { useLanguage } from "@/context/LanguageProvider";
import { motion } from "motion/react";
import { BadgeCheck, Eye, Flag, ShieldCheck, Users } from "lucide-react";
import LegalInformation from "@/components/sections/Legal";

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

export default function AboutPage() {
  const { t, dir } = useLanguage();

  return (
    <main dir={dir} className="min-h-screen bg-white">
      <About />

      {/* <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            variants={fadeUp}
            {...animationProps}
            className="text-center"
          >
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
              {t.about.badge}
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              {t.about.title}
            </h1>

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
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4">
              {t.about.description.map((paragraph, index) => (
                <motion.div
                  key={paragraph}
                  initial={{ opacity: 0, x: dir === "rtl" ? 35 : -35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    ease: "easeOut",
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-3xl border-2 border-primary bg-secondary p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="flex gap-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.45,
                        ease: "easeOut",
                        delay: 0.1 + index * 0.08,
                      }}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary"
                    >
                      <ShieldCheck size={24} />
                    </motion.div>

                    <p className="text-base font-medium leading-8 text-primary/80">
                      {paragraph}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={fadeRight}
              {...animationProps}
              whileHover={{
                y: -8,
              }}
              className="rounded-3xl border-2 border-primary bg-primary p-8 text-secondary shadow-lg transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/20"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary"
              >
                <Users size={30} />
              </motion.div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-secondary/70">
                {t.visionMission.badge}
              </p>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                {t.visionMission.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-secondary/80">
                {t.whyLajun.description}
              </p>
            </motion.div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <InfoCard
              icon={Eye}
              title={t.visionMission.visionTitle}
              description={t.visionMission.vision}
              delay={0}
            />

            <InfoCard
              icon={Flag}
              title={t.visionMission.missionTitle}
              description={t.visionMission.mission}
              delay={0.12}
            />
          </div>

          <motion.div
            variants={scaleIn}
            {...animationProps}
            className="mt-16 rounded-3xl border-2 border-primary bg-secondary p-6 md:p-8"
          >
            <motion.div
              variants={fadeUp}
              {...animationProps}
              className="text-center"
            >
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
                {t.values.badge}
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
                {t.values.title}
              </h2>
            </motion.div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.values.items.map((value, index) => (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-5 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
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

                  <h3 className="text-lg font-bold text-primary">{value}</h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section> */}

      <LegalInformation />
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: "easeOut",
        delay,
      }}
      whileHover={{
        y: -8,
      }}
      className="rounded-3xl border-2 border-primary bg-secondary p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
          delay: delay + 0.15,
        }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-secondary"
      >
        <Icon size={30} />
      </motion.div>

      <h2 className="mt-6 text-2xl font-extrabold text-primary">{title}</h2>

      <p className="mt-4 text-base font-medium leading-8 text-primary/80">
        {description}
      </p>
    </motion.div>
  );
}