import Navbar from "@/components/layout/Navbar";
import Topbar from "@/components/layout/Topbar";
import Hero from "@/components/sections/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[120vh]">
      <Topbar />
      {/* <div className="h-12" /> */}
      <Navbar />
      {/* <div className="h-20" /> */}
      <Hero />
    </div>
  );
}
