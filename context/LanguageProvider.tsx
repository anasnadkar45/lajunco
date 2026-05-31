// src/context/LanguageProvider.tsx

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { translations, Language } from "@/lib/translations";

type LanguageContextType = {
  lang: Language;
  dir: "ltr" | "rtl";
  t: typeof translations.en | typeof translations.ar;
  changeLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("ar");

  const t = translations[lang];
  const dir = t.dir;

  const changeLanguage = (language: Language) => {
    setLang(language);
    localStorage.setItem("language", language);
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    changeLanguage(newLang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language | null;

    if (savedLang === "en" || savedLang === "ar") {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir,
        t,
        changeLanguage,
        toggleLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}