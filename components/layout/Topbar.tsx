// src/components/layout/Navbar.tsx

"use client";

import { Mail, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LanguageToggle from "@/components/common/LanguageToggle";

export default function Topbar() {
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

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
        <header className={`fixed top-0 left-0 right-0 z-50 transform transition-[transform,opacity] duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
            <div className="w-full bg-secondary/95 px-8 py-2 backdrop-blur">
                <nav className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 text-white text-xs">
                        <a
                            href="mailto:info@lajunco.com"
                            aria-label="Send email to Lajun"
                            className="flex items-center gap-2 hover:text-primary transition-all duration-300 ease-in"
                        >
                            <Mail className="h-4 w-4 text-primary" />
                            <span>info@lajunco.com</span>
                        </a>

                        <a
                            href="tel:+053370700"
                            aria-label="Call Lajun"
                            className="flex items-center gap-2 hover:text-primary transition-all duration-300 ease-in"
                        >
                            <Phone className="h-4 w-4 text-primary" />
                            <span>+053370700</span>
                        </a>
                    </div>

                    <LanguageToggle />
                </nav>
            </div>
        </header>
    );
}