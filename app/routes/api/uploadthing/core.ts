import db from "@/db";
import { filesTable } from "@/db/schema";
import { getAuth } from "@clerk/tanstack-start/server";
import { createUploadthing, UploadThingError } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { getWebRequest } from "vinxi/http";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
    };
  },
});

export const uploadRouter = {
  fileUploader: f({
    blob: {
      maxFileCount: 9999,
      maxFileSize: "1GB",
    },
  })
    .middleware(async () => {
      const { userId } = await getAuth(getWebRequest());

      if (!userId) throw new UploadThingError("Unauthorized");

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload by", metadata.userId);
      console.log("File url", file.ufsUrl);
      const customeFileType = file.type.split("/")[0];

      await db.insert(filesTable).values({
        ownerId: metadata.userId,
        name: file.name,
        url: file.ufsUrl,
        fileType: customeFileType,
        size: file.size,
      });

      return { uploaderBy: metadata.userId };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
