"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import Image from "next/image";
import { motion } from "motion/react";

export default function Footer() {
  const { t } = useLanguage();

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

  const footerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.16,
      },
    },
  };

  const footerColumn = {
    hidden: {
      opacity: 0,
      y: 35,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const linkItem = {
    hidden: {
      opacity: 0,
      x: -12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="overflow-hidden bg-secondary text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <motion.div
          variants={footerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-10 md:grid-cols-4"
        >
          <motion.div variants={footerColumn as any} className="space-y-5">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.75, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              >
                <Image
                  src="/logo.png"
                  alt="Lajun Security"
                  width={48}
                  height={48}
                />
              </motion.div>

              <div>
                <p className="text-lg font-semibold text-white">
                  Lajun Security
                </p>
                <p className="text-sm text-slate-400">Security Services</p>
              </div>
            </motion.div>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Providing comprehensive security guard services with the highest
              professional standards across the Kingdom
            </p>
          </motion.div>

          <motion.div variants={footerColumn as any}>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Quick Links
            </p>

            <motion.ul
              variants={footerContainer}
              className="space-y-3 text-sm text-slate-300"
            >
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={linkItem as any}>
                  <Link
                    href={link.href}
                    className="inline-block transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={footerColumn as any}>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </p>

            <motion.ul
              variants={footerContainer}
              className="space-y-3 text-sm text-slate-300"
            >
              {serviceLinks.map((link) => (
                <motion.li key={link.label} variants={linkItem as any}>
                  <Link
                    href={`/services${link.href}`}
                    className="inline-block transition hover:translate-x-1 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.45 }}
            >
              <Link
                href="/services"
                className="mt-4 inline-block text-sm font-semibold text-primary transition hover:text-white"
              >
                {t.service.cta}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={footerColumn as any}>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Contact Us
            </p>

            <motion.div
              variants={footerContainer}
              className="space-y-4 text-sm text-slate-300"
            >
              <motion.div
                variants={linkItem as any}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <Phone className="mt-1 h-4 w-4 text-primary" />
                <div dir="ltr">
                  <p>+96653370700 / +966114450211 / <br /> +966532175302</p>
                </div>
              </motion.div>

              <motion.div
                variants={linkItem as any}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <Mail className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <Link
                    href="mailto:info@lajunco.com"
                    className="transition hover:text-white"
                  >
                    info@lajunco.com
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={linkItem as any}
                whileHover={{ x: 4 }}
                className="flex items-start gap-3"
              >
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                <div>
                  <p>Riyadh, KSA</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
          className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500"
        >
          <p dir="ltr">
            © {new Date().getFullYear()} Lajun Security Services. All rights
            reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}