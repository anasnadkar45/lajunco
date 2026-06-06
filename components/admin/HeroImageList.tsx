'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { Trash2, GripVertical, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroImage {
  id: string
  imageUrl: string
  title?: string | null
  description?: string | null
  sortOrder: number
}

interface HeroImageListProps {
  initialImages: HeroImage[]
  onDelete: (id: string) => Promise<void>
  onReorder?: (imageIds: string[]) => Promise<void>
}

function SortableImageItem({
  image,
  onDelete,
}: {
  image: HeroImage
  onDelete: (id: string) => Promise<void>
}) {
  const [isDeleting, setIsDeleting] = useState(false)
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(image.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group rounded-lg overflow-hidden bg-neutral-800 hover:bg-neutral-700 transition-colors',
        isDragging && 'ring-2 ring-blue-500'
      )}
    >
      <div className="relative aspect-video w-full">
        <Image
          src={image.imageUrl}
          alt={image.title || 'Hero image'}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Overlay with controls */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          {...attributes}
          {...listeners}
          className="p-2 bg-white/80 hover:bg-white text-neutral-900 rounded-md transition-colors"
          title="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-md transition-colors disabled:opacity-50"
          title="Delete image"
        >
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Image info */}
      {(image.title || image.description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
          {/* {image.title && (
            <p className="text-white text-sm font-medium truncate">
              {image.title}
            </p>
          )} */}
          {image.description && (
            <p className="text-neutral-300 text-xs truncate">
              {image.description}
            </p>
          )}
        </div>
      )}

      {/* Sort order indicator */}
      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
        {image.sortOrder + 1}
      </div>
    </div>
  )
}

export default function HeroImageList({
  initialImages,
  onDelete,
  onReorder,
}: HeroImageListProps) {
  const [images, setImages] = useState<HeroImage[]>(initialImages)
  const [isReordering, setIsReordering] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        const newItems = arrayMove(items, oldIndex, newIndex)

        // Update sortOrder for all items
        return newItems.map((item, index) => ({
          ...item,
          sortOrder: index,
        }))
      })
      setHasChanges(true)
    }
  }

  const handleSave = async () => {
    if (!onReorder) return

    setIsReordering(true)
    try {
      const imageIds = images.map((img) => img.id)
      await onReorder(imageIds)
      setHasChanges(false)
    } catch (error) {
      console.error('Failed to save image order:', error)
      // Reset to initial state on error
      setImages(initialImages)
    } finally {
      setIsReordering(false)
    }
  }

  const handleCancel = () => {
    setImages(initialImages)
    setHasChanges(false)
  }

  return (
    <div className="space-y-6">
      {/* Control buttons */}
      {hasChanges && (
        <div className="flex gap-3 items-center bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              You have unsaved changes
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isReordering}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isReordering}
            >
              {isReordering ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Order'
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Images grid */}
      {images.length === 0 ? (
        <div className="text-center py-12 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400">
            No hero images yet. Upload some to get started.
          </p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={images.map((img) => img.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <SortableImageItem
                  key={image.id}
                  image={image}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  )
}
