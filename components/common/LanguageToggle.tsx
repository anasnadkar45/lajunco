// src/components/common/LanguageToggle.tsx

"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { Button } from "../ui/button";

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <Button
      onClick={toggleLanguage}
      variant={"outline"}
      className="
      border border-primary bg-transparent hover:bg-primary hover:text-foreground 
      hover:cursor-pointer px-4 py-2 text-sm font-medium text-primary transition-all duration-300
      "
    >
      {lang === "en" ? "العربية" : "English"}
    </Button>
  );
}