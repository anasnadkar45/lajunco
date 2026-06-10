"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageProvider";

export default function Footer() {
  const { t, dir } = useLanguage();

  const isArabic = dir === "rtl";

  const footerLabels = {
    companyName: isArabic ? "لجون للحراسات الأمنية" : "Lajun Security",
    companyType: isArabic ? "خدمات أمنية" : "Security Services",
    description: isArabic
      ? "نقدم خدمات الحراسات الأمنية الشاملة بأعلى المعايير المهنية في جميع أنحاء المملكة."
      : "Providing comprehensive security guard services with the highest professional standards across the Kingdom.",

    quickLinks: isArabic ? "روابط سريعة" : "Quick Links",
    services: isArabic ? "الخدمات" : "Services",
    contactUs: isArabic ? "تواصل معنا" : "Contact Us",

    location: isArabic ? "شارع الحسن بن علي، الرياض" : "Al Hasan Ibn Ali,Riyadh, Kingdom of Saudi Arabia",
    copyright: isArabic
      ? `© ${new Date().getFullYear()} لجون للحراسات الأمنية. جميع الحقوق محفوظة.`
      : `© ${new Date().getFullYear()} Lajun Security Services. All rights reserved.`,
  };

  const navLinks = [
    { label: t.navbar.home, href: "/" },
    { label: t.navbar.about, href: "/about" },
    { label: t.navbar.services, href: "/services" },
    { label: t.navbar.contact, href: "/contact" },
  ];

  const serviceLinks = t.service.cards.slice(0, 5).map((card) => ({
    label: card.title,
    href: card.link || "/services",
  }));

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/",
      icon: FaInstagram,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/",
      icon: FaFacebookF,
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/",
      icon: FaTiktok,
    },
  ];

  const linkHoverClass = isArabic
    ? "hover:-translate-x-1"
    : "hover:translate-x-1";

  return (
    <footer
      dir={dir}
      className="relative overflow-hidden bg-secondary text-slate-100"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl ltr:-left-20 rtl:-right-20" />
        <div className="absolute -bottom-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl ltr:-right-20 rtl:-left-20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div
              className={`flex items-center gap-4 ${isArabic ? "text-right" : "text-left"
                }`}
            >
              {/* <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white/5">
              </div> */}
              <Image
                src="/logo.png"
                alt="Lajun Security"
                width={80}
                height={80}
                className="h-auto w-auto"
              />

              <div>
                <p className="text-lg font-bold leading-tight text-white">
                  {footerLabels.companyName}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {footerLabels.companyType}
                </p>
              </div>
            </div>

            <p
              className={`mt-5 max-w-sm text-sm leading-7 text-slate-400 ${isArabic ? "text-right" : "text-left"
                }`}
            >
              {footerLabels.description}
            </p>

            <div
              className={`mt-6 flex items-center gap-3 ${isArabic ? "justify-start sm:justify-end lg:justify-start" : ""
                }`}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:border-primary hover:bg-primary hover:text-secondary"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <FooterTitle>{footerLabels.quickLinks}</FooterTitle>

            <ul className="space-y-3 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`inline-block transition duration-300 hover:text-white ${linkHoverClass}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <FooterTitle>{footerLabels.services}</FooterTitle>

            <ul className="space-y-3 text-sm text-slate-300">
              {serviceLinks.map((link) => {
                const serviceHref = link.href.startsWith("/services")
                  ? link.href
                  : `/services${link.href}`;

                return (
                  <li key={link.label}>
                    <Link
                      href={serviceHref}
                      className={`inline-block transition duration-300 hover:text-white ${linkHoverClass}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href="/services"
              className="mt-5 inline-block text-sm font-semibold text-primary transition duration-300 hover:text-white"
            >
              {t.service.cta}
            </Link>
          </div>

          {/* Contact */}
          <div>
            <FooterTitle>{footerLabels.contactUs}</FooterTitle>

            <div className="space-y-5 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <ContactIcon>
                  <Phone className="h-4 w-4" />
                </ContactIcon>

                <div dir="ltr" className={isArabic ? "text-right" : "text-left"}>
                  <p className="leading-7">
                    +96653370700
                    <br />
                    +966114450211
                    <br />
                    +966532175302
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ContactIcon>
                  <Mail className="h-4 w-4" />
                </ContactIcon>

                <div dir="ltr">
                  <Link
                    href="mailto:info@lajunco.com"
                    className="transition duration-300 hover:text-white"
                  >
                    info@lajunco.com
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ContactIcon>
                  <MapPin className="h-4 w-4" />
                </ContactIcon>

                <p className="leading-7">{footerLabels.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-center text-sm text-slate-500 sm:flex-row">
          <p dir={isArabic ? "rtl" : "ltr"}>{footerLabels.copyright}</p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-slate-500 transition duration-300 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-primary">
      {children}
    </p>
  );
}

function ContactIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary">
      {children}
    </span>
  );
}