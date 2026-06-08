"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LajunBanner = () => {
  return (
    <section className="relative h-[75vh] min-h-[560px] w-full overflow-hidden border-b-8 border-primary sm:h-[85vh] lg:h-screen">
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

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/70" />
      <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-950/80 to-transparent sm:w-28" />
      <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-950/80 to-transparent sm:w-28" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
        className="absolute left-1/2 bottom-12 z-20 -translate-x-1/2"
      >
        <Image
          src="/logo.png"
          alt="Lajun logo"
          width={230}
          height={230}
          className="h-auto w-[200px] drop-shadow-2xl xl:w-[300px]"
        />
      </motion.div>

    </section>
  );
};

export default LajunBanner;