// app/api/admin/hero-images/route.ts

import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/admin-session";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const isAdmin = await verifyAdminSession();

  if (!isAdmin) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const images = body.images;

  if (!Array.isArray(images) || images.length === 0) {
    return NextResponse.json(
      { message: "Images are required" },
      { status: 400 }
    );
  }

  const lastImage = await prisma.heroImage.findFirst({
    orderBy: {
      sortOrder: "desc",
    },
  });

  const startOrder = lastImage ? lastImage.sortOrder + 1 : 0;

  const createdImages = await prisma.heroImage.createMany({
    data: images.map(
      (
        image: {
          imageUrl: string;
          altText?: string;
        },
        index: number
      ) => ({
        imageUrl: image.imageUrl,
        altText: image.altText || null,
        sortOrder: startOrder + index,
      })
    ),
  });

  return NextResponse.json({
    success: true,
    count: createdImages.count,
  });
}