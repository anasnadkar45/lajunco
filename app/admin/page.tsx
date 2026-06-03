// app/admin/page.tsx

import Link from "next/link";
import { ImageIcon, FileText, BriefcaseBusiness, Users, Phone } from "lucide-react";
import { requireAdmin } from "@/lib/require-admin";

const adminCards = [
  {
    title: "Hero Section",
    description: "Update headline, subtitle, CTA buttons and hero image.",
    href: "/admin/hero",
    icon: ImageIcon,
  },
  {
    title: "About Section",
    description: "Edit company introduction and about page content.",
    href: "/admin/about",
    icon: FileText,
  },
  {
    title: "Services",
    description: "Add, edit or remove landing page services.",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    title: "Clients",
    description: "Manage client logos, names and showcase section.",
    href: "/admin/clients",
    icon: Users,
  },
  {
    title: "Contact Info",
    description: "Update email, phone number, address and social links.",
    href: "/admin/contact",
    icon: Phone,
  },
];

export default async function AdminPage() {
  await requireAdmin();
  return (
    <div>
      {/* Topbar */}
      <header className="rounded-2xl border bg-white px-5 py-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
              Dashboard
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
              Manage Landing Page
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Update your website content, images, services, client logos
              and contact details from one place.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className="inline-flex w-fit items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View Website
          </Link>
        </div>
      </header>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Editable Sections</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-950">5</h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Services</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-950">8</h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Clients</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-950">12</h3>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last Updated</p>
          <h3 className="mt-2 text-lg font-bold text-slate-950">
            Today
          </h3>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-950">
              Website Sections
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Choose which section you want to update.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {adminCards.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-950 transition group-hover:bg-slate-950 group-hover:text-white">
                  <Icon size={22} />
                </div>

                <h4 className="mt-5 text-lg font-bold text-slate-950">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-semibold text-slate-950">
                  Edit Section →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}