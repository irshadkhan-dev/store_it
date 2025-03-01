import React, { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UploadCloud } from "lucide-react";
import { useDropzone } from "@uploadthing/react";

import {
  generatePermittedFileTypes,
  generateClientDropzoneAccept,
} from "uploadthing/client";

import { useUploadThing } from "@/components/ui/uploadthing";
import { cn } from "@/lib/utils";

const UploadDropzone = ({
  setDropZoneActive,
}: {
  setDropZoneActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        modalRef.current.contains(event.target as Node) &&
        dropZoneRef.current &&
        !dropZoneRef.current.contains(event.target as Node)
      ) {
        setDropZoneActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropZoneActive]);

  const { startUpload, routeConfig } = useUploadThing("fileUploader", {
    onUploadError: ({ message }) => {
      toast.error(message);
    },

    onUploadBegin: () => {
      setDropZoneActive(false);
    },
    onClientUploadComplete: async () => {
      await queryClient.invalidateQueries({ queryKey: ["allFiles"] });
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop(acceptedFiles) {
      toast.promise(() => startUpload(acceptedFiles), {
        loading: () => {
          return <b>Uploading files...</b>;
        },
        success: <b>Uploading Resolved.</b>,
        error: "Error while uploading file. Please try again.",
      });
    },

    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes
    ),
  });

  return (
    <div
      className="fixed w-full z-[90] bg-black/60 h-[100vh] flex items-center justify-center"
      ref={modalRef}
    >
      <div
        className="p-4 flex flex-col space-y-5 bg-white rounded-3xl"
        ref={dropZoneRef}
      >
        <div
          className={cn(
            "border-[2px] bg-white border-gray-500 border-dashed rounded-2xl p-10",
            {
              "border-[#FA7275] bg-gray-300": isDragActive,
            }
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col space-y-3 items-center">
            <UploadCloud className="h-10 w-10 text-[#FA7275]" />
            <span className="text-base text-gray-400">
              Max file size limit 1GB
            </span>
            <span className="text-base text-gray-500">
              Drag n Drop or click to select file for uploading
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDropzone;
