import { UploadDropZone, useUploadThing } from "@/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const UploadDropzone = ({
  setDropZoneActive,
}: {
  setDropZoneActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
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

  const { isUploading, startUpload } = useUploadThing("fileUploader");

  const onDrop = (files: File[]) => {
    toast.promise(
      async () => {
        await startUpload(files);
      },
      {
        loading: () => {
          setDropZoneActive(false);
          return <b>Uploading Files....</b>;
        },
        success: <b>Files Uploaded Succesfully.</b>,
        error: "Failed to upload file, please try again.",
      }
    );
  };

  return (
    <div
      className="fixed w-full z-[90] bg-black/60 h-screen flex items-center justify-center"
      ref={modalRef}
    >
      <div
        className="p-4 flex flex-col space-y-5 bg-white rounded-3xl"
        ref={dropZoneRef}
      >
        <UploadDropZone
          className="text-[#FA7275]"
          appearance={{
            container(args) {
              return args.isDragActive ? "bg-gray-300" : "bg-white";
            },
          }}
          endpoint={"fileUploader"}
          onChange={onDrop}
        />
      </div>
    </div>
  );
};

export default UploadDropzone;
