"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

type HeroImage = {
  id: number;
  imageUrl: string;
  altText?: string | null;
  sortOrder?: number;
};

type HeroImageListProps = {
  initialImages: HeroImage[];
};

export default function HeroImageList({ initialImages }: HeroImageListProps) {
  const [images, setImages] = useState<HeroImage[]>(initialImages);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      "Delete this hero image? This action cannot be undone."
    );
    if (!confirmed) return;

    setDeletingId(id);

    try {
      const res = await fetch("/api/admin/hero-images", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body?.message || "Failed to delete image");
      }

      setImages((current) => current.filter((image) => image.id !== id));
    } catch (error) {
      console.error(error);
      window.alert("Unable to delete the image. Please try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (images.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
        No hero images have been added yet. Upload a new image to get started.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {images.map((image) => (
        <div key={image.id} className="overflow-hidden rounded-md border border-border bg-card">
          <div className="relative aspect-video bg-slate-950/5">
            <Image loading="lazy"
              src={image.imageUrl}
              alt={image.altText ?? "Hero image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <div className="space-y-3 p-5">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {image.altText || "No alt text provided"}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground wrap-break-word">
                {image.imageUrl}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase text-secondary-foreground">
                #{image.id}
              </span>
              <Button
                type="button"
                disabled={deletingId === image.id}
                onClick={() => handleDelete(image.id)}
                variant="destructive"
              >
                {deletingId === image.id ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
