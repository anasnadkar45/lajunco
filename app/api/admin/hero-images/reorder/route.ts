import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// PATCH /api/admin/hero-images/reorder - Update image sort order
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageIds } = body

    // Validation
    if (!Array.isArray(imageIds) || imageIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid imageIds array' },
        { status: 400 }
      )
    }

    // Validate all IDs are strings
    if (!imageIds.every(id => typeof id === 'string')) {
      return NextResponse.json(
        { error: 'All IDs must be strings' },
        { status: 400 }
      )
    }

    // Verify all images exist
    const existingImages = await prisma.heroImage.findMany({
      where: { id: { in: imageIds } },
    })

    if (existingImages.length !== imageIds.length) {
      return NextResponse.json(
        { error: 'One or more images not found' },
        { status: 404 }
      )
    }

    // Update sortOrder for all images based on their new position
    const updates = imageIds.map((id, index) =>
      prisma.heroImage.update({
        where: { id },
        data: { sortOrder: index },
      })
    )

    await Promise.all(updates)

    // Fetch updated images in new order
    const reorderedImages = await prisma.heroImage.findMany({
      where: { id: { in: imageIds } },
      orderBy: { sortOrder: 'asc' },
    })

    return NextResponse.json({
      success: true,
      updated: imageIds.length,
      images: reorderedImages,
    })
  } catch (error) {
    console.error('Error reordering hero images:', error)
    return NextResponse.json(
      { error: 'Failed to reorder images' },
      { status: 500 }
    )
  }
}
