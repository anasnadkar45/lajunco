// translations.ts

export const translations = {
  en: {
    lang: "en",
    dir: "ltr",

    navbar: {
      home: "Home",
      about: "About",
      services: "Services",
      contact: "Contact",
    },

    hero: {
      badge: "Trusted Security Partner",
      title: "We protect what matters to you",
      description:
        "Professional security and guarding services across Saudi Arabia with high standards of discipline and reliability.",
      primaryButton: "Request a Quote",
      secondaryButton: "Explore Services",
    },
  },

  ar: {
    lang: "ar",
    dir: "rtl",

    navbar: {
      home: "الرئيسية",
      about: "من نحن",
      services: "خدماتنا",
      contact: "تواصل معنا",
    },

    hero: {
      badge: "شريكك الأمني الموثوق",
      title: "نحمي كل ما يهمك",
      description:
        "خدمات أمن وحراسة احترافية في جميع أنحاء المملكة العربية السعودية بأعلى معايير الانضباط والموثوقية.",
      primaryButton: "طلب عرض سعر",
      secondaryButton: "استكشف الخدمات",
    },
  },
} as const;

export type Language = keyof typeof translations;