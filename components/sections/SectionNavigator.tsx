"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", number: "01", label: "Hero" },
  // { id: "certificates", number: "02", label: "Certificates" },
  { id: "about", number: "02", label: "About" },
  { id: "services", number: "03", label: "Services" },
  { id: "clients", number: "04", label: "Clients" },
  { id: "contact", number: "05", label: "Contact" },
];

export default function SectionNavigator() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeIndex = sections.findIndex(
    (section) => section.id === activeSection
  );

  const activeNumber = sections[activeIndex]?.number || "01";
  const totalNumber = sections.length.toString().padStart(2, "0");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Right Side Dot Navigation */}
      <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-5 lg:flex">
        <span className="font-bold text-primary mix-blend-difference">
          {activeNumber}
        </span>

        <div className="flex flex-col items-center gap-4">
          {sections.map((section) => {
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                aria-label={`Go to ${section.label}`}
                className="group relative flex h-5 w-5 items-center justify-center"
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-5 w-5 border-2 border-primary bg-transparent"
                      : "h-1.5 w-1.5 bg-primary group-hover:h-2.5 group-hover:w-2.5"
                  }`}
                />

                <span className="pointer-events-none absolute right-8 rounded bg-primary px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {section.label}
                </span>
              </button>
            );
          })}
        </div>

        <span className="text-sm font-semibold text-primary mix-blend-difference">
          {totalNumber}
        </span>
      </div>

      {/* Bottom Counter */}
      <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 items-end gap-1 text-white mix-blend-difference ">
        <span className="text-2xl font-bold">{activeNumber}</span>
        <span className="mb-1 text-sm font-semibold">/</span>
        <span className="mb-1 text-sm font-semibold">{totalNumber}</span>
      </div>
    </>
  );
}