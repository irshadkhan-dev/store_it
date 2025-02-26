import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

import { DB_FileType } from "@/db/schema";
import { RecentFileUplodedItem } from "@/types/auth";
import {
  FileJson,
  FolderOpenDot,
  Images,
  LucideIcon,
  Music,
  Video,
} from "lucide-react";

export type SummaryDataItem = {
  title: string;
  size: number;
  lastUpdated: Date;
  icon: LucideIcon;
  url: string;
  iconBgColor: string;
};

export type SummaryDataType = {
  [key: string]: {
    size: number;
    lastUpdated: Date;
  };
};

export const TOTAL_SPACE_AVAILABLE_IN_MB = 2048;

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "application":
      return FolderOpenDot as LucideIcon;
    case "image":
      return Images as LucideIcon;
    case "video":
      return Video as LucideIcon;
    case "audio":
      return Music as LucideIcon;
    default:
      return FileJson as LucideIcon;
  }
};

const getIconBgColor = (fileType: string) => {
  switch (fileType) {
    case "application":
      return "#FF7474";
    case "image":
      return "#56B8FF";
    case "video":
      return "#3DD9B3";
    case "music":
      return "#EEA8FD";
    default:
      return "#EEA8FD";
  }
};

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
  const summarisedData = data?.reduce(
    (accumulator, currentValue) => {
      if (!accumulator[currentValue.fileType]) {
        accumulator[currentValue.fileType] = {
          size: 0,
          lastUpdated: new Date(0),
        };
      }

      const totalSize = Math.floor(
        accumulator[currentValue.fileType].size + currentValue.size
      );

      const currentDate = new Date(currentValue.createdAt);
      const lastUpdated = new Date(
        Math.max(
          currentDate.getTime(),
          accumulator[currentValue.fileType].lastUpdated.getTime()
        )
      );

      accumulator[currentValue.fileType] = {
        size: totalSize,
        lastUpdated,
      };

      return accumulator;
    },
    {} as Record<string, { size: number; lastUpdated: Date }>
  );
  return summarisedData;
};

export const getTotalSpaceUsed = ({ data }: { data: DB_FileType[] }) => {
  return data?.reduce((accumulator, currentValue) => {
    return (accumulator += currentValue.size);
  }, 0);
};

export const getTotalSpaceUsedPercentage = (spaceUsedInBit: number) => {
  const sizeInMB = spaceUsedInBit / (1024 * 1024);

  const percentage = ((sizeInMB * 100) / TOTAL_SPACE_AVAILABLE_IN_MB).toFixed(
    2
  );
  return { sizeInMB, percentage };
};

export const getRecentFileUploaded = ({
  data,
}: {
  data: DB_FileType[];
}): RecentFileUplodedItem[] => {
  return data?.map((item) => ({
    name: item.name,
    createdAt: item.createdAt,
    icon: getFileIcon(item.fileType),
    iconBgColor: getIconBgColor(item.fileType),
  }));
};

export const getUsageSummary = (
  spaceSummary: SummaryDataType
): SummaryDataItem[] => {
  return [
    {
      title: "Documents",
      size: spaceSummary.application.size,
      lastUpdated: spaceSummary.application.lastUpdated,
      icon: FolderOpenDot,
      url: "/document",
      iconBgColor: "#FF7474",
    },
    {
      title: "Images",
      size: spaceSummary.image.size,
      lastUpdated: spaceSummary.image.lastUpdated,
      icon: Images,
      url: "/images",
      iconBgColor: "#56B8FF",
    },
    {
      title: "Video",
      size: spaceSummary.video.size,
      lastUpdated: spaceSummary.video.lastUpdated,
      icon: Video,
      url: "/media",
      iconBgColor: "#3DD9B3",
    },
  ];
};
