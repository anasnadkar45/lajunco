import HeroImageList from "@/components/admin/HeroImageList";
import HeroImageUpload from "@/components/admin/HeroImageUpload";
import prisma from "@/lib/prisma";

export default async function AdminHeroImagesPage() {
  const images = await prisma.heroImage.findMany({
    orderBy: {
      sortOrder: "desc",
    },
  });

  return (
    <main className="">
      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <section className="rounded-md h-fit border border-border bg-card p-4">
          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                Hero Image Upload
              </p>
              <h1 className="mt-2 text-2xl font-bold text-foreground">
                Add new banner images
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Upload images for your hero section, then manage them with the list on the right.
              </p>
            </div>

            <HeroImageUpload />
          </div>
        </section>

        <section className="space-y-6">
          <div className="rounded-md border border-border bg-card p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  Current Images
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground">
                  Manage hero banners
                </h2>
              </div>
            </div>
          </div>

          <HeroImageList initialImages={images} />
        </section>
      </div>
    </main>
  );
}
