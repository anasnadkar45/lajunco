"use client";

import { useLanguage } from "@/context/LanguageProvider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Certificates = () => {
  const { t } = useLanguage();
  const documents = t.certificates.documents;

  const [selectedDocument, setSelectedDocument] = useState<null | {
    document: string;
    title: string;
  }>(null);

  const open = selectedDocument !== null;

  const sectionHeader = {
    hidden: {
      opacity: 0,
      y: 28,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.12,
      },
    },
  };

  const headerItem = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  const cardsContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const cardItem = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.94,
      filter: "blur(6px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="certificates" className="my-8 overflow-hidden px-4 sm:my-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          variants={sectionHeader as any}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          className="text-center"
        >
          <motion.p variants={headerItem as any} className="mb-2 text-primary">
            {t.certificates.badge}
          </motion.p>

          <motion.div variants={headerItem as any} className="space-y-1.5">
            <h1 className="text-2xl font-bold">{t.certificates.title}</h1>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 64 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="mx-auto h-1.5 rounded-full bg-primary"
            />

            <span className="text-xs text-muted-foreground">
              {t.certificates.description}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5"
        >
          {documents.map((doc, idx) => (
            <motion.button
              key={idx}
              variants={cardItem as any}
              type="button"
              onClick={() => setSelectedDocument(doc)}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.25 },
              }}
              whileTap={{ scale: 0.96 }}
              className="group w-full overflow-hidden rounded-xl border border-primary/25 bg-primary/10 p-2 text-left transition hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              <div className="relative h-[180px] overflow-hidden rounded-xl bg-white">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="h-full w-full"
                >
                  <Image
                    src={`/certificates/${doc.document}`}
                    alt={doc.title}
                    fill
                    className="object-cover transition duration-300"
                  />
                </motion.div>
              </div>

              <motion.span
                initial={{ opacity: 0.85 }}
                whileHover={{ opacity: 1 }}
                className="mt-3 block text-center text-lg font-semibold text-primary"
              >
                {doc.title}
              </motion.span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => !value && setSelectedDocument(null)}
      >
        <AnimatePresence>
          {open && (
            <DialogContent
              showCloseButton={false}
              className="h-[90vh] w-full max-w-6xl overflow-hidden"
            >
              <motion.button
                type="button"
                onClick={() => setSelectedDocument(null)}
                initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
                transition={{ duration: 0.25 }}
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
                aria-label="Close certificate preview"
              >
                ×
              </motion.button>

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                  y: 30,
                  filter: "blur(8px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                  y: 20,
                  filter: "blur(8px)",
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex h-full min-h-[320px] w-full flex-col overflow-hidden"
              >
                <div className="relative w-full flex-1 overflow-hidden bg-white">
                  {selectedDocument && (
                    <motion.div
                      key={selectedDocument.document}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative h-full w-full"
                    >
                      <Image
                        src={`/certificates/${selectedDocument.document}`}
                        alt={selectedDocument.title}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  )}
                </div>

                {selectedDocument && (
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 }}
                    className="border-t border-white/10 bg-background/90 p-4 text-center"
                  >
                    <DialogTitle className="text-lg font-bold text-primary">
                      {selectedDocument.title}
                    </DialogTitle>
                  </motion.div>
                )}
              </motion.div>
            </DialogContent>
          )}
        </AnimatePresence>
      </Dialog>
    </section>
  );
};

export default Certificates;