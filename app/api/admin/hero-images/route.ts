import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Later add real admin check here
    const body = await req.json();

    const { imageUrl, altText, order } = body;

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const heroImage = await prisma.heroImage.create({
      data: {
        imageUrl,
        altText: altText || null,
        order: Number(order) || 0,
        isActive: true,
      },
    });

    return NextResponse.json(heroImage);
  } catch (error) {
    console.error("Hero image save error:", error);

    return NextResponse.json(
      { error: "Failed to save hero image" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const images = await prisma.heroImage.findMany({
    orderBy: {
      order: "asc",
    },
  });

  return NextResponse.json(images);
}