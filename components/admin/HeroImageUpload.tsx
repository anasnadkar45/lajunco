"use client";

import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing";

export default function HeroImageUpload() {
  const [altText, setAltText] = useState("");
  const [order, setOrder] = useState("0");
  const [loading, setLoading] = useState(false);

  async function saveImageToDb(imageUrl: string) {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/hero-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          altText,
          order,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save image");
      }

      alert("Hero image uploaded successfully");
      setAltText("");
      setOrder("0");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <h2 className="text-xl font-semibold">Upload Hero Image</h2>

      <input
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        placeholder="Alt text"
        className="w-full rounded-md border px-3 py-2"
      />

      <input
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        placeholder="Order"
        type="number"
        className="w-full rounded-md border px-3 py-2"
      />

      <UploadButton
        endpoint="heroImageUploader"
        onClientUploadComplete={async (res) => {
          const uploadedFile = res?.[0];

          if (!uploadedFile?.url && !uploadedFile?.ufsUrl) {
            alert("Upload failed: no file URL found");
            return;
          }

          const imageUrl = uploadedFile.url || uploadedFile.ufsUrl;

          await saveImageToDb(imageUrl);
        }}
        onUploadError={(error: Error) => {
          alert(`Upload failed: ${error.message}`);
        }}
      />

      {loading && <p>Saving image...</p>}
    </div>
  );
}