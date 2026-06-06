import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// DELETE /api/admin/hero-images/[id] - Delete a hero image by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Validate ID
    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    // Check if image exists
    const image = await prisma.heroImage.findUnique({
      where: { id },
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete the image
    await prisma.heroImage.delete({
      where: { id },
    })

    // Reorder remaining images to fill the gap
    const remainingImages = await prisma.heroImage.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    })

    // Update sortOrder for all remaining images
    await Promise.all(
      remainingImages.map((img, index) =>
        prisma.heroImage.update({
          where: { id: img.id },
          data: { sortOrder: index },
        })
      )
    )

    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully',
      deletedId: id 
    })
  } catch (error) {
    console.error('Error deleting hero image:', error)
    return NextResponse.json(
      { error: 'Failed to delete hero image' },
      { status: 500 }
    )
  }
}
