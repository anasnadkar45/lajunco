// app/api/admin/login/route.ts

import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/admin-session";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const validEmail = email === process.env.ADMIN_EMAIL;
  const validPassword = password === process.env.ADMIN_PASSWORD;

  if (!validEmail || !validPassword) {
    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  }

  await createAdminSession(email);

  return NextResponse.json({
    success: true,
  });
}