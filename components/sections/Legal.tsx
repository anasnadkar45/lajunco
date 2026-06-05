"use client";

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

export default function LegalInformation() {
  const { t, dir } = useLanguage();
  const legal = t.legalInformation;

  const bottomIcons = [BadgeCheck, Scale, Award];

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-primary/70">
            {legal.badge}
          </p>

          <h2 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
            {legal.title}
          </h2>

          <div className="mx-auto mt-5 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-primary" />
            <span className="h-3 w-3 rotate-45 bg-primary" />
            <span className="h-px flex-1 bg-primary" />
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-7 text-muted-foreground md:text-base">
            {legal.description}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legal.info.map((item) => {
            const Icon = iconMap[item.key as keyof typeof iconMap];

            return (
              <div
                key={item.key}
                className="rounded-2xl border-2 border-primary bg-secondary px-6 py-6 shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary">
                    <Icon size={30} strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-bold text-primary">
                      {item.label}
                    </h3>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-px flex-1 bg-primary" />
                      <span className="h-2 w-2 rotate-45 bg-primary" />
                      <span className="h-px flex-1 bg-primary" />
                    </div>

                    <p className="mt-3 break-words text-xl font-extrabold tracking-[0.15em] text-primary">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Website and Location */}
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <InfoBox
            icon={Globe}
            label={legal.website.label}
            value={legal.website.value}
            button={legal.website.button}
          />

          <InfoBox
            icon={MapPin}
            label={legal.location.label}
            value={legal.location.value}
            button={legal.location.button}
          />
        </div>

        {/* Bottom Values */}
        <div className="mt-8 grid gap-6 border-t border-primary/60 pt-8 md:grid-cols-3">
          {legal.values.map((item, index) => {
            const Icon = bottomIcons[index];

            return (
              <div
                key={item.label}
                className={`flex items-center justify-center gap-4 ${
                  index === 1 ? "md:border-x md:border-primary/60" : ""
                }`}
              >
                <IconCircle icon={Icon} />

                <div>
                  <h4 className="text-lg font-bold text-primary">
                    {item.label}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InfoBox({
  icon: Icon,
  label,
  value,
  button,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  button: string;
}) {
  return (
    <div className="rounded-2xl border-2 border-primary bg-secondary px-6 py-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary">
          <Icon size={30} />
        </div>

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

          <a
            href={value}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded-md bg-primary px-6 py-2 text-sm font-bold text-secondary"
          >
            {button}
          </a>
        </div>
      </div>
    </div>
  );
}

function IconCircle({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-primary text-secondary">
      <Icon size={26} />
    </div>
  );
}