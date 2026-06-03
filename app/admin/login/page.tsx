// app/admin/login/page.tsx

import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-950">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Login to manage website content.
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </main>
  );
}