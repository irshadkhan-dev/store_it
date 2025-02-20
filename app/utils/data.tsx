import {
  FileJson,
  FileStack,
  FolderOpenDot,
  Image,
  Images,
  LayoutDashboard,
  SquarePlay,
  Video,
  type LucideIcon,
} from "lucide-react";

export type SidebarFolder = {
  id: number;
  name: string;
  icon: LucideIcon;
  link: string;
};

export type SummaryDataItem = {
  id: number;
  category: string;
  icon: LucideIcon;
  link: string;
  iconColor: string;
  spaceUsed: string;
  lastUpdatedDate: string;
};

export const SidebarFolderData: SidebarFolder[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: LayoutDashboard,
    link: "/",
  },
  {
    id: 2,
    name: "Document",
    icon: FileStack,
    link: "/document",
  },
  {
    id: 3,
    name: "Images",
    icon: Image,
    link: "/images",
  },
  {
    id: 4,
    name: "Media",
    icon: SquarePlay,
    link: "/media",
  },
  {
    id: 5,
    name: "Others",
    icon: FileJson,
    link: "/others",
  },
];

// export const SummaryData: SummaryDataItem[] = [
//   {
//     id: 1,
//     category: "Document",
//     icon: FolderOpenDot,
//     iconColor: "#FF7474",
//     link: "/document",
//     spaceUsed: ,
//     lastUpdatedDate: "10:15am, 20Feb",
//   },
//   {
//     id: 2,
//     category: "Images",
//     icon: Images,
//     iconColor: "#56B8FF",
//     link: "/images",
//     lastUpdatedDate: "10:15am, 20Feb",
//   },
//   {
//     id: 3,
//     category: "Video, Audio",
//     icon: Video,
//     iconColor: "#3DD9B3",
//     link: "/media",
//     lastUpdatedDate: "10:15am, 20Feb",
//   },
//   {
//     id: 4,
//     category: "Others",
//     icon: FileJson,
//     iconColor: "#EEA8FD",
//     link: "/others",
//     lastUpdatedDate: "10:15am, 20Feb",
//   },
// ];
