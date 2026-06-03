// lib/require-admin.ts

import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/admin-session";

export async function requireAdmin() {
  const isAdmin = await verifyAdminSession();

  if (!isAdmin) {
    redirect("/admin/login");
  }
}