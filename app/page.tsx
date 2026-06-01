import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import Hero from "@/components/sections/Hero";
import Service from "@/components/sections/Service";
import Client from "@/components/sections/Client";

export default function Home() {
  return (
    <div className="min-h-[120vh]">
      <Topbar />
      {/* <div className="h-12" />} */}
      <Navbar />
      {/* <div className="h-20" />} */}
      <Hero />
      <Certificates />
      <About />
      <Service />
      <Client />
    </div>
  );
}
