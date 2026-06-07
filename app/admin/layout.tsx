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
    title: "Contact Messages",
    description: "Review incoming contact form submissions.",
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
    <main lang="en" dir="ltr" className="min-h-screen bg-white">
      <div className="flex">
        <aside className="hidden h-screen w-72 border-r bg-primary/10 px-6 py-6 lg:block relative">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-primary">Admin Panel</h1>
              <p className="text-sm text-slate-500">Landing Page CMS</p>
            </div>
          </div>

          <nav className="mt-10 space-y-2">
            {adminLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname.includes(item.href)

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-primary text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-primary'}`}
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

        <section className="h-screen flex-1 px-4 py-6 sm:px-6 lg:px-10 overflow-y-scroll">{children}</section>
      </div>
    </main>
  )
}
