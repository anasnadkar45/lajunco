// app/api/uploadthing/core.ts

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

async function auth() {
  // Replace this with your real admin session check
  const isAdmin = true;

  if (!isAdmin) {
    throw new UploadThingError("Unauthorized");
  }

  return { userId: "admin" };
}

export const ourFileRouter = {
  heroImageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      const user = await auth();

      return {
        userId: user.userId,
      };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
      };
    }),

  fileUploader: f({
    blob: {
      maxFileSize: "8MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await auth();

      return {
        userId: user.userId,
      };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl,
        name: file.name,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;