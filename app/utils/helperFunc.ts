import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

import { DB_FileType } from "@/db/schema";
import { RecentFileUplodedItem } from "@/types/auth";
import {
  CirclePlay,
  FileJson,
  FolderOpenDot,
  Images,
  LucideIcon,
  Video,
} from "lucide-react";
import { SORTING_OPTION } from "@/routes/_layout/_.$fileType";

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
    case "document":
      return FolderOpenDot as LucideIcon;
    case "image":
      return Images as LucideIcon;
    case "media":
      return CirclePlay as LucideIcon;
    default:
      return FileJson as LucideIcon;
  }
};

const getIconBgColor = (fileType: string) => {
  switch (fileType) {
    case "document":
      return "#FF7474";
    case "image":
      return "#56B8FF";
    case "media":
      return "#3DD9B3";
    default:
      return "#EEA8FD";
  }
};

export const getFileType = (fileType: string) => {
  switch (fileType) {
    case "application":
      return "document";
    case "image":
      return "image";
    case "video":
      return "media";
    case "audio":
      return "media";
    default:
      return "others";
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
  const initialSummarisedData: SummaryDataType = {
    document: {
      size: 0,
      lastUpdated: new Date(0),
    },
    image: {
      size: 0,
      lastUpdated: new Date(0),
    },
    media: {
      size: 0,
      lastUpdated: new Date(0),
    },
    others: {
      size: 0,
      lastUpdated: new Date(0),
    },
  };

  return data?.reduce((acc, item) => {
    const fileType = item.fileType;
    const currentDate = new Date(item.createdAt);

    acc[fileType].size += item.size;
    acc[fileType].lastUpdated =
      currentDate > acc[fileType].lastUpdated
        ? currentDate
        : acc[fileType].lastUpdated;

    return acc;
  }, initialSummarisedData);
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

export const getRelevantFile = ({
  sortBy,
  fileType,
  data,
}: {
  sortBy: SORTING_OPTION;
  fileType: string;
  data: DB_FileType[];
}) => {
  //first we will filter the files from data which are relevant to its page
  const relevantFileByPage = data.filter(
    (curFile) => curFile.fileType === fileType
  );

  const relevantFileSortedByPage = relevantFileByPage.sort((a, b) =>
    sortBy === "newest"
      ? a.createdAt.getTime() - b.createdAt.getTime()
      : b.createdAt.getTime() - a.createdAt.getTime()
  );

  return relevantFileSortedByPage as DB_FileType[];
};

export const getUsageSummary = (
  spaceSummary: SummaryDataType
): SummaryDataItem[] => {
  return [
    {
      title: "Documents",
      size: spaceSummary?.document?.size || 0,
      lastUpdated: spaceSummary?.document?.lastUpdated || new Date(0),
      icon: FolderOpenDot,
      url: "/document",
      iconBgColor: "#FF7474",
    },
    {
      title: "Images",
      size: spaceSummary?.image?.size || 0,
      lastUpdated: spaceSummary?.image?.lastUpdated || new Date(0),
      icon: Images,
      url: "/images",
      iconBgColor: "#56B8FF",
    },
    {
      title: "Video",
      size: spaceSummary?.media?.size || 0,
      lastUpdated: spaceSummary?.media?.lastUpdated || new Date(0),
      icon: Video,
      url: "/media",
      iconBgColor: "#3DD9B3",
    },
  ];
};
