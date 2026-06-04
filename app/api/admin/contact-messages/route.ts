import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import prisma from "@/lib/prisma";

export async function GET() {
  const isAdmin = await verifyAdminSession();
  if (!isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, messages });
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
