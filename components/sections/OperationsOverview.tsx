// src/components/sections/OperationsOverview.tsx

"use client";

import Image from "next/image";
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

export default function OperationsOverview() {
  const { t, dir } = useLanguage();

  return (
    <section dir={dir} className="bg-white py-20">
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

function CustomerJourney() {
  const { t } = useLanguage();
  const data = t.customerJourney;

  return (
    <div>
      <SectionHeader
        badge={data.badge}
        title={data.title}
        description={data.description}
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {data.steps.map((step, index) => (
          <div
            key={step.title}
            className="group overflow-hidden rounded-3xl border bg-secondary shadow-sm"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={journeyImages[index] || "/lajunImage1.png"}
                alt={step.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* <div className="absolute inset-0 bg-primary/40" /> */}

              <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-lg font-extrabold text-primary">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-extrabold text-primary">
                {step.title}
              </h3>

              <p className="mt-3 text-sm font-medium leading-7 text-primary/75">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OperationalStructure() {
  const { t } = useLanguage();
  const data = t.operationalStructure;

  return (
    <div className="mt-24 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary">
        <div className="relative h-[420px] w-full">
          <Image
            src="/operational-structure.png"
            alt={data.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-primary/35" />

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-secondary/90 p-5 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
              {data.badge}
            </p>

            <h2 className="mt-3 text-2xl font-extrabold text-primary">
              {data.title}
            </h2>
          </div>
        </div>
      </div>

      <div>
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
          {data.roles.map((role) => (
            <div
              key={role}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <Users size={22} />
              </div>

              <h3 className="text-base font-bold text-primary">{role}</h3>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl border-2 border-primary bg-primary p-6 text-secondary">
          <div className="grid gap-3 sm:grid-cols-2">
            {data.benefits.map((benefit) => (
              <div key={benefit} className="flex gap-3">
                <CheckCircle2 className="mt-1 shrink-0" size={20} />
                <p className="text-sm font-medium leading-6 text-secondary/85">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteManagement() {
  const { t } = useLanguage();
  const data = t.siteManagement;

  return (
    <div className="mt-24 rounded-3xl border-2 border-primary bg-secondary p-6 md:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
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
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                    <Icon size={22} />
                  </div>

                  <h3 className="text-base font-bold text-primary">{item}</h3>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border-2 border-primary bg-white">
          <div className="relative h-[380px] w-full">
            <Image
              src="/site-management.png"
              alt={data.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-primary/25" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportingSection() {
  const { t } = useLanguage();
  const data = t.reporting;

  return (
    <div className="mt-24">
      <SectionHeader
        badge={data.badge}
        title={data.title}
        description={data.description}
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {data.metrics.map((metric, index) => {
          const Icon = reportingIcons[index] || BarChart3;

          return (
            <div
              key={metric.label}
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
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary">
          <div className="relative h-[360px] w-full">
            <Image
              src="/reporting-monitoring.png"
              alt={data.title}
              fill
              className="object-cover"
            />

            <div className="absolute inset-0 bg-primary/30" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <BadgeCheck size={24} />
              </div>

              <h3 className="text-lg font-bold text-primary">{feature}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetySection() {
  const { t } = useLanguage();
  const data = t.safety;

  return (
    <div className="mt-24 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
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
          {data.items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-secondary p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                <ShieldCheck size={24} />
              </div>

              <h3 className="text-base font-bold text-primary">{item}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary">
        <div className="relative h-[430px] w-full">
          <Image
            src="/health-safety.png"
            alt={data.title}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-primary/25" />

          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-secondary/90 p-5 backdrop-blur">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
              <ShieldAlert size={28} />
            </div>

            <h3 className="mt-4 text-2xl font-extrabold text-primary">
              {data.badge}
            </h3>
          </div>
        </div>
      </div>
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
    <div className="mx-auto max-w-4xl text-center">
      <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
        {badge}
      </p>

      <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-primary md:text-5xl">
        {title}
      </h2>

      <div className="mx-auto mt-6 flex max-w-xs items-center gap-4">
        <span className="h-px flex-1 bg-primary" />
        <span className="h-3 w-3 rotate-45 bg-primary" />
        <span className="h-px flex-1 bg-primary" />
      </div>

      <p className="mx-auto mt-6 max-w-3xl text-base font-medium leading-8 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}