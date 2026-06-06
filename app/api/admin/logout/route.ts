// app/api/admin/logout/route.ts

import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/admin-session";
import { redirect } from "next/navigation";

export async function POST() {
  await destroyAdminSession();

  redirect('/admin/login')
  return NextResponse.json({
    success: true,
  });
}