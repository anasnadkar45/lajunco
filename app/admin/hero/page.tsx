'use client'

import { useEffect, useState } from 'react'
import HeroImageUpload from '@/components/admin/HeroImageUpload'
import { Loader2 } from 'lucide-react'
import HeroImageList from '@/components/admin/HeroImageList'

interface HeroImage {
  id: string
  imageUrl: string
  title?: string | null
  description?: string | null
  sortOrder: number
}

export default function HeroImagesPage() {
  const [images, setImages] = useState<HeroImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch hero images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch('/api/admin/hero-images')
        if (!response.ok) throw new Error('Failed to fetch images')
        const data = await response.json()
        setImages(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
        console.error('Error fetching hero images:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  console.log(images)

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/hero-images/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete image')
      setImages(images.filter((img) => img.id !== id))
    } catch (err) {
      console.error('Error deleting image:', err)
      throw err
    }
  }

  const handleReorder = async (imageIds: string[]) => {
    try {
      const response = await fetch('/api/admin/hero-images/reorder', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageIds }),
      })
      if (!response.ok) throw new Error('Failed to reorder images')
    } catch (err) {
      console.error('Error reordering images:', err)
      throw err
    }
  }

  return (
    <main className="min-h-screen space-y-6">

      <section className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Hero Images
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">
              Manage Images
            </h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Manage and reorder the images that appear in your hero section. Drag images to
              change their display order.
            </p>
          </div>
        </div>
      </section>

      {/* Error state */}
      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-900 dark:text-red-100 px-4 py-3 rounded-lg">
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="mb-8">
        <HeroImageUpload />
      </div>
      {/* Loading state */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
          <span className="ml-2 text-neutral-600 dark:text-neutral-400">Loading images...</span>
        </div>
      ) : (
        <>

          {/* Images list */}
          <HeroImageList
            initialImages={images}
            onDelete={handleDelete}
            onReorder={handleReorder}
          />
        </>
      )}
    </main>
  )
}
