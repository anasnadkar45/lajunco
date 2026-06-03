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

const purposes = [
  {
    id: "quote",
    icon: Briefcase,
    label: "Request a Quote",
  },
  {
    id: "job",
    icon: FileText,
    label: "Job Application",
  },
  {
    id: "inquiry",
    icon: MessageCircle,
    label: "General Inquiry",
  },
] as const

type Purpose = (typeof purposes)[number]["id"]

export default function ContactSection() {
  const [purpose, setPurpose] = useState<Purpose>("quote")

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white shadow-xl shadow-slate-950/5">
        <div className="grid gap-0 md:grid-cols-[1.4fr_1fr]">
          <div className="p-8 lg:p-12">
            <div className="max-w-2xl">
              <p className="text-3xl font-semibold tracking-tight text-slate-950">Get in Touch</p>
              <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
              <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600">
                Tell us what you need, and our team will respond quickly with the right security solution
                for your site, event, or facility.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {purposes.map((item) => {
                const Icon = item.icon
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
                <span className="text-sm font-medium text-slate-700">Full Name *</span>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Email *</span>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Phone *</span>
                <input
                  type="tel"
                  placeholder="05XXXXXXXX"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">City</span>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Company Name</span>
                <input
                  type="text"
                  placeholder="Company or facility name"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Guards Needed</span>
                <input
                  type="text"
                  placeholder="Approximate number"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              {purpose === "job" ? (
                <label className="space-y-2 sm:col-span-2">
                  <span className="text-sm font-medium text-slate-700">Attach CV *</span>
                  <input
                    type="file"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-700"
                  />
                </label>
              ) : null}

              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-700">Message</span>
                <textarea
                  rows={5}
                  placeholder="Write your message here"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
              </label>

              <button
                type="submit"
                className="sm:col-span-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-slate-950 transition hover:bg-primary/90"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="bg-slate-950 p-10 text-slate-100 md:p-12">
            <div className="max-w-md">
              <p className="text-lg font-semibold text-white">Contact Information</p>
              <div className="mt-8 space-y-5 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">0551778311</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">info@security-guards.co</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">Riyadh, Kingdom of Saudi Arabia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">Available 24/7</p>
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
