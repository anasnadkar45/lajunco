// src/components/layout/Navbar.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

import { useLanguage } from "@/context/LanguageProvider";
import { Button, buttonVariants } from "../ui/button";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { lang, dir, t } = useLanguage();

  const navLinks = [
    { label: t.navbar.home, href: "/" },
    { label: t.navbar.about, href: "/about" },
    { label: t.navbar.services, href: "/services" },
    { label: t.navbar.certificates || "Certificates", href: "/certificates" },
    { label: t.navbar.contact, href: "/contact" },
    { label: t.navbar.legal, href: "/legal" },
    { label: t.navbar.operations, href: "/operations" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={`fixed top-12 left-0 right-0 z-50 transform transition-[transform,opacity] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      dir={dir}
    >
      <div className="w-full bg-white px-4 shadow-sm backdrop-blur md:px-8">
        <nav className="relative mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <Image
              src="/logo.png"
              alt={lang === "en" ? "Lajun Security Logo" : "شعار لجون الأمن"}
              width={100}
              height={70}
              priority
              className="h-auto w-30"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                className="text-sm font-medium transition-all duration-300 hover:text-primary"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href={'/contact'} className={buttonVariants({
              className: "flex-1 shimmer"
            })}>
              {t.navbar.requestQuote}
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-900 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="absolute left-0 right-0 top-full mt-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl md:hidden">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  <Link href={'/contact'} className={buttonVariants({
                    className: "flex-1 shimmer"
                  })}>
                    {t.navbar.requestQuote}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}