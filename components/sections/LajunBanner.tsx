"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LajunBanner = () => {
  return (
    <section className="relative h-[75vh] min-h-[560px] mt-[120px] sm:mt-0 w-full overflow-hidden border-b-8 border-primary sm:h-[85vh] lg:h-screen">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{  scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/Banner.jpeg"
          alt="Lajun Security Services Banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center sm:object-center lg:object-center"
        />
      </motion.div>

      {/* <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/70" />
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950/80 to-transparent sm:w-28" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950/80 to-transparent sm:w-28" /> */}


    </section>
  );
};

export default LajunBanner;