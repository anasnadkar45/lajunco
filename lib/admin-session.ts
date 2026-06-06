// lib/admin-session.ts

import { cookies } from "next/headers";
import crypto from "crypto";
import { redirect } from "next/navigation";

const COOKIE_NAME = "admin_session";

function sign(value: string) {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET!)
    .update(value)
    .digest("hex");
}

export async function createAdminSession(email: string) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24; // 1 day

  const payload = JSON.stringify({
    email,
    expiresAt,
  });

  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = sign(encodedPayload);

  const token = `${encodedPayload}.${signature}`;

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) return false;

  const expectedSignature = sign(encodedPayload);

  if (signature !== expectedSignature) return false;

  const payload = JSON.parse(
    Buffer.from(encodedPayload, "base64url").toString()
  );

  if (Date.now() > payload.expiresAt) return false;

  return payload.email === process.env.ADMIN_EMAIL;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);

  redirect('/admin/login')
}