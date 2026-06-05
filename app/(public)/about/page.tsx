// app/about/page.tsx

"use client";

import About from "@/components/sections/About";
import { useLanguage } from "@/context/LanguageProvider";
import { BadgeCheck, Eye, Flag, ShieldCheck, Users } from "lucide-react";

export default function AboutPage() {
  const { t, dir } = useLanguage();

  return (
    <main dir={dir} className="min-h-screen bg-white">
      <About />

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          {/* Header */}
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
              {t.about.badge}
            </p>

            <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-primary md:text-5xl">
              {t.about.title}
            </h1>

            <div className="mx-auto mt-6 flex max-w-xs items-center gap-4">
              <span className="h-px flex-1 bg-primary" />
              <span className="h-3 w-3 rotate-45 bg-primary" />
              <span className="h-px flex-1 bg-primary" />
            </div>
          </div>

          {/* About Details */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="space-y-4">
              {t.about.description.map((paragraph) => (
                <div
                  key={paragraph}
                  className="rounded-3xl border-2 border-primary bg-secondary p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                      <ShieldCheck size={24} />
                    </div>

                    <p className="text-base font-medium leading-8 text-primary/80">
                      {paragraph}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Summary Card */}
            <div className="rounded-3xl border-2 border-primary bg-primary p-8 text-secondary shadow-lg">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                <Users size={30} />
              </div>

              <p className="mt-6 text-sm font-bold uppercase tracking-[0.25em] text-secondary/70">
                {t.visionMission.badge}
              </p>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">
                {t.visionMission.title}
              </h2>

              <p className="mt-5 text-sm leading-7 text-secondary/80">
                {t.whyLajun.description}
              </p>
            </div>
          </div>

          {/* Vision Mission */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <InfoCard
              icon={Eye}
              title={t.visionMission.visionTitle}
              description={t.visionMission.vision}
            />

            <InfoCard
              icon={Flag}
              title={t.visionMission.missionTitle}
              description={t.visionMission.mission}
            />
          </div>

          {/* Values */}
          <div className="mt-16 rounded-3xl border-2 border-primary bg-secondary p-6 md:p-8">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
                {t.values.badge}
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-4xl">
                {t.values.title}
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {t.values.items.map((value) => (
                <div
                  key={value}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                    <BadgeCheck size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-primary">{value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border-2 border-primary bg-secondary p-8 shadow-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-secondary">
        <Icon size={30} />
      </div>

      <h2 className="mt-6 text-2xl font-extrabold text-primary">{title}</h2>

      <p className="mt-4 text-base font-medium leading-8 text-primary/80">
        {description}
      </p>
    </div>
  );
}