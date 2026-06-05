// app/services/[slug]/page.tsx

"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
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
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">
            Service not found
          </h1>

          <Link
            href="/services"
            className="mt-5 inline-block rounded-md bg-primary px-6 py-3 text-sm font-bold text-secondary"
          >
            Back to Services
          </Link>
        </div>
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
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            <ArrowLeft size={18} />
            {t.navbar.services}
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
                {t.service.badge}
              </p>

              <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
                {service.title}
              </h1>

              <div className="mt-6 flex max-w-xs items-center gap-4">
                <span className="h-px flex-1 bg-primary" />
                <span className="h-3 w-3 rotate-45 bg-primary" />
                <span className="h-px flex-1 bg-primary" />
              </div>

              <p className="mt-6 max-w-3xl text-base font-medium leading-8 text-muted-foreground md:text-lg">
                {service.description}
              </p>

              <Link
                href="/contact"
                className="mt-8 inline-block rounded-md bg-primary px-7 py-3 text-sm font-bold text-secondary"
              >
                {t.navbar.requestQuote}
              </Link>
            </div>

            {/* Service Image */}
            <div className="overflow-hidden rounded-3xl border-2 border-primary bg-secondary shadow-sm">
              <div className="relative h-[280px] w-full md:h-[420px]">
                <Image
                  src={`/services/${serviceImage}`}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-primary/10" />

                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-secondary/40 bg-secondary/90 p-5 backdrop-blur">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
                    <ShieldCheck size={28} />
                  </div>

                  <h2 className="mt-4 text-2xl font-extrabold text-primary">
                    {service.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {featureList.length > 0 && (
        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {featureList.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border-2 border-primary bg-secondary p-6"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-secondary">
                    <CheckCircle2 size={26} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-primary">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Scope / Categories */}
      {categoryList.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
                {dir === "rtl" ? "نطاق الخدمة" : "Service Scope"}
              </p>

              <h2 className="mt-3 text-3xl font-extrabold text-primary md:text-5xl">
                {dir === "rtl" ? "ما الذي نغطيه" : "What We Cover"}
              </h2>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categoryList.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border-2 border-primary bg-white p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-secondary">
                    <BadgeCheck size={24} />
                  </div>

                  <h3 className="text-lg font-bold text-primary">{item}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-3xl border-2 border-primary bg-primary p-8 text-center text-secondary md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
              <Sparkles size={30} />
            </div>

            <h2 className="mt-6 text-3xl font-extrabold md:text-4xl">
              {t.navbar.requestQuote}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-secondary/80 md:text-base">
              {t.contact.subtitle}
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-md bg-secondary px-7 py-3 text-sm font-bold text-primary"
            >
              {t.navbar.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}