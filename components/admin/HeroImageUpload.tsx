"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UploadDropzone } from "@/lib/uploadthing";

type UploadedFile = {
  url?: string;
  ufsUrl?: string;
  name?: string;
};

export default function HeroImageUpload() {
  const [altText, setAltText] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveImagesToDb(files: UploadedFile[]) {
    setLoading(true);

    try {
      const images = files
        .map((file) => ({
          imageUrl: file.ufsUrl || file.url,
          altText: altText || file.name || "Hero image",
        }))
        .filter((image) => Boolean(image.imageUrl));

      if (images.length === 0) {
        toast.error("Upload failed: no image URL found");
        return;
      }

      const res = await fetch("/api/admin/hero-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save images");
      }

      toast.success(`${data.created || images.length} hero image(s) uploaded successfully`);
      setAltText("");
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-md border border-border bg-primary/10 p-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          Upload Hero Images
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Choose one or more hero images and provide optional alt text.
        </p>
      </div>

      <input
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        placeholder="Alt text (optional)"
        className="w-full rounded-2xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />

      <UploadDropzone
        endpoint="heroImageUploader"
        onClientUploadComplete={(res) => {
          saveImagesToDb(res);
        }}
        onUploadError={(error) => {
          toast.error(error.message || "Upload failed");
        }}
        appearance={{
          container:
            "rounded-lg border-2 border-dashed border-border bg-background p-6",
          button:
            "bg-primary text-primary-foreground hover:bg-primary/90",
          label: "text-foreground",
          allowedContent: "text-muted-foreground",
        }}
      />

      {loading && (
        <p className="text-sm text-muted-foreground">Saving images...</p>
      )}
    </div>
  );
}