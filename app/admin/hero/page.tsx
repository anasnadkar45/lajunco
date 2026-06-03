import HeroImageUpload from "@/components/admin/HeroImageUpload";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function AdminHeroImagesPage() {
  const images = await prisma.heroImage.findMany({})
  return (
    <main className="mx-auto max-w-3xl p-6">
      <HeroImageUpload />

      <div>
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.imageUrl}
            alt={image.altText as string}
            width={800}
            height={450}
          />
        ))}
      </div>
    </main>
  );
}