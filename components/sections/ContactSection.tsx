"use client"

import { useState } from "react"
import {
  Briefcase,
  FileText,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
} from "lucide-react"
import { useLanguage } from "@/context/LanguageProvider"

export default function ContactSection() {
  const [purpose, setPurpose] = useState<"quote" | "job" | "inquiry">("quote")
  const { t } = useLanguage()
  const contact = t.contact

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="overflow-hidden rounded-xl border bg-white shadow-xl shadow-slate-950/5">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="p-4 lg:p-8">
            <div className="max-w-2xl">
              <p className="text-xl md:text-4xl font-bold tracking-tight text-secondary">{contact.badge}</p>
              <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">{contact.subtitle}</p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {contact.purposes.map((item) => {
                const Icon = item.id === "quote" ? Briefcase : item.id === "job" ? FileText : MessageCircle
                const active = purpose === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPurpose(item.id)}
                    className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-5 text-center transition-all duration-200 ${
                      active
                        ? "border-primary/80 bg-primary/10 text-slate-950 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                        active ? "bg-primary text-slate-950" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </button>
                )
              })}
            </div>

            <form className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.fullName}</span>
                <input
                  type="text"
                  placeholder={contact.form.namePlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.email}</span>
                <input
                  type="email"
                  placeholder={contact.form.emailPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.phone}</span>
                <input
                  type="tel"
                  placeholder={contact.form.phonePlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.city}</span>
                <input
                  type="text"
                  placeholder={contact.form.cityPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.company}</span>
                <input
                  type="text"
                  placeholder={contact.form.companyPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.guards}</span>
                <input
                  type="text"
                  placeholder={contact.form.guardsPlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              {purpose === "job" ? (
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">{contact.form.attachCV}</span>
                  <input
                    type="file"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700"
                  />
                </label>
              ) : null}

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">{contact.form.message}</span>
                <textarea
                  rows={5}
                  placeholder={contact.form.messagePlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <button
                type="submit"
                className="sm:col-span-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
              >
                {contact.form.submit}
              </button>
            </form>
          </div>

          <div className="bg-secondary p-4 lg:p-8 text-slate-100 md:p-12">
            <div className="max-w-md">
              <p className="text-lg font-semibold text-white">{contact.contactInfo.title}</p>
              <div className="mt-8 space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{contact.contactInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{contact.contactInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{contact.contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{contact.contactInfo.hours}</p>
                  </div>
                </div>

                <div className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 text-slate-100 transition hover:border-primary hover:text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
