import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    purpose,
    fullName,
    email,
    phone,
    city,
    company,
    guards,
    message,
    cvFileName,
    cvFileType,
    cvFileUrl,
  } = body;

  if (!purpose || !fullName?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { message: "Please provide your name, email, purpose, and message." },
      { status: 400 }
    );
  }

  try {
    const result = await prisma.contactMessage.create({
      data: {
        purpose,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone?.trim() || null,
        city: city?.trim() || null,
        company: company?.trim() || null,
        guards: guards?.trim() || null,
        message: message.trim(),

        cvFileName: cvFileName?.trim() || null,
        cvFileType: cvFileType?.trim() || null,
        cvFileUrl: cvFileUrl?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Contact form submission failed", error);

    return NextResponse.json(
      { message: "Failed to submit contact form." },
      { status: 500 }
    );
  }
}