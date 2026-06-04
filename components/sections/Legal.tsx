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

const legalInfo = [
  {
    icon: IdCard,
    ar: "الرقم الموحد",
    en: "Unified National Number",
    value: "7048767847",
  },
  {
    icon: ShieldCheck,
    ar: "رقم الترخيص",
    en: "License Number",
    value: "2611000002",
  },
  {
    icon: FileText,
    ar: "الرقم الضريبي",
    en: "Tax Number",
    value: "312840013800003",
  },
  {
    icon: Building2,
    ar: "السجل التجاري",
    en: "Commercial Registration",
    value: "1009190178",
  },
  {
    icon: MapPin,
    ar: "العنوان",
    en: "Address",
    value: "Riyadh - Al Rawdah Dist.",
  },
  {
    icon: Phone,
    ar: "الهاتف",
    en: "Phone",
    value: "053 307 0700",
  },
];

export default function LegalInformation() {
  return (
    <section className="relative overflow-hidden bg-white py-20 text-[#070b22]">

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#070b22] md:text-5xl">
            البيانات القانونية
          </h2>

          <p className="mt-3 text-2xl font-bold uppercase tracking-[0.25em] text-[#d5aa2c]">
            Legal Information
          </p>

          <div className="mx-auto mt-5 flex max-w-xs items-center gap-4">
            <span className="h-px flex-1 bg-[#d5aa2c]" />
            <span className="h-3 w-3 rotate-45 bg-[#d5aa2c]" />
            <span className="h-px flex-1 bg-[#d5aa2c]" />
          </div>

          <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-7 text-[#070b22] md:text-base">
            جميع المعلومات أدناه مسجلة ومعتمدة لدى الجهات الحكومية المختصة في المملكة العربية السعودية.
          </p>

          <p className="mx-auto mt-1 max-w-4xl text-sm font-medium text-[#070b22]/80">
            All information below is officially registered and certified with the relevant governmental authorities in the Kingdom of Saudi Arabia.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {legalInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.en}
                className="rounded-2xl border-2 border-[#070b22] bg-white px-6 py-6 shadow-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#d5aa2c] bg-[#070b22] text-[#d5aa2c]">
                    <Icon size={30} strokeWidth={2.2} />
                  </div>

                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-bold text-[#070b22]">
                      {item.ar}
                    </h3>

                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#d5aa2c]">
                      {item.en}
                    </p>

                    <div className="mt-3 flex items-center gap-3">
                      <span className="h-px flex-1 bg-[#d5aa2c]" />
                      <span className="h-2 w-2 rotate-45 bg-[#d5aa2c]" />
                      <span className="h-px flex-1 bg-[#d5aa2c]" />
                    </div>

                    <p className="mt-3 text-xl font-extrabold tracking-[0.15em] text-[#070b22]">
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
          <div className="rounded-2xl border-2 border-[#070b22] bg-white px-6 py-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#d5aa2c] bg-[#070b22] text-[#d5aa2c]">
                <Globe size={30} />
              </div>

              <div>
                <h3 className="text-lg font-bold">الموقع الإلكتروني</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#d5aa2c]">
                  Website
                </p>
                <a
                  href="https://lajunco.com/"
                  target="_blank"
                  className="mt-2 block text-lg font-semibold text-[#070b22] hover:underline"
                >
                  https://lajunco.com/
                </a>

                <button className="mt-4 rounded-md bg-[#070b22] px-6 py-2 text-sm font-bold text-white">
                  امسح لزيارة الموقع
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#070b22] bg-white px-6 py-6">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#d5aa2c] bg-[#070b22] text-[#d5aa2c]">
                <MapPin size={30} />
              </div>

              <div>
                <h3 className="text-lg font-bold">موقع الشركة</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#d5aa2c]">
                  Company Location
                </p>
                <a
                  href="https://www.google.com/maps/@24.7295903,46.7685524,19m"
                  target="_blank"
                  className="mt-2 block break-all text-lg font-semibold text-[#070b22] hover:underline"
                >
                  https://www.google.com/maps/@24.7295903,46.7685524,19m
                </a>

                <button className="mt-4 rounded-md bg-[#070b22] px-6 py-2 text-sm font-bold text-white">
                  امسح لفتح الموقع على الخريطة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Values */}
        <div className="mt-8 grid gap-6 border-t border-[#d5aa2c]/60 pt-8 md:grid-cols-3">
          <div className="flex items-center justify-center gap-4">
            <IconCircle icon={BadgeCheck} />
            <div>
              <h4 className="text-lg font-bold">بيانات موثقة</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-[#d5aa2c]">
                Verified Data
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 border-x border-[#d5aa2c]/60">
            <IconCircle icon={Scale} />
            <div>
              <h4 className="text-lg font-bold">شفافية</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-[#d5aa2c]">
                Transparency
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <IconCircle icon={Award} />
            <div>
              <h4 className="text-lg font-bold">التزام</h4>
              <p className="text-sm font-bold uppercase tracking-wider text-[#d5aa2c]">
                Compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconCircle({
  icon: Icon,
}: {
  icon: React.ElementType;
}) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d5aa2c] bg-[#070b22] text-[#d5aa2c]">
      <Icon size={26} />
    </div>
  );
}