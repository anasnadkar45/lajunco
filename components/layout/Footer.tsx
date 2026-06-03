"use client"

import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { useLanguage } from "@/context/LanguageProvider"
import Image from "next/image"

export default function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { label: t.navbar.home, href: "/" },
    { label: t.navbar.about, href: "/about" },
    { label: t.navbar.services, href: "/services" },
    { label: t.navbar.contact, href: "/contact" },
  ]

  const serviceLinks = t.service.cards.slice(0, 5).map((card) => ({
    label: card.title,
    href: card.link || "/services",
  }))

  return (
    <footer className="bg-secondary text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Lajun Security"
                width={48}
                height={48}
              />
              <div>
                <p className="text-lg font-semibold text-white">Lajun Security</p>
                <p className="text-sm text-slate-400">Security Services</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Providing comprehensive security guard services with the highest professional standards across the Kingdom.
            </p>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Quick Links
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="mt-4 inline-block text-sm font-semibold text-primary transition hover:text-white"
            >
              {t.service.cta}
            </Link>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Contact Us
            </p>
            <div className="space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p>+053370700</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <Link href="mailto:info@lajunco.com" className="transition hover:text-white">
                    info@lajunco.com
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p>Riyadh, KSA</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Lajun Security Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
