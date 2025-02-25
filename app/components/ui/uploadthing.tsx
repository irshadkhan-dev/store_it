import {
  generateReactHelpers,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { UploadRouter } from "@/routes/api/uploadthing/core";

export const UploadDropZone = generateUploadDropzone<UploadRouter>();
export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>();
