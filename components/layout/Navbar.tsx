// src/components/layout/Navbar.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageProvider";
import LanguageToggle from "@/components/common/LanguageToggle";
import { Button } from "../ui/button";
import Image from "next/image";

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { lang, t } = useLanguage();

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

  return (
    <header className={`fixed top-12 left-0 right-0 z-40 transform transition-[transform,opacity] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
      <div className="w-full bg-white px-8 py-2 backdrop-blur">
        <nav className="flex items-center justify-between max-w-6xl mx-auto">
          {/* <h1 className="text-xl font-bold text-primary">
            {lang === "en" ? "Lajun Security" : "لجون الأمن"}
          </h1> */}

          <Image src={'/logo.png'} alt="Lajun Security Logo" width={80} height={40} />

          <div className="hidden items-center gap-8 md:flex">
            <a className="hover:text-primary transition-all duration-300" href="#home">{t.navbar.home}</a>
            <a className="hover:text-primary transition-all duration-300" href="#about">{t.navbar.about}</a>
            <a className="hover:text-primary transition-all duration-300" href="#services">{t.navbar.services}</a>
            <a className="hover:text-primary transition-all duration-300" href="#contact">{t.navbar.contact}</a>
          </div>

          <Button>{t.navbar.requestQuote}</Button>
        </nav>
      </div>
    </header>
  );
}