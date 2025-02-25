import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

import { DB_FileType } from "@/db/schema";
import { SummaryDataItem, SummaryDataType } from "@/types/auth";
import { FolderOpenDot, Images, Video } from "lucide-react";

export const convertFileSize = (sizeInBytes: number, digits?: number) => {
  if (sizeInBytes < 1024) {
    return sizeInBytes + " Bytes";
  } else if (sizeInBytes < 1024 * 1024) {
    const sizeInKB = sizeInBytes / 1024;
    return sizeInKB.toFixed(digits || 1) + " KB";
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB.toFixed(digits || 1) + " MB";
  } else {
    const sizeInGB = sizeInBytes / (1024 * 1024 * 1024);
    return sizeInGB.toFixed(digits || 1) + " GB";
  }
};

export const getSpaceUsedSummary = ({ data }: { data: DB_FileType[] }) => {
  const summarisedData = data?.reduce((accumulator, currentValue) => {
    if (!accumulator[currentValue.fileType]) {
      accumulator[currentValue.fileType] = 0;
    }
    const totalSize = Math.floor(
      accumulator[currentValue.fileType] + currentValue.size
    );

    accumulator[currentValue.fileType] = totalSize;

    return accumulator;
  }, {});
  return summarisedData as SummaryDataType;
};

export const getUsageSummary = (
  spaceSummary: SummaryDataType
): SummaryDataItem[] => {
  return [
    {
      title: "Documents",
      size: spaceSummary.application,
      icon: FolderOpenDot,
      url: "/document",
      iconBgColor: "#FF7474",
    },
    {
      title: "Images",
      size: spaceSummary.image,
      icon: Images,
      url: "/images",
      iconBgColor: "#56B8FF",
    },
    {
      title: "Video",
      size: spaceSummary.video,
      icon: Video,
      url: "/media",
      iconBgColor: "#3DD9B3",
    },
  ];
};
