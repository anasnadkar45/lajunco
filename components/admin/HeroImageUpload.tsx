"use client";

import { useState } from "react";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";

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
        alert("Upload failed: no image URL found");
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
        throw new Error("Failed to save images");
      }

      alert(`${images.length} hero image(s) uploaded successfully`);
      setAltText("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Upload Hero Images</h2>

      <input
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        placeholder="Alt text, optional"
        className="w-full rounded-md border px-3 py-2"
      />

      <UploadDropzone
        endpoint="heroImageUploader"
        onClientUploadComplete={async (res) => {
          if (!res || res.length === 0) {
            alert("No files uploaded");
            return;
          }

          await saveImagesToDb(res);
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />

      {loading && <p>Saving images...</p>}
    </div>
  );
}