import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/admin/hero-images - Fetch all hero images sorted by sortOrder
export async function GET() {
  try {
    const images = await prisma.heroImage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    })
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching hero images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch hero images' },
      { status: 500 }
    )
  }
}

// POST /api/admin/hero-images - Create one or more hero images
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Support both single image and batch upload formats
    let imagesToCreate: Array<{ imageUrl: string; title?: string; description?: string; altText?: string }>

    if (Array.isArray(body.images)) {
      // Batch format: { images: [{imageUrl, altText}, ...] }
      imagesToCreate = body.images
    } else if (body.imageUrl) {
      // Single format: { imageUrl, title, description }
      imagesToCreate = [body]
    } else {
      return NextResponse.json(
        { error: 'Request must contain either imageUrl or images array' },
        { status: 400 }
      )
    }

    // Validate all images
    if (!Array.isArray(imagesToCreate) || imagesToCreate.length === 0) {
      return NextResponse.json(
        { error: 'At least one image is required' },
        { status: 400 }
      )
    }

    for (const image of imagesToCreate) {
      if (!image.imageUrl || typeof image.imageUrl !== 'string') {
        return NextResponse.json(
          { error: 'All images must have a valid imageUrl' },
          { status: 400 }
        )
      }
    }

    // Get the next sortOrder value
    const lastImage = await prisma.heroImage.findFirst({
      orderBy: { sortOrder: 'desc' },
    })
    let nextSortOrder = (lastImage?.sortOrder ?? -1) + 1

    // Create all images
    const createdImages = []
    for (const image of imagesToCreate) {
      const newImage = await prisma.heroImage.create({
        data: {
          imageUrl: image.imageUrl,
          title: image.title || image.altText || 'Untitled',
          description: image.description || '',
          sortOrder: nextSortOrder,
          isActive: true,
        },
      })
      createdImages.push(newImage)
      nextSortOrder++
    }

    return NextResponse.json(
      {
        success: true,
        created: createdImages.length,
        images: createdImages,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating hero image(s):', error)
    return NextResponse.json(
      { error: 'Failed to create hero image(s)' },
      { status: 500 }
    )
  }
}
