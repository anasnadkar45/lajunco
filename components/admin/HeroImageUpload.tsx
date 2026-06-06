"use client";

import { useState } from "react";
import { toast } from "sonner";

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
          imageUrl: file.url || file.ufsUrl,
          altText,
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
        body: JSON.stringify({
          images,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save images");
      }

      const data = await res.json();
      toast.success(`${data.created || images.length} hero image(s) uploaded successfully`);
      setAltText("");
    } catch (error) {
      console.error("[v0] Save error:", error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files || files.length === 0) {
      toast.error("No files selected");
      return;
    }

    const uploadedFiles: UploadedFile[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Convert file to data URL for demonstration
      // In production, upload to a service like UploadThing, AWS S3, etc.
      const reader = new FileReader();
      reader.onload = (event) => {
        uploadedFiles.push({
          url: event.target?.result as string,
          name: file.name,
        });
        if (uploadedFiles.length === files.length) {
          saveImagesToDb(uploadedFiles);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 rounded-md border border-border bg-primary/10 p-4">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Upload Hero Images</h2>
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

      <div className="rounded-lg border-2 border-dashed border-border bg-background p-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={loading}
          className="block w-full cursor-pointer text-sm text-muted-foreground file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90 disabled:opacity-50"
        />
      </div>

      {loading && <p className="text-sm text-muted-foreground">Saving images...</p>}
    </div>
  );
}
