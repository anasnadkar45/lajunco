// app/admin/page.tsx

import Link from "next/link";
import { ImageIcon, FileText, BriefcaseBusiness, Users, Phone } from "lucide-react";
import { requireAdmin } from "@/lib/require-admin";
import { buttonVariants } from "@/components/ui/button";

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
    title: "Contact Messages",
    description: "Review and manage incoming contact form submissions.",
    href: "/admin/contact",
    icon: Phone,
  },
];

export default async function AdminPage() {
  await requireAdmin();
  return (
    <div>
      {/* Topbar */}
      <header className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Dashboard
            </p>

            <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
              Manage Landing Page
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Update your website content, images, services, client logos
              and contact details from one place.
            </p>
          </div>

          <Link
            href="/"
            target="_blank"
            className={buttonVariants({ variant: "default", size:"lg" })}
  >
            View Website
          </Link>
        </div>
      </header>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Editable Sections</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">5</h3>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Services</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">8</h3>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Clients</p>
          <h3 className="mt-2 text-3xl font-bold text-foreground">12</h3>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Last Updated</p>
          <h3 className="mt-2 text-lg font-bold text-foreground">
            Today
          </h3>
        </div>
      </div>

      {/* Cards */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground">
              Website Sections
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
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
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-secondary-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon size={22} />
                </div>

                <h4 className="mt-5 text-lg font-bold text-foreground">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>

                <span className="mt-5 inline-flex text-sm font-semibold text-foreground transition group-hover:text-primary">
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