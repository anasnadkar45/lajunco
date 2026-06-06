import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import prisma from "@/lib/prisma";

const PAGE_SIZE = 10;

export async function GET(req: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
    const search = url.searchParams.get("search") || "";
    const purpose = url.searchParams.get("purpose") || "";

    const where: any = {};

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { message: { contains: search, mode: "insensitive" } },
      ];
    }

    if (purpose && purpose !== "all") {
      where.purpose = purpose;
    }

    const total = await prisma.contactMessage.count({ where });
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const validPage = Math.min(page, Math.max(1, totalPages));

    const messages = await prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (validPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    const serialized = messages.map((message) => ({
      ...message,
      createdAt: message.createdAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      messages: serialized,
      pagination: {
        page: validPage,
        pageSize: PAGE_SIZE,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Failed to fetch contact messages", error);
    return NextResponse.json(
      { message: "Failed to fetch contact messages." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const id = body?.id;

  if (typeof id !== "number") {
    return NextResponse.json(
      { message: "Valid message id is required." },
      { status: 400 }
    );
  }

  try {
    const deletedMessage = await prisma.contactMessage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, deletedId: deletedMessage.id });
  } catch (error) {
    console.error("Failed to delete contact message", error);
    return NextResponse.json(
      { message: "Contact message not found." },
      { status: 404 }
    );
  }
}
