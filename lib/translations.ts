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
      requestQuote: "Request a Quote"
    },

    certificates: {
      badge: "Trusted Security Partner",
      title: "We protect what matters to you",
      description:
        "Professional security and guarding services across Saudi Arabia with high standards of discipline and reliability.",
      documents: [
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
      ]
    },
    hero: {
      badge: "Trusted Security Partner",
      title: "We protect what matters to you",
      description:
        "Professional security and guarding services across Saudi Arabia with high standards of discipline and reliability.",
      primaryButton: "Request a Quote",
      secondaryButton: "Explore Services",
      slides: [
        {
          image:
            "lajunImage1.jpg",
          title: "Facility Security",
          subtitle: "FACILITY SECURITY",
          description:
            "Comprehensive building and facility security with disciplined access control and high-quality standards.",
        },
        {
          image:
            "lajunImage2.png",
          title: "Private Security",
          subtitle: "PRIVATE SECURITY",
          description:
            "Elite trained security professionals protecting sensitive sites and VIPs.",
        },
        {
          image:
            "lajunImage3.png",
          title: "Access Control",
          subtitle: "ACCESS CONTROL",
          description:
            "Professional gate management and visitor verification with advanced technical systems.",
        },
        {
          image:
            "lajunImage4.png",
          title: "Event Security",
          subtitle: "EVENT SECURITY",
          description:
            "Integrated security solutions for crowd control at major events and conferences.",
        },
        {
          image:
            "lajunImage5.png",
          title: "Surveillance Systems",
          subtitle: "SURVEILLANCE SYSTEMS",
          description:
            "Smart 24/7 surveillance systems ensuring full security coverage.",
        },
        {
          image:
            "lajunImage6.png",
          title: "Security Patrols",
          subtitle: "SECURITY PATROLS",
          description:
            "Rapid response mobile patrols to reinforce safety and stability across sectors.",
        },
      ],
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
      requestQuote: "طلب عرض سعر"
    },

    hero: {
      badge: "شريكك الأمني الموثوق",
      title: "نحمي كل ما يهمك",
      description:
        "خدمات أمن وحراسة احترافية في جميع أنحاء المملكة العربية السعودية بأعلى معايير الانضباط والموثوقية.",
      primaryButton: "طلب عرض سعر",
      secondaryButton: "استكشف الخدمات",
      slides: [
        {
          image:
            "lajunImage1.jpg",
          title: "حراسات المنشآت",
          subtitle: "FACILITY SECURITY",
          description:
            "حماية شاملة للمباني والمنشآت مع تنظيم الحركة والانضباط بأعلى معايير الجودة.",
        },
        {
          image:
            "lajunImage2.png",
          title: "الحراسات الخاصة",
          subtitle: "PRIVATE SECURITY",
          description:
            "نخبة من الكفاءات الأمنية المدربة لحماية المواقع الحساسة وكبار الشخصيات.",
        },
        {
          image:
            "lajunImage3.png",
          title: "تنظيم الدخول والخروج",
          subtitle: "ACCESS CONTROL",
          description:
            "إدارة احترافية للبوابات والتحقق من الزوار باستخدام أحدث الأنظمة التقنية.",
        },
        {
          image:
            "lajunImage4.png",
          title: "تأمين الفعاليات",
          subtitle: "EVENT SECURITY",
          description:
            "حلول أمنية متكاملة لتنظيم وتأمين الحشود في الفعاليات والمؤتمرات الكبرى.",
        },
        {
          image:
            "lajunImage5.png",
          title: "المراقبة الأمنية",
          subtitle: "SURVEILLANCE SYSTEMS",
          description:
            "أنظمة مراقبة ذكية تعمل على مدار الساعة لضمان التغطية الأمنية الشاملة.",
        },
        {
          image:
            "lajunImage6.png",
          title: "الدوريات الأمنية",
          subtitle: "SECURITY PATROLS",
          description:
            "دوريات ميدانية سريعة الاستجابة لتعزيز الأمان والاستقرار في كافة القطاعات.",
        },
      ],
    },

    certificates: {
      badge: "Trusted Security Partner",
      title: "We protect what matters to you",
      description:
        "Professional security and guarding services across Saudi Arabia with high standards of discipline and reliability.",
      documents: [
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
        {
          title: "Saudi Vision 2030",
          document: "Certificate1.jpeg"
        },
      ]
    },
  }
} as const;

export type Language = keyof typeof translations;