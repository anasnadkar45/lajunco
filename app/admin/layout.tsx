"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"
import {
  ImageIcon,
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Phone,
  FileText,
  LogOut,
} from "lucide-react"

const adminLinks = [
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
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname?.endsWith("/login")

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="hidden min-h-screen w-72 border-r bg-white px-6 py-6 lg:block relative">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-950">Admin Panel</h1>
              <p className="text-sm text-slate-500">Landing Page CMS</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {adminLinks.map((item) => {
              const Icon = item.icon

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon size={18} />
                  {item.title}
                </Link>
              )
            })}
          </nav>

          <div className="absolute bottom-6">
            <form action="/api/admin/logout" method="POST">
              <button className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50">
                <LogOut size={18} />
                Logout
              </button>
            </form>
          </div>
        </aside>

        <section className="flex-1 px-4 py-6 sm:px-6 lg:px-10">{children}</section>
      </div>
    </main>
  )
}
