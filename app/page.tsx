"use client";

import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Service from "@/components/sections/Service";
import Client from "@/components/sections/Client";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";
import SectionNavigator from "@/components/sections/SectionNavigator";

export default function Home() {
  return (
    <div
      className="min-h-screen"
    >
      <Topbar />
      <Navbar />

      <SectionNavigator />

      <section id="hero" className="min-h-screen">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="services" className="min-h-screen">
        <Service />
      </section>

      <section id="clients">
        <Client />
      </section>

      <section id="contact" className="min-h-screen">
        <ContactSection />
      </section>

      <Footer />
    </div>
  );
}