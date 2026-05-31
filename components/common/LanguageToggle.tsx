// src/components/common/LanguageToggle.tsx

"use client";

import { useLanguage } from "@/context/LanguageProvider";

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="rounded-full border border-yellow-500 px-4 py-2 text-sm font-medium text-yellow-500"
    >
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}