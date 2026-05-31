// src/components/layout/Navbar.tsx

"use client";

import { useLanguage } from "@/context/LanguageProvider";
import LanguageToggle from "@/components/common/LanguageToggle";

export default function Navbar() {
  const { lang, t } = useLanguage();

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#071a33]/90 px-8 py-5 text-white backdrop-blur">
      <nav className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-yellow-500">
          {lang === "en" ? "Lajun Security" : "لجون الأمن"}
        </h1>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#home">{t.navbar.home}</a>
          <a href="#about">{t.navbar.about}</a>
          <a href="#services">{t.navbar.services}</a>
          <a href="#contact">{t.navbar.contact}</a>
        </div>

        <LanguageToggle />
      </nav>
    </header>
  );
}