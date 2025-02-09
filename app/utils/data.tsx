import {
  FileJson,
  FileStack,
  Image,
  LayoutDashboard,
  SquarePlay,
  type LucideIcon,
} from "lucide-react";

export type SidebarFolder = {
  id: number;
  name: string;
  icon: LucideIcon;
  link: string;
};

export const SidebarFolderData: SidebarFolder[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: LayoutDashboard,
    link: "/dashboard",
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
