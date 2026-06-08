"use client";

import Image from "next/image";
import { motion } from "motion/react";

const LajunBanner = () => {
  return (
    <section className="w-full pt-28 xl:pt-0 overflow-hidden bg-primary/30">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/logo.png"
          alt="Lajun Security Services"
          width={1920}
          height={900}
          priority
          className="h-auto w-full object-cover"
        />
      </motion.div>
    </section>
  );
};

export default LajunBanner;