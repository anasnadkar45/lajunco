"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageProvider";
import { UploadButton } from "@/lib/uploadthing";
import WhatsAppButton from "../common/WhatsAppButton";

type ContactPurpose = "quote" | "job" | "inquiry";

type ContactForm = {
  purpose: ContactPurpose;
  fullName: string;
  email: string;
  secondaryEmail: string;
  phone: string;
  city: string;
  message: string;
  cvFileName: string;
  cvFileType: string;
  cvFileUrl: string;
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const animationProps = {
  initial: "hidden",
  whileInView: "visible",
  viewport: {
    once: true,
    amount: 0.2,
  },
  transition: {
    duration: 0.45,
    ease: "easeOut",
  },
} as const;

export default function ContactSection() {
  const { t } = useLanguage();
  const contact = t.contact;

  const [form, setForm] = useState<ContactForm>({
    purpose: "quote",
    fullName: "",
    email: "",
    secondaryEmail: "",
    phone: "",
    city: "",
    message: "",
    cvFileName: "",
    cvFileType: "",
    cvFileUrl: "",
  });

  const [uploadingFile, setUploadingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const scrollToSubmitButton = () => {
    setTimeout(() => {
      submitButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleFieldChange =
    (field: keyof ContactForm) =>
    (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setStatus("idle");
      setError(null);
    };

  const handlePurposeChange = (purpose: ContactPurpose) => {
    setForm((prev) => ({
      ...prev,
      purpose,
      cvFileName: purpose === "job" ? prev.cvFileName : "",
      cvFileType: purpose === "job" ? prev.cvFileType : "",
      cvFileUrl: purpose === "job" ? prev.cvFileUrl : "",
    }));

    setStatus("idle");
    setError(null);

    scrollToSubmitButton();
  };

  const resetForm = () => {
    setForm((prev) => ({
      purpose: prev.purpose,
      fullName: "",
      email: "",
      secondaryEmail: "",
      phone: "",
      city: "",
      message: "",
      cvFileName: "",
      cvFileType: "",
      cvFileUrl: "",
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitting(true);
    setStatus("idle");
    setError(null);

    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setError(contact.form.validationRequired);
      setStatus("error");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.message ?? contact.form.submitError);
        setStatus("error");
      } else {
        setStatus("success");
        resetForm();
      }
    } catch (error) {
      console.error(error);
      setError(contact.form.submitError);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <motion.div
        variants={fadeUp}
        {...animationProps}
        className="overflow-hidden rounded-xl border bg-white shadow-xl shadow-slate-950/5"
      >
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="p-4 lg:p-8">
            <motion.div
              variants={fadeUp}
              {...animationProps}
              className="max-w-2xl"
            >
              <p className="text-xl font-bold tracking-tight text-secondary md:text-4xl">
                {contact.badge}
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                className="mt-3 h-1 rounded-full bg-primary"
              />

              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
                {contact.subtitle}
              </p>
            </motion.div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {contact.purposes.map((item, idx) => {
                const Icon =
                  item.id === "quote"
                    ? Briefcase
                    : item.id === "job"
                      ? FileText
                      : MessageCircle;

                const active = form.purpose === item.id;

                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: idx * 0.06,
                    }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePurposeChange(item.id)}
                    className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-5 text-center transition-all duration-200 ${
                      active
                        ? "border-primary/80 bg-primary/10 text-slate-950 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    } ${idx === 2 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <motion.span
                      animate={{
                        scale: active ? 1.04 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        active
                          ? "bg-primary text-slate-950"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.span>

                    <span className="text-sm font-semibold">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp}
              {...animationProps}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <AnimatedField delay={0}>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.fullName}
                  </span>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleFieldChange("fullName")}
                    type="text"
                    placeholder={contact.form.namePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatedField delay={0.04} >
                <label className="flex flex-col gap-2" >
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.email}
                  </span>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleFieldChange("email")}
                    type="email"
                    placeholder={contact.form.emailPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatedField delay={0.08}>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.secondaryEmail}{" "}
                    <span className="text-slate-400">
                      {contact.form.optionalLabel}
                    </span>
                  </span>
                  <input
                    name="secondaryEmail"
                    value={form.secondaryEmail}
                    onChange={handleFieldChange("secondaryEmail")}
                    type="email"
                    placeholder={contact.form.secondaryEmailPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatedField delay={0.12}>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.phone}
                  </span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleFieldChange("phone")}
                    type="tel"
                    placeholder={contact.form.phonePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatedField delay={0.16} className="sm:col-span-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.city}
                  </span>
                  <input
                    name="city"
                    ref={submitButtonRef as any}
                    value={form.city}
                    onChange={handleFieldChange("city")}
                    type="text"
                    placeholder={contact.form.cityPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatePresence mode="wait">
                {form.purpose === "job" ? (
                  <motion.div
                    key="cv-upload"
                    initial={{ opacity: 0, height: 0, y: -8 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-3 overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 sm:col-span-2"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-700">
                        {contact.form.attachCV}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {contact.form.attachCVHint}
                      </p>
                    </div>

                    <UploadButton
                      endpoint="fileUploader"
                      onUploadBegin={() => {
                        setUploadingFile(true);
                        setStatus("idle");
                        setError(null);
                      }}
                      onClientUploadComplete={(res) => {
                        const uploadedFile = res?.[0];

                        if (!uploadedFile) {
                          setUploadingFile(false);
                          return;
                        }

                        setForm((prev) => ({
                          ...prev,
                          cvFileName: uploadedFile.name,
                          cvFileType: uploadedFile.type || "",
                          cvFileUrl: uploadedFile.ufsUrl,
                        }));

                        setUploadingFile(false);
                      }}
                      onUploadError={(error) => {
                        console.error(error);
                        setUploadingFile(false);
                        setStatus("error");
                        setError(contact.form.fileUploadError);
                      }}
                      appearance={{
                        button:
                          "rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-primary/90",
                        allowedContent: "text-xs text-slate-500",
                      }}
                    />

                    {uploadingFile ? (
                      <p className="text-xs text-slate-500">
                        {contact.form.uploadingFile}
                      </p>
                    ) : null}

                    <AnimatePresence>
                      {form.cvFileName ? (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-emerald-800">
                              {form.cvFileName}
                            </p>
                            <p className="text-xs text-emerald-600">
                              {contact.form.fileUploaded}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setForm((prev) => ({
                                ...prev,
                                cvFileName: "",
                                cvFileType: "",
                                cvFileUrl: "",
                              }))
                            }
                            className="text-xs font-semibold text-red-600 hover:text-red-700"
                          >
                            {contact.form.removeFile}
                          </button>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatedField delay={0.2} className="sm:col-span-2">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-slate-700">
                    {contact.form.message}
                  </span>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleFieldChange("message")}
                    rows={5}
                    placeholder={contact.form.messagePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </label>
              </AnimatedField>

              <AnimatePresence mode="wait">
                {status === "error" && error ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2"
                  >
                    {error}
                  </motion.p>
                ) : null}

                {status === "success" ? (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 sm:col-span-2"
                  >
                    {contact.form.submitSuccess}
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <motion.button
                
                type="submit"
                id="submit"
                disabled={submitting || uploadingFile}
                whileHover={!submitting && !uploadingFile ? { y: -2 } : {}}
                whileTap={!submitting && !uploadingFile ? { scale: 0.98 } : {}}
                className="rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {submitting
                  ? contact.form.submitting
                  : uploadingFile
                    ? contact.form.uploadingFile
                    : contact.form.submit}
              </motion.button>
            </motion.form>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
            className="bg-secondary p-4 text-slate-100 md:p-12 lg:p-8"
          >
            <div className="max-w-md">
              <p className="text-lg font-semibold text-white">
                {contact.contactInfo.title}
              </p>

              <div className="mt-8 space-y-5 text-sm text-slate-300">
                {[
                  {
                    icon: Phone,
                    text: `${contact.contactInfo.phone} / +966114450211 / +966532175302`,
                    dir: "ltr",
                  },
                  {
                    icon: Mail,
                    text: contact.contactInfo.email,
                  },
                  {
                    icon: MapPin,
                    text: contact.contactInfo.location,
                  },
                  {
                    icon: Clock,
                    text: contact.contactInfo.hours,
                  },
                ].map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.text}
                      initial={{ opacity: 0, x: 14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                        delay: 0.15 + index * 0.06,
                      }}
                      className="flex items-center gap-3"
                    >
                      <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </span>

                      <div>
                        <p
                          dir={item.dir}
                          className="font-semibold text-white"
                        >
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: 0.45 }}
                >
                  <WhatsAppButton />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedField({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}